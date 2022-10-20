![banner](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/5/19/16acfee7031de2c7~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

一个常见的需求：

主页 -->前进 列表页-->前进 详情页，详情页 -->返回 主页 -->返回 列表页

我们希望，

从 详情页 -->返回 列表页 的时候页面的状态是缓存，不用重新请求数据，提升用户体验。

从 列表页 -->返回 主页 的时候页面，注销掉列表页，以在进入不同的列表页的时候，获取最新的数据。

### vue 路由 按需 keep-alive

`keep-alive` 是 Vue 提供的一个抽象组件，主要用于保留组件状态或避免重新渲染。

`<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 `transition` 相似，`<keep-alive>` 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。

但是 `keep-alive` 会把其包裹的所有组件都缓存起来。

#### 把需要缓存和不需要缓存的视图组件区分开

思路如下：

![router区分](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/5/19/16acffc9192eb757~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

1. **写 2 个 `router-view` 出口**

```html
<keep-alive>
	// 需要缓存的视图组件
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>

// 不需要缓存的视图组件
<router-view v-if="!$route.meta.keepAlive"></router-view>
```

2. **在 Router 里定义好需要缓存的视图组件**

```js
new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('./views/keep-alive/index.vue'),
            meta: {
                deepth: 0.5
            }
        },
        {
            path: '/list',
            name: 'list',
            component: () => import('./views/keep-alive/list.vue'),
            meta: {
                deepth: 1
                keepAlive: true //需要被缓存
            }
        },
        {
            path: '/detail',
            name: 'detail',
            component: () => import('./views/keep-alive/detail.vue'),
            meta: {
                deepth: 2
            }
        }
    ]
})
```

#### 按需 keep-alive

**Props:**

- include: -字符串或正则表达式。只有名称匹配的组件会被缓存。
- exclude: -字符串或正则表达式。任何名称匹配的都不会被缓存。
- max: -数字。最多可以缓存多少组件。

`include` 和 `exclude` 属性允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示。

`keep-alive`组件如果设置了 `include` ,就只有和 include 匹配的组件会被缓存，所以思路就是，动态修改 include 数组来实现按需缓存。

![include](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/5/19/16ad009cfdc4879b~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

```html
<keep-alive :include="include">
    <!-- 需要缓存的视图组件 -->
  <router-view v-if="$route.meta.keepAlive">
  </router-view>
</keep-alive>

<!-- 不需要缓存的视图组件 -->
<router-view v-if="!$route.meta.keepAlive">
</router-view>
```

让我们在 app.vue 里监听路由的变化，

```js
export default {
    name: "app",
    data: () => ({
        include: []
    }),
    watch: {
        $route(to, from) {
            // 如果要 to（进入）的页面需要 keepAlive 缓存的，
            // 把 name push 进 include 数组
            if (to.meta.keepAlive) {
                !this.include.includes(to.name) && this.include.push(to.name);
            }
            // 如果要 from（离开）的页面是 keepAlive 缓存的，
            // 再根据 deepth 来判断是前进还是后退
            // 如果是后退
            if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
                let index = this.include.indexOf(from.name);
                index !== -1 && this.include.splice(index, 1);
            }
        }
    }
};
```

需要注意的是，`<keep-alive>` 要求被切换的组件都有自己的名字，不论是通过组件的 `name` 选项还是局部/全局注册。

`keep-alive` 需要其包裹的组件有 name 属性，以上代码中的 push 和 splice 操作的是 router 的 name。

所以建议把 route 的 name 属性设置和 route 对应 component 的 name设置成一样的。

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/5/19/16ad0240ea84a2e8~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

在 [vue-devtool](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue-devtools) 里，灰色的组件，代表是缓存状态的组件，注意观察`list`的变化。