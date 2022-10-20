### 1. 下载

官网：https://router.vuejs.org/zh/

`$ npm i vue-router `

或 `$ yarn add vue-router`

### 2. 使用

#### 2.1 导入路由

在`main.js`主入口中

```js
import Vue from 'vue';
import App from './App.vue';

/* 导入路由表 */
import router from './router/router';

Vue.config.productionTip = false;
new Vue({
    // 使用路由：所有基于路由管控的组件中将会包含两个属性
    // this.$router => 实现路由的切换等
    // this.$route  => 包含路由的一些基本信息
    router,
    render: h => h(App),
}).$mount('#app');
```

`this.$router` 提供一系列操作路由的方法。

`this.$route`  提供一系列路由的属性

#### 2.2 配置项

##### 2.2.1 mode

路由的方式：**HASH**(哈希路由) && **HISTORY**(BROWSER路由)

###### HASH路由

- 在URL地址末尾加入 #/——哈希值/，例如`#/userlist`——哈希值/userlist。

- 原理：`vue-router`监听当前页面HASH值的改变，根据不同的HASH值，在“路由视图容器”中渲染不同的组件。
- `router-view`路由容器，根据路由表的匹配规则，匹配到不同的组件，每一次都可以把匹配到的组件放置在容器中进行渲染

##### 2.2.2 routes

配置路由表：在不同的HASH值下匹配不同的组件。

`routes: [{key:val,...},{...}...]`

```vue
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const router = new VueRouter({
	// 路由的方式：HASH(哈希路由) && HISTORY(BROWESER路由)
	mode: 'hash',
	// 配置路由表：在不同HASH值下配置不同的组件
	routes: [{
		// 按照从上到下的顺序依次查找，找到对应的停止
		// 路由地址为'/'时，跳到名为Home的组件
		path: '/',
		component: Home
	},{
		path: '/custome',
		component: Custome
	},{
		// *代表除了上面路径外的所有路径
		path: '*',
		// component: Page404
		// 重定向
		redirect: '/'
	}]
});
export default router;
```

- 需要把用到的组件先导入，路由懒加载则不用。

- `path:'/'`

  路由路径，后期跳转和匹配的时候需要，例如`<router-link to='/'>`或者`:to='{path:'/'}'`

- `name: 'xxx'`

  命名路由，后期可基于`<router-link :to='{name:'xxx'}'>`跳转；

- `component: Home`,渲染组件；
- `redirect:'/'`，路由重定向为`'/'`
- `children:[{...}]`,子路由

**每一次URL地址后面的HASH值改变，程序就监听到了，程序会重新从路由表中第一个开始向下依次进行匹配，直到找到符合的那一项为止。**

### 3. 命名视图

```html
<!-- 内容 容器不设置名字，默认名字default -->
<router-view></router-view>
<router-view name="AAA"></router-view>
```

```js
routers: [{
    path: '/',
    name: 'home',
    components :{
        default: Home,
        AAA: Active,
    }
}]
```

不指定视图，默认渲染Home组件，Active组件渲染到AAA视图中。

### 4. 路由懒加载

- 在路由表中首先要导入需要用到的全部组件，在路由表处理的时候，首先会把这些组件全部编译处理，然后向下逐一执行代码。如果组件过多，会大大影响性能。

- 出于性能优化考虑，利用路由懒加载，实现按需加载。

  ```js
  component: () => {
      // 路由懒加载
      return import('../pages/Home.vue');
  }
  ```

  不需要在开始导入全部组件，在路由表中使用组件的时候，再导入。

### 5. 子路由

子路由的值是一个数组，每一项都是一个对象，对象中包含的内容与routes中一致。

```js
routes: [{
    // 一级路由
    path: '/',
    name: 'home',
    component: Home,
    // 二级路由
    children: [{
        path: '/list',
        name: 'list',
        component: List,
        children: [{
            path: '/system',
            name: 'system',
            component: system
        },{
            path: '/active',
            name: 'active',
            component: Active
        }]
    }]
}]
```

![image-20220302140722506](C:\Users\Kurja\AppData\Roaming\Typora\typora-user-images\image-20220302140722506.png)

