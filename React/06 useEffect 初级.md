## useEffect 初级

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

这段代码为计数器增加了一个小功能：将document 的 title 设置为包含了点击次数的消息。

**数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用。**

> 如果你熟悉 React class 的生命周期函数，你可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。

#### 

