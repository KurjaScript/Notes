### 1. `Vue.entend`用法

**主要用于需要动态渲染的组件**，或者类似于`window.alert()`提示组件

**注意**：`extend`创建的是一个组件构造器，而不是一个具体的组件实例；属于Vue的全局API，**在实际业务中很少被使用**。因为相比常用的`Vue.component`的写法，`extend`步骤 更加繁琐些。但是在一些独立组件开发场景中，`Vue.extend + $mount`这对组合是我们需要去关注的。

基础用法：

```vue
<div id = "mount-point"></div>
// 构造器
let Profile = Vue.extend({
    template: '<p>{{firstName}} {{lastName}}</p>',
    data: function() {
        return {
			firstName: '云柱',
			lastName: '火柱'
        }
    }
})
// 创建 Profile 实例，并挂载到一个元素上
new Profile().$mount('#mount-point')
```

可以看到，extend创建的是Vue构造器，而不是我们平常写的组件实例，所以不可以通过 `new Vue({components: testExtend})` 来直接使用，需要通过`new Profile().$mount('#mount-point')`来挂载到指定的元素上。

第二种写法，可以在创建实例的时候传入一个元素，生成的组件将会挂载到这个元素上，跟$mount差不多，如下：

1. 定义一个vue模板

   ```js
   let tem = {
       template: '{{firstName}} {{lastName}}',
       data: function(){
           return {
               firstName: '云柱',
               lastName: '火柱',
           }
       }
   }
   ```

2. 调用

   ```js
   const TemConstructor = Vue.extend(tem)
   const intance = new TemConstructor({el: "#app"}) // 生成一个实例，并挂载在#app
   ```

   