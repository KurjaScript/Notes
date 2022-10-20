### 1. 为什么使用插槽

为让我们封装的组件具有更强的扩展性。我们可以在双闭合标签内再编写一些其他内容，把这些内容作为组件扩充内容。

### 2. 插槽的基本使用

- 在组件里定义一个`<slot></slot>`
- 插槽的默认值, 例如`<slot>button</slot>`
- 如果有多个值，同时放入到组件进行替换时，则一起作为替换元素

![image-20220223113730585](C:\Users\Kurja\AppData\Roaming\Typora\typora-user-images\image-20220223113730585.png)

template模板中预留的插槽位置，调用组件时，传进来的内容默认传递进改插槽中。

### 3. 具名插槽的使用

#### 3.1 定义

在模板中给预留的插槽设置名字，为插入多个值中的某一个。

#### 3.2 实例

##### 3.2.1

```html
// 具名插槽：在模板中给预留的插槽设置名字
<template id="pageTemplate">
	<div class="box">
		<slot name="header"></slot>
		<slot></slot>
        <p>法国VICKI</p>
        <slot name="footer"></slot>
	</div>
</template>
```

```html
<page>
	// 具名插槽指定内容的时候需要用template把内容包起来：
    // v-slot: [name]把模板中的内容放置到指定的命名插槽下，
    // 剩余不指定的都插入到默认的插槽中<slot>
    <template v-slot:header>
        <div>我是页眉</div>
    </template>
    <p>hiao~</p>
    <template v-slot: footer>
        <div>我是页尾</div>
    </template>
</page>
```

##### 3.2.2 

```html
<template id="cpn">
	<div>
		<slot name="left"><span>左边</slot>
		<slot name="center"><span>中间</slot>
		<slot name="right"><span>右边</slot>
	</div>
</template>
```

```html
<div id="app">
	<cpn><span slot="center">标题</span></cpn>
	<cpn><button slot="left">返回</button></cpn>
</div>
```

#### 3.3 注意

- 具名插槽指定内容的时候需要用TEMPLATE把内容包起来；
- `v-slot: [name]`把模板中的内容放置到指定的命名槽下，剩余不指定的都是插入到默认的插槽中`<slot>`。

### 4. 作用域插槽

#### 4.1 编译作用域

先弄明白什么是**编译的作用域**。

- 官方给出一条准则：**父组件模板的所有东西都会在父级组件作用域内编译，子组件模板的所有东西都会在子级作用域内编译。**


- 作用域插槽的一个目的就是：**父组件替换插槽的标签，但是内容由子组件来提供。**

- 在组件调用指定的插槽区域，所处作用域依然是外层公用作用域，而不是组件的私有作用域，所以不能在插槽中直接用组件中的私有响应数据。例如`<p>{{context}}</p>`是不行的。

#### 4.2 定义

在插槽中想要拿到组件中的数据时，需要利用作用域插槽。

#### 4.3 实例

```vue
<template>
	<div class="box">
        <p>{{context}}</p>
        <!-- 给插槽中的信息提供数据 -->
        <slot :content="context" :age="age"></slot>
    </div>
</template>
```

```vue
<page>
	<!-- default是默认插槽的名字(插槽不设置名字，默认就是他) -->
    <!-- v-slot: default="kurja" => v-slot="kurja" -->
    <template>
		<p>SLOT: {{kurja.context}}</p>
		<p>SLOT: {{kurja.age}}</p>
    </template>
</page>
```

