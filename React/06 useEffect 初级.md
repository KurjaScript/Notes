## useEffect 初级

useEffect 用于处理组件中的 effect，通常用于**请求数据**，**事件处理**，**订阅**等相关操作。

### 1. useEffect 的第二个参数

**当 useEffect 没有第二个参数时**

![img](https://upload-images.jianshu.io/upload_images/19442465-8ab4650f824344d1.gif?imageMogr2/auto-orient/strip|imageView2/2/w/336/format/webp)

```tsx
const [count, setCount] = useState(0)
const [isLoading, setIsLoading] = useState(false)

useEffect(() => {
  setIsLoading(true)
  setTimeout(() => {
    setIsLoading(false)
  }, 1000)
  return () => {}
})

function handleClick() {
  setCount(count + 1)
}

return (
	<React.Fragment>
    {isLoading ? (
      <div>Loading...</div>
    ): (
      <div>
        <button onClick={handleClick}>Click me</button>
        <p>You click me {count} times!</p>
      </div>
    )}
)
```

通过这个例子可以看出来 useEffect 没有第二个参数时不停地在调用。



### 1. 副作用

**数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用。**

> 如果你熟悉 React class 的生命周期函数，你可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。

### 2. 无需清除的 effect

有时候，我们只想**在 React 更新 DOM 之后运行一些额外的代码。**比如发送网络请求，手动变更 DOM，记录日志，这些都是常见的无需清除的操作。因为我们在执行完这些操作之后，就可以忽略他们了。接下来对比一下使用 class 和 Hook 都是怎么实现这些副作用的。

#### 2.1 使用 class 的示例

在 React 的 class 组件中，`render` 函数是不应该有任何副作用的。一般来说，在这里执行操作太早了，我们基本上都是希望在 React 更新 DOM 之后才执行我们的操作。

这就是为什么在 React class 中，我们把副作用操作放到 `componentDidMount` 和 `componentDidUpdate` 函数中。回到示例中，这是一个 React 计数器的 class 组件。它在 React 对 DOM 进行操作之后，立即更新了 document 的 `title` 属性。

```jsx
class Example extends React.component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    document.title = `You clicked ${this.state.count} items`
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }
  
  render() {
    return (
    	<div>
      	<p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({count: this.state.count + 1})}>Click me</button>
      </div>
    )
  }
}
```

注意，**在这个 class 中，我们需要在两个生命周期函数中编写重复的代码。**

这是因为在很多情况下，我们希望在组件加载和更新时执行同样的操作。从概念上说，我们希望它在每次渲染之后执行 —— 但 React 的 class 组件没有提供这样的方法。即使我们提取出一个方法，我们还是要在两个地方调用它。

现在我们来看看如何使用 `useEffect` 执行相同的操作。

#### 2.2 使用 Hook 的示例

Effect Hook 可以使你在函数组件中执行副作用操作。

```jsx
import React, { useState, useEffect } from 'react';
function Example() {
  const [count, setCount] = useState(0)
  
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`
  })
  
  return (
    <div>
    	<p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

**useEffect 做了什么？**通过使用这个 Hook，你可以告诉 React 组件需要在渲染后执行某些操作。React 会保存你传递的函数（我们将它称之为 “effect”），并且在执行 DOM 更新之后调用它。在这个 effect 中，我们设置了 document 的 `title` 属性，不过我们也可以执行数据获取或调用其他命令式的 API。

**为什么在组件内部调用 useEffect ？**将 `useEffect` 放在组件内部让我们可以在 effect 中直接访问 `count` state 变量（或其他 props）。我们不需要特殊的 API 来读取它 —— 它已经保存在函数作用域中。Hook 使用了 JavaScript 的闭包机制，而不用在 JavaScript 已经提供了解决方案的情况下，还引入特定的 React API。

**useEffect 会在每次渲染后都执行吗？**是的，默认情况下，它的第一次渲染之后和每次更新之后都会执行。（我们稍后会谈到如何控制它。）你可能会更容易接受 effect 发生在“渲染”之后这种概念，不再用去考虑“挂载”还是“更新”。React 保证了每次运行 effect 的同时，DOM 都已经更新完毕。

#### 2.3 详细说明

现在我们已经对 effect 有了大致了解，下面这些代码应该不难看懂了：

```jsx
function Example() {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    document.title = `You clicked ${count} tiems`
  })
}
```

我们声明了 `count` state 变量，并告诉 React 我们需要使用 effect。紧接着传递函数给 `useEffect` Hook。此函就是我们的 effect。然后使用 `document.title`浏览器 API 设置 document 的 title。我们可以在 effect 中获取到最新的 `count` 值，因为它在函数的作用域内。当 React 渲染组件时，会保存已使用的 effect，并在更新完 DOM 后执行它。这个过程在每个=次渲染都会发生，包括首次渲染。

经验丰富的 JavaScript 开发者可能会注意到，传递给 `useEffect` 的函数在每次渲染中都会有所不同，这是刻意为之的。事实上这正是我们可以在 effect 中获取最新的 `count` 的值，而不用担心其过期的原因。**每次我们重新渲染，都会生成新的 effect，替换掉之前的。**某种意义上讲，effect 更像是渲染结果的一部分 —— 每个 effect “属于” 一次特定的渲染。

> **提示：**
>
> 与 componentDidMount 或 componentDidUpdate 不同，使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。大多数情况下，effect 不需要同步地执行。在个别情况下（例如测量布局），有单独的 `useLayoutEffect` Hook 供你使用，其 API 与 useEffect 相同。

### 3. 需要清除的 effect

有一些副作用是需要清除的，例如**订阅外部数据源**。这种情况下，清除工作是非常重要的，可以防止引起内存泄露！现在来比较一下如何用 class 和 Hook 来实现。

#### 3.1 使用 Class 的示例

在 React class 中，你通常会在 `componentDidMount` 中设置订阅，并在 `componentWillUnmount` 中清除它。例如，假设我们有一个 `ChatAPI` 模块，它允许我们订阅好友的在线状态。以下是我们如何使用 class 订阅和显示该状态：

```jsx
class FriendStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isOnline: null }
    this.handleStatusChange = this.handleStatusChange.bind(this)
  }
  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
    	this.props.friend.id,
      this.handleStatusChange
    )
  }
  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    })
  }
  
  render() {
    if (this.state.isOnline === null) {
      return 'Loading...'
    }
    return this.state.isOnline ? 'Online' : 'Offline'
  }
}
```

`componentDidMount` 和 `componentWillUnmount` 之间相互对应。使用声明周期函数迫使我们拆分这些逻辑代码，即使这两部分代码都作用于相同的副作用。

> 这个示例还需要编写 componentDidUpdate 方法才能保证完全正确。先暂时忽略这一点，后续会补充说明。

#### 3.2 使用 Hook 的示例

如何使用 Hook 编写这个组件，你可能认为需要单独的 effect 来执行清除操作。但由于添加和删除订阅的代码的紧密性，所以 `useEffect` 的设计是在同一个地方执行。**如果你的 effect 返回一个函数，React 将会在执行清除操作时调用它**：

```jsx
import React, { useState, useEffect } from 'react';

function FriendStatus(prop) {
  const [isOnline, setIsOnline] = useState(null)
  
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline)
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)
    // Specify how to clean up after this effect
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.froend.id, handleStatusChange)
    }
  })
  
  if (isOnline === null) {
    return 'Loading...'
  }
  return isOnline ? 'Online' : 'Offline';
}
```

**为什么要在 effect 中返回一个函数？**这是 effect 可选的清除机制。每个 effect 都可以返回一个清除函数。如此可以将添加和移除订阅的逻辑放在一起。它们都属于 effect 的一部分。

**React 何时清除 effect？React 会在组件卸载的时候执行清除操作。**正如之前学到的，effect 在每次渲染的时候都会执行。这就是为什么 React 会在执行当前 effect 之前对上一个 effect 进行清除。我们稍后将讨论为什么这将有助于避免 bug 以及如何在遇到性能问题时跳过此行为。

> **注意**
>
> 并不是必须为 effect 中返回的函数命名。这里我们将其命名为 cleanup 是为了表明此函数的目的，但其实也可以返回一个箭头函数或者另起一个别的名字。

#### 3.3 小结

了解了 `useEffect` 可以在组件渲染后实现各种不同的副作用。有些副作用可能需要清除，所以需要返回一个函数，其他的 effect 可能不必清除，所以不需要返回。effect Hook 使用同一个 API 来满足这两种情况。

