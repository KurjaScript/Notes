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

