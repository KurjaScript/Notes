先上代码

```vue
<div id = "app">
	<input type = "text" ref = "input1" id = "input1" />
    <button @click = "add">添加</button>
</div>
<script src = "../js/vue.js"></script>
<script type = "text/javascript">
var Vuepro = new Vue({
    el: '#app',
    methods: {
        add: function(){
            this.$refs.input1.value = "22"; // this.$refs.input1 减少获取dom节点的消耗
            console.log(this.$refs.input1) // <input type = "text" id = "input1">
            console.log(document.getElementById('input1')) // <input type = "text" id = "input1">
        }
    }
})
</script>
```

如图，`ref`被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 `$refs` 对象上。

如果在普通的 `DOM` 元素上使用，引用指向的就是 `DOM` 元素；如果用在子组件上，引用就指向组件实例：

在上面的例子中，`input`的引用信息为`input1` ，`$refs` 是所有注册过的`ref`的一个集合，

```js
console.log(this.$refs.input1)//<input type="text" id="input1">
console.log(document.getElementById('input1'))//<input type="text" id="input1">
```

 这两种方法获得的都是`Dom`节点，而`$refs`相对`document.getElementById`的方法，会减少获取`Dom`节点的消耗。

### 子组件引用

尽管有prop和事件，但是有时仍然需要在JavaScript中间直接访问组件。为此可以使用`ref`为子组件指定一个引用ID。例如：

```html
<div id = "parent">
	<user-profile ref = "profile"></user-profile>
</div>
```

```js
var parent = new Vue({ el : '#parent' })
// 访问子组件实例
var child = parent.$refs.profile
```

当 `ref` 和 `v-for` 一起使用时，获取到的引用会是一个数组，包含和循环数据源对应的子组件。

```vue
<template>
	<div class = "child1">
        child1 about
        <ul>
            <li v-for = "item in list" :key = "item.id" ref = "lis">{{ item.name }}</li>
    	</ul>
    </div>
</template>
<script>
export default {
    name: '',
    data() {
        return {
           list: [
               {name: "kurja", age: 26},
               {name: "云柱", age: 27},
           ] 
        }
    },
    mounted() {
        console.log(this.$refs.lis);
    }
}
</script>
```

![img](https://img2020.cnblogs.com/blog/1089028/202010/1089028-20201015094709817-894750590.png)

`$refs` 只在组件渲染完成后才填充，并且它是非响应式的。它仅仅是一个直接操作子组件的应急方案——**应当避免在模板或计算属性中使用** `$refs` 。