## 详解 React useCallback & useMemo

### 1. 前言

理解 useCallback 和 useMomo 之前需要对 useState 和 useEffect 有基础的了解。

### 2. useCallback

#### 2.1 useCallback 的作用

官方文档：

> Pass an inline callback and an array of dependencies. useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed.

**简单来说就是返回一个函数，只有依赖项发生变化的时候才会更新（返回一个新的函数）。**

#### 2.2 useCallback 的应用

在线代码： [Code Sandbox](https://link.juejin.cn/?target=https%3A%2F%2Fcodesandbox.io%2Fs%2Fusecallback1-yu1sp)

```jsx
import React, { useState, useCallback } from 'react';
import Button from './Button';

export default function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  
  const handleClickButton1 = () => {
    setCount(count + 1)
  }
  
  const handleClickButton2 = useCallback(() => {
    setCount2(count2 + 1)
  }, [count2])
  
  return (
  	<div>
    	<div>
      	<Button onClickButton={handleClickButton1}>Button1</Button>
      </div>
      <div>
      	<Button onClickButton={handleClickButton2}>Button2</Button>
      </div>
      <div>
      	<Button onClickButton={() => {
            setCount3(count3 + 1)
          }}>Button3</Button>
      </div>
    </div>
  )
}
```

```jsx
// Button.jsx
import React from 'react';

const Button = ({ onClickButton, children }) => {
  return (
  	<>
    	<button onClick={onClickButton}>{children}</button>
    	<span>{Math.random}</span>
    </>
  )
}

export default React.memo(Button)
```

在案例中可以分别点击 Demo 中的几个按钮来查看效果：

- 点击 Button1 的时候只会更新 Button1 和 Button3 后面的内容；
- 点击 Button2 会将三个按钮后的内容都更新;
- 点击 Button3 的也是只更新 Button1 和 Button3 后面的内容。

上述效果仔细理一理就可以发现，只有经过 `useCallback` 优化后的 Button2 是点击自身时才会变更，其他的两个只要父组件更新后都会变更（这里 Button1 和 Button3 其实是一样的，无非就是函数换了个地方写）。

> 这里或许会注意到 Button 组件的 `React.memo` 这个方法，此方法内会对 props 做一个浅层比较，如果 props 没有发生改变，则不会重新渲染此组件。

```js
const a = () => {}
const b = () => {}
a === b // false
```

```jsx
const [count1, setCount1] = useState(0)
// ...
const handleClickButton1 = () => {
  setCount1(count1 + 1)
}
// ...
return <Button onClickButton={handleClickButton}>Button1</Button>
```

回头看上面的 `Button` 组件需要一个 `onClickButton` 的 props，尽管组件内部有用 `React.memo` 来做优化，但是我们声明的 `handleClickButton1` 是直接定义了一个方法，这也就导致只要是父组件重新渲染（状态或者 props 更新）就会导致这里声明出一个新的方法，新的方法和旧的方法尽管长的一样，但是依旧是两个不同的对象，`React.memo` 对比后发现对象 props 改变，就重新渲染了。

```jsx
const handleClickButton2 = useCallback(() => {
  setCount2(count2 + 1)
}, [count2])
```

上面的代码我们的方法使用 useCallback 包装了一层，并且后面还传入一个 `[count2]` 变量，这里 useCallback 就会根据 `count2` 是否发生变化，从而决定是否返回一个新的值，函数内部作用域也随之更新。

由于我们的这个方法只依赖了 `count2` 这个变量，而且 `count2` 只在点击 Button2 后才会更新 `handleClickButton2` ，所以就导致了我们点击 Button1 不重新渲染 Button2 的内容。

#### 2.3 Tips

```tsx
import React, { useState, useCallback } from 'react'
import Button from './Button'

export default function App() {
  const [count2, setCount2] = useState(0)
  const handleClickButton2 = useCallback(() => {
    setCount2(count2 + 1)
  }, [])
  return (
    <Button
      count={count2}
      onClickButton={handleClickButton2}>Button2</Button>
  )
}
```

我们调整了一下代码，将 `useCallback` 依赖的第二个参数变成一个空的数组，这也就意味着这个方法没有依赖值，将不会被更新。且由于 JS 的静态作用域导致此函数内 `count2` 永远都是 `0`。

可以点击多次 Button2 查看变化，会发现 Button2 后面值只会改变一次。因为上述函数内的 `count2` 永远都是 `0` ,这就意味着每次都是 `0 + 1` ，Button 所接受的 `count` props，也只会从 `0` 变成 `1` 且一直都将是 `1`，而且 `handleClickButton2` 也因没有依赖不会返回新的方法，就导致 Button 组件只会因 `count` 改变而更新一次。

