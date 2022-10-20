## React 组件基础

### 1. 组件概念

![](/Users/Kurja/Desktop/Typora/React/%E7%AC%AC%E4%B8%80%E6%AC%A1%E7%B3%BB%E7%BB%9F%E5%AD%A6%E4%B9%A0/e6c9d24egy1h4nvakt71wj21320f40t5.jpg)

### 2. 函数组件

**目标任务：**能够独立使用函数完成 react 组件的创建和渲染

**概念：**使用 JS 的函数（或箭头函数）创建的组件，就叫做函数组件。

**组件定义与渲染**

```jsx
// 定义函数组件
function HelloFn () {
  return <div>这是我的第一个函数组件</div>
}

// 定义类组件
function App () {
  return (
  	<div className="App">
    	{/* 渲染函数组件 */}
      <HelloFn />
      <HelloFn></HelloFn>
    </div>
  )
}

export default App
```

**约定说明**

1. **组件的名称必须首字母大写**，react 内部会根据这个来判断是组件还是普通的 HTML 标签；
2. **函数组件必须有返回值**，表示该组件的 UI 结构；如果不需要渲染任何内容，则返回 null；
3. 组件就像 HTML 标签一样可以被渲染到页面中。组件表示的是一段结构内容，对于函数组件来说，**渲染的内容是函数的返回值**就是对应的内容；
4. 使用函数名称作为组件标签名称，可以成对出现也可以自闭合。

### 3. 类组件

**目标任务：**能够独立完成类组件的创建和渲染。

**概念：**使用 ES6 的 class 创建的组件，叫做类（class）组件。

**组件的定义与渲染：**

```jsx
// 引入 React
import React from 'react'

// 定义类组件
class HelloC extends React.Component {
  render () {
    return <div>这是我的第一个类组件！</div>
  }
}

function App () {
  return (
  	<div className="App">
    	{/* 渲染类组件 */}
      <HelloC />
      <HelloC></HelloC>
    </div>
  )
}

export default App
```

**约定说明：**

1. **类名称也必须以大写字母开头；**
2. 类组件应该继承 React.Component 父类，从而使用父类中提供的方法或属性；
3. 类组件必须提供 render 方法，**render 方法必须有返回值，表示该组件的 UI 结构。**

### 4. 事件绑定

**目标任务：**能独立绑定任何事件并能获取事件对象 e。

##### 4.1 如何绑定事件

- 语法

  `on + 事件名称 = { 事件处理程序 }`，比如：`<div onClick={() => {}}></div>`

- 注意点

  react 事件采用驼峰命名法，比如：onMouseEnter、onFocus

- 样例

  ```jsx
  // 函数组件
  function HelloFn () {
  	// 定义事件回调函数
    const clickHandler = () => {
      console.log('事件被触发了')
    }
    return (
    	// 绑定事件
      <button onClick={ clickHandler }>click me!</button>
    )
  }
  
  // 类组件
  class HelloC  extends React.Component {
    // 定义事件回调函数
    clickHandler = () => {
      console.log('事件被触发了')
    }
    render () {
      return (
      	// 绑定事件
        <button onClick={this.clickHandler}>click me!</button>
      )
    }
  }
  ```

#### 4.2 获取事件对象

通过事件处理程序的参数获取事件对象 e

```jsx
// 函数组件
function HelloFn () {
  // 定义事件回调函数
  const clickHandler = (e) => {
    e.preventDefault()
    console.log('事件被触发了', e)
  }
  return (
  	// 绑定事件
    <a href="https://www.google.com/" onClick={clickHandler}>谷歌</a>
  )
}
```

### **5. 组件状态**

**目标任务：**能够为组件添加状态和修改状态的值。

一个前提：在 react hook 出来之前，函数式组件是没有自己的状态的，所以我们统一通过类组件来学习。

![](/Users/Kurja/Desktop/Typora/React/%E7%AC%AC%E4%B8%80%E6%AC%A1%E7%B3%BB%E7%BB%9F%E5%AD%A6%E4%B9%A0/e6c9d24egy1h4nxgnouy3j21ab0bodgt-20220729174930899.jpg)

#### **5.1 初始化状态**

- 通过 class 的实例属性 state 来初始化
- state 的值是一个对象结构，表示一个组件可以有多个状态

```jsx
class Counter extends React.Component {
 	// 初始化状态
 	state = {
  	count: 0
	}
 	render() {
  	return <button>计数器</button>
	}
}
```

#### 5.2 读取状态

通过 `this.state`来获取状态

```jsx
class Counter extends React.Component {
  // 初始化状态
  state = {
    count: 0
  }
  render() {
    // 读取状态
    return <button>计数器{this.state.count}</button>
  }
}
```

#### 5.3 修改状态

- 语法：`this.setState({ 要修改的部分数据 })`

- setState 方法的作用

  a. 修改 state 中的数据状态

  b. 更新 UI

- 思想：数据驱动视图，也就是只需要修改数据状态，页面就会自动刷新，无需手动操作 dom

- 注意事项：**不要直接修改 state 中的值，必须通过 setState 方法进行修改**

```jsx
class Counter extends React.Component {
  // 定义数据
  state = {
    count: 0
  }
  // 定义修改数据的方法
  setCount = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  // 使用数据并绑定事件
  render () {
    return <button onClick={this.setCount}>{this.state.count}</button>
  }
}
```

### 6. this 问题说明

![](/Users/Kurja/Desktop/Typora/React/%E7%AC%AC%E4%B8%80%E6%AC%A1%E7%B3%BB%E7%BB%9F%E5%AD%A6%E4%B9%A0/e6c9d24egy1h4nymen1m2j20l207ewfk.jpg)

这里作为了解内容，随着 js 标准的发展，主流的写法已经变成了 class fields，无需考虑太多 this 问题。

### 7. 表单处理

**目标任务：**能够使用受控组件的方式获取文本框的值。

使用 react 处理表单元素，一般有两种方式：

1. 受控组件（推荐使用）
2. 非受控组件（了解）

#### 7.1 受控组件表单

> 什么是受控组件？**input 框自己的状态被 React 组件状态控制**

React 组件的状态的地方是在 state 中，input 表单元素也有自己的状态是在 value 中，react 将 state 与表单元素的值（value）绑定到一起，由 state 的值来控制表单元素的值，从而保证单一数据源特性。

**实现步骤：**

以获取文本框的值为例，受控组件的使用步骤如下：

1. 在组件的 state 中声明一个组件的状态数据；
2. 将状态数据设置为 input 标签元素的 value 属性的值；
3. 为 input 添加 change 事件，在事件处理程序中，通过事件对象 e 获取到当前文本框的值（即用户输入的值）；
4. 调用 setState 方法，将文本框的值作为 state 状态的最新值。

```jsx
import React from 'react'

class InputComponent extends React.Component {
  // 声明组件状态
  state = {
    message: 'this is message',
  }
  // 声明事件回调函数
  changeHandler = (e) => {
    this.setState({ message: e.target.value })
  }
  render() {
    return (
    	<div>
      	{/* 绑定 value 绑定事件 */}
        <input value={this.state.message} onChange={this.chanegHandler} />
      </div>
    )
  }
}

function App () {
  return (
  	<div className="App">
    	<InputComponent></InputComponent>
    </div>
  )
}
```

#### 7.2 非受控组件

> 什么是非受控组件？非受控组件就是通过手动操作 dom 的方式获取文本框的值，文本框的状态不受 reeact 组件的 state 中的状态控制，直接通过原生 dom 获取输入框的值。

**实现步骤：**

1. 导入 createRef 函数；
2. 调用 createRef 函数，创建一个 ref 对象，存储到名为 msgRef 的实例属性中；
3. 为 input 添加 ref 属性，值为 msgRef；
4. 在按钮的事件处理程序中，通过 `msgRef.current` 即可拿到 input 对应的 dom 元素，而其中 `msgRef.current.value` 拿到的就是文本框的值。

```jsx
import React, { createRef } from 'react'

class InputComponent extends React.Component {
  // 使用 createRef 产生一个存放 dom 的对象容器
  msgRef = createRef()
  
  changeHandler = () => {
    console.log(this.msgRef.current.value)
  }
  
  render() {
    return (
    	<div>
      	{/* ref 绑定获取真实 dom */}
        <input ref={this.msgRef} />
        <button onClick={this.changeHandler}>click</button>
      </div>
    )
  }
}

function App () {
  return (
  	<div className="App">
    	<InputComponen />
    </div>
  )
}

export default App
```

 