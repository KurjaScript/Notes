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



### 3. 开始使用 React-Query

安装 React-Query

```shell
$ npm i react-query
# or
$ yarn add react-query
```

下面我们用 React-Query改写

```jsx
import { useQuery } from 'react-query'

function App() {
  const { data, isLoading, isError } = useQuery('userData', () => {
    axios.get('/api/user')
  })
  if (isLoading) {
    return <div>loading</div>
  }
  return (
  	<ul>
      {data.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  )
}
```

例子中 "userData" 字符串就是这个 query 独一无二的 key。可以看到，React-Query 封装了完整的请求中间状态（isLoading、isError...）。不仅如此，React-Query 还为我们做了如下工作：

1. 多个组件请求同一个 query 时只发出一个请求；
2. 缓存数据失效/更新策略（判断缓存何时失效，失效后自动请求数据）；
3. 对失效数据垃圾清理。

### 4. React-Query 中的三个重要知识点

#### 4.1 常用参数配置

- staleTime 重新获取数据的时间间隔 默认0

- cacheTime 数据缓存时间 默认 1000 60 5 5分钟
- retry 失败重试次数 默认 3次

- refetchOnWindowFocus 窗口重新获得焦点时重新获取数据 默认 false

- refetchOnReconnect 网络重新链接

- refetchOnMount 实例重新挂载

- enabled 如果为 “false” ，“useQuery”不会触发，需要使用其返回的“refetch”来触发操作。

如何全局配置呢？如下：

```jsx
import { ReactQueryConfigProvider, ReactQueryProviderConfig } from 'react-query'

const queryConfig: ReactQueryProviderConfig = {
  /**
  	* refetchOnWindowFocus 窗口获得焦点时重新获取数据
  	* staleTime 过多久重新获取服务端数据
  	*cacheTime 数据缓存时间 默认是 5 * 60 * 1000 5分钟
  	*/
  queries: {
    refetchOnwindowFocus: true,
    staleTime: 5 * 60 * 1000,
    retry: 0
  },
};

ReactDOM.render(
  <ReactQueryConfigProvider config={queryConfig}>
  	<App />
  </ReactQueryConfigProvider>
  document.getElementById('root')
);

function Todos() {
  // 第三个参数即可传参了
  // "enabled" 参数为 false，不会自动发起请求，而是需要调用 "refetch" 来触发
  const {
    isIdle,
    isLoading,
    isError,
    data,
    error,
    refetch,
    isFetching
  } = useQuery('todos', fetchTodoList, {
    enabled: false,
  })
  
  return (
  	<>
    	<button onClick={() => refetch()}>Fetch Todos</button>
    	{isIdle ? (
  			'Not ready...'
  		) : isLoading ? (
  			<span>Loading...</span>
  		) : isError ? (
  			<span>Error: {error.message}</span>
  		): (
  			<>
    			<ul>
    				{data.map(todo => (
      				<li key={todo.id}>{todo.title}</li>
      			))}
    			</ul>
    			<div>{isFetching ? 'Fetching...' : null}</div>
    		</>
  		)}
    </>
  )
}

```

#### 4.2 useQuery（查）查询数据（Get）

##### 基本使用方法

```jsx
function Todos() {
  // useQuery 的第一个参数，作为 useQuery 查询的唯一标识，该值唯一
  // 可以是 string、array、object
  // string -> useQuery('todos', ...) queryKey === ['todos']
  // array -> useQuery(['todo', 5, {preview: true}], ...) queryKey === ['todo', 5, {preview: true}]
  const { isLoading, isError, data, error } = useQuery('todos', fetchTodoList)
  
  if (isLoading) {
    return <span>Loading...</span>
  }
  
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  
  // also status === 'success', but "else" logic works,too
  return (
  	<ul>
    	{data.map(todo => {
        <li key={todo.id}>{todo.title}</li>
      })}
    </ul>
  )
}
```

##### 传递参数

```jsx
function Todos({ completed }) {
  // useQuery(['todo', {status: 1, page: 1}], ...) query === ['todo', { status: 1, page: 1 }]
  // 传递参数给 "fetchTodoList" 使用
  const queryInfo = useQuery(['todos', { status: 1, page: 1 }], fetchTodoList)
}

// 函数参数
// key -> "todos"
// status -> 1 page -> 1
function fetchTodoList(key, { status, page }) {
  return new Promise()
  // ...
}
```

该库还实现可常用的查询操作：[分页查询、无限滚动](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/)

##### useMutation（增、改、查）操作数据（Post, Delete, Patch, Put）

```jsx
// 当 "mutate()" 被调用时，执行 "pingMutation"
const PingPong = () => {
  const [mutate, { status, data, error }] = useMutation(pingMutation)
  const onPing = async () => {
    try {
      const data = await mutate()
      console.log(data)
    } catch {
      
    }
  }
  return <button onClick={onPing}>Ping</button>
}
```

传递参数

```jsx
// "mutate({title})" 就会将参数 "title" 传递给 "createTodo" 函数了
const createTodo = ({ title }) => {
  console.log('title', title)
}

const CreateTodo = () => {
  const [title, setTitle] = useState('')
  const [mutate] = useMutation(createTodo)
  const onCreateTodo = async e => {
    e.preventDefault()
    try {
      await mutate({title})
      // Todo was successfully created
    } catch (error) {
      // Uh oh, something went wrong
    }
  }
  
  return (
    <form onSubmit={onCreateTodo}>
    	<input 
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        />
      <br />
      <button type="submit">Create Todo</button>
    </form>
  )
}
```

