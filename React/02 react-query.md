## React-Query 让你的状态管理更优雅

### 1. 前言

以下是一个简单的从服务端获取数据的案例

```jsx
function App() {
  const [data, updateData] = useState(null)
  const [isError, setError] = useState(false)
  const [isLoading, setLoading] = useState(false)
  
  useEffect(async () => {
    setError(false)
    setLoading(true)
    try {
      const data = await axios.get('/api/user')
      updateData(data)
    } catch(e) {
      setError(true)
    }
    setLoading(false)
  }, [])
}
```

在使用  React Hooks 编写组件时，我们常常需要手动维护来自服务器的处理状态。在日常开发中引起一些麻烦。在处理异步数据时，我们需要考虑很多事情，例如更新，缓存或重新获取。使用 React-Query 能更高效地帮你管理服务端的状态。

### 2. React-Query 是什么

React-Query 是一个适用于 React Hooks 的请求库。这个库将帮助你获取、同步、更新和缓存你的远程数据，提供两个简单的 hooks，就能完成增删改查等操作。React-Query 使用声明式管理服务端状态，编写 useReduce，以及维护全局状态，只要知道如何使用 Promise 或 async / await，传递一个可解析数据（或引发错误）的函数，剩下的交给 React-Query 就好了，使用更少的代码获得更高的效率。