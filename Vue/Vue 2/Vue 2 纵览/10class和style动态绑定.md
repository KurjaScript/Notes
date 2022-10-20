### 1. VUE 思想转变

页面中的东西想要改变，先到JS中准备数据，再基于数据去渲染视图，后期直接改数据即可。

### 2. 动态控制 class 类名

静态样式直接编写即可：`<div class="box" style="margin:20px auto>" >`

在项目中基于业务需求动态控制元素样式的时候，需要一些特殊处理。

#### 2.1 对象方式处理

##### 2.1.1 直接写下结构上

`:class="{样式类名: 响应式数据，...}"`



想用数据为TRUE则有这个样式类，反之则没有，例如：

```html
<div
     class="static"
     v-bind:class="{active: isActive, 'text-danger': hasError}">
</div>
```

和如下data：

```js
data: {
    isActive: true,
    hasError: false
}
```

最终结果渲染为：`<div class="static active"></div>`

注意：`v-bind: class`指令也可以与普通的class共存。

##### 2.1.2 写在响应数据中

`:class="响应数据(对象)"`

```vue
<div v-bind:class="classObject"></div>

data: {
	classObject: {
		active: true,
		'text-danger': false,
	}
}
```

渲染结果为： `<div class="active"></div>`

##### 2.1.3 写在计算属性中

`:class="返回值是对象的计算属性"`，这里绑定一个返回对象的计算属性

**以下是一个常用且强大的模式：**

```vue
<div v-bind:class="classObject"></div>

data: {
	isActive: true,
	error: null,
},
computed: {
	classObject: function() {
		return {
			active: this.isActive && !this.error,
			'text-danger': this.error && this.error.type === 'fatal'
		}
	}
}
```

#### 2.2 数组控制样式类

`:class="[响应式数据1,...]"`

控制响应式数据的值是对应的样式类或者没有值，来控制是否有这个样式。

例如：

```vue
<div v-bind:class="[activeClass, errorClass]"></div>

data: {
	activeClass: 'active',
	errorClass: 'text-danger'
}
```

渲染为：`<div class="activeClass errorClass"></div>`

注意：

- 如果想根据条件切换列表中的class，可以使用三元表达式——较繁琐。

  `<div v-bind:class="[active ? activeClass: '', errorClass]"></div>`

- 在数组语法中可以使用对象语法：

  `<div v-bind:class="[{active: isActive}, errorClass]"></div>`

### 3. 动态控制style样式

与动态控制class类名基本一致，可以使用驼峰式(camelCase)或短横线分隔(kebab-case)来命名。