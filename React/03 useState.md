## 简单易懂的 React useState() Hook 指南

### 前言

状态是隐藏在组件中的信息，组件可以在父组件不知道的情况下修改其状态。我更偏爱函数组件，因为它们足够简单，要使函数组件具有状态管理，可以 `useState()` Hook。

本文会逐步讲解如何使用 `useState` Hook。此外，还会介绍一些常见 `useState` 坑。

### 1. 使用 `useState` 进行状态管理

无状态的函数组件，如下所示（部分代码）：

```jsx
import React from 'react'

function Bulbs() {
  return <div className='bulb-off' />
}
```

可以找[codesandbox](https://codesandbox.io/s/react-usestate-stateless-component-mg2yr) 尝试一下。



运行效果如下：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/18/16e7bd1057d77dda~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

这时，要如何添加一个按钮来打开/关闭灯泡呢？为此，我们需要具有状态的函数组件，也就是有状态函数组件。

`useState()` 是实现灯泡开关状态的 Hooks，将状态添加到函数组件需要 4 个步骤：启用状态、初始化、读取和更新。

#### 1.1 启用状态

要将 `<Bulbs>` 转换为有状态组件，需要告诉 React：从 `react` 包中导入 `useState` 钩子，然后在组件函数的顶部调用 `useState()`。

大致如下所示：

```jsx
import React, { useState } from 'react';

function Bulbs() {
  ... = useState(...);
  return <div className="bulb-off" />;
}
```

在`Bulbs`函数的第一行调用`useState()`（暂时不要考Hook的参数和返回值）。 重要的是，在组件内部调用 Hook 会使该函数成为有状态的函数组件。

启用状态后，下一步是初始化它。

#### 1.2 初始化状态

始时，灯泡关闭，对应到状态应使用 `false` 初始化 Hook：

```jsx
import React, { useState } from 'react';

function Bulbs() {
  ... = useState(false);
  return <div className="bulb-off" />;
}
```

`useState(false)` 用 `false` 初始化状态。

启用和初始化状态之后，如何读取它？来看看 `useState(false)` 返回什么。

#### 1.3 读取状态

当 hook `useState(initialState)` 被调用时，当它返回一个数组，该数组的第一项是状态值。

```jsx
const stateArray = useState(false);
stateArray[0]; // => 状态值
```

读取组件的状态

```jsx
function Bulbs() {
	const stateArray = useState(false)
  return <div className={stateArray[0] ? 'bulb-on' : 'bulb-off'}></div>
}
```

`Bulbs` 组件状态初始化为 `false`，可以找[codesandbox](https://codesandbox.io/s/react-usestate-stateless-component-mg2yr) 尝试一下。

`useState(false)` 返回一个数组，第一项包含状态值，该值当前为 `false` （因为状态已用 `false` 初始化）。

可以使用数组解构来将状态提取到变量 `on` 上：

```jsx
import React, { useState } from 'react';

function Bulbs() {
  const [on] = useState(false);
  return <div className={on ? 'bulb-on' : 'bulb-off'} />;
}
```

`on` 状态变量保存状态值。

状态已经启用并初始化，现在可以读取它了。

#### 1.4 更新状态

##### 用值更新状态

`useState(initialState)` 返回一个数组，其中第一项是状态值，第二项是一个更新状态的函数。

```jsx
const [state, setState] = useState(initialState);

// 将状态更改为 'newState' 并触发重新渲染
setState(newState);

// 重新渲染 state 后的值为 newState
```

要更新组件的状态，请使用状态调用更新器函数 `setState(newState)`。组件重新渲染后，状态接收新值 `newState`。

当点击 `开灯` 按钮时将灯泡开关状态更新为 `true` ，点击 `关灯` 时更新为 `false`。

```jsx
import React, { useState } from 'react';

function Bulbs() {
  const [on, setOn] = useState(false);

  const lightOn = () => setOn(true);
  const lightOff = () => setOn(false);

  return (
    <>
      <div className={on ? 'bulb-on' : 'bulb-off'} />
      <button onClick={lightOn}>开灯</button>
      <button onClick={lightOff}>关灯</button>
    </>
  );
}
```

打开 [codesandbox](https://link.juejin.cn/?target=https%3A%2F%2Fcodesandbox.io%2Fs%2Freact-usestate-state-update-lxj5i) 自行尝试一下。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/18/16e7bd1b29bf501f~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

单击开灯按钮时，`lightOn()`函数将`on`更新为`true`: `setOn(true)`。单击关灯时也会发生相同的情况，只是状态更新为`false`。

状态一旦改变，React 就会重新渲染组件，`on`变量获取新的状态值。

状态更新作为对提供一些新信息的事件的响应。这些事件包括按钮单击、HTTP 请求完成等，确保在事件回调或其他 Hook 回调中调用状态更新函数。

##### 使用回调更新状态

当使用前一个状态计算新状态时，可以使用回调更新该状态。

```jsx
const [state, setState] = useState(initialState)
...
setState(prevState => nextState)
...
```

下面是一些事例：

```jsx
// Toggle a boolean
const [toggle, setToggled] = useState(false)
setToggled(toggled => !toggled)

// Increase a counter
const [count, setCount] = useState(0)
setCount(count => count + 1)

// Add an item to array
const [items, setItems] = useState([])
setItems(items => [...items,'New Item'])
```

接着，通过这种方式重新实现上面电灯的示例：

```jsx
import React, { useState } from 'react'

function Bulbs() {
  const [on, setOn] = useState(false)
  const lightSwitch = () => setOn(on => !on)
  
  return (
  	<>
    	<div className={ on ? 'bulb-on' : 'bulb-off'}></div>
    	<button onClick={lightSwitch}>开灯/关灯</button>
    </>
  )
}
```

打开 [codesandbox](https://link.juejin.cn/?target=https%3A%2F%2Fcodesandbox.io%2Fs%2Freact-usestate-state-update-functional-dhesq) 自行尝试一下。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/18/16e7bd201900e014~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

`setOn(on => !on)`使用函数更新状态。