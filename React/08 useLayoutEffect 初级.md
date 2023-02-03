## LayoutEffect 初级

**uselayoutEffect 的用法如下：**

```tsx
useLayoutEffect(setup, dependencies?)
```

要了解 layoutEffect 和 useEffect 的区别，需要看下面这张图：

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4452a2050c154087bb4212e7abd08fac~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

react 函数组件执行过程时先执行函数组件代码，变成虚拟 dom，再经过编译后转化成真实 dom，让 render 函数去渲染并更新视图。是一个从上到下数据变换的过程。

**useEffect 发生在视图更新后，而 layoutEffect 发生在编译成 dom 元素之后视图更新之前。**useLayoutEffect  比 useEffect 先执行。

```tsx
export default function App() {
  const [state, setState] = React.useState(0)
  useEffect(() => {
    console.log("第一次 render 时执行")
  }, [])
  useEffect(() => {
    if(state > 0) {
      console.log("第二次之后 render 时执行")
    }
  }, [state])
  useLayoutEffect(() => {
    console.log("我比 useEffect 先执行")
  })
  return (
  	<div className="App">
      <h1>{state}</h1>
      <button 
        onClick={() => {
          setState((x) => x + 1)
        }}
       >
        按钮+1
      </button>
    </div>
  )
}
```

上面的代码第一次渲染后是这样的

```typescript
我比 useEffect 先执行
第一次 render 时执行
```

点击 button 后的控制台变成了这样

```typescript
我比 useEffect 先执行
第一次 render 时执行
我比 useEffect 先执行
第二次之后 render 时执行
```



`useEffect` 的代码是按照顺序执行的，但 `useLayoutEffect` 总比 `useEffect` 先执行。由于 `useLayoutEffect` 的代码是跟 DOM 操作相关的，所以**最好在里面写跟 DOM 相关的代码**。

由于 `useEffect` 和 `useLayoutEffect` 的执行顺序不同，定位也不同，由于操作 DOM 需要一定的时间，我们最好优先使用 `useEffect` ，以保证用户第一时间渲染出来。

如果业务需求是先要进行 DOM 操作或者跟页面布局相关的，那么就可以 `useLayoutEffect ` 。

