## useEffect 初级

https://juejin.cn/post/6867338827418042375

作为 React 开发者，你能答上如下两个问题么：

1. 对于如下函数组件：

```jsx
function Child() {
  useEffect(() => {
    console.log('child')
  },[])
  return <p>hello</p>
} 

function Parent() {
  useEffect(() => {
    console.log('parent')
  },[])
  return <Child/>
}

function App() {
  useEffect(() => {
    console.log('app')
  }, [])
  return <Parent/>
}
```

渲染 `<App/>` 时控制台的打印顺序是？

2. 如下两个回调函数的调用时机相同么？

```jsx
// compponentDidMount 生命周期钩子
class App extends React.Component {
  componentDidMount() {
    console.log('hello')
  }
}

// 依赖为 [] 的 useEffect
useEffect(() => {
  console.log('hello')
}, [])
```

答案：

```jsx
👉向右滑动翻看答案                                                 1. child -> parent -> app
                                                                2. 不同                                              
```

