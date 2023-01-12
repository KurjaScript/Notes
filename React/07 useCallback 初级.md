## 详解 React useCallback & useMemo

### 1. 前言

理解 useCallback 和 useMomo 之前需要对 useState 和 useEffect 有基础的了解。

### 2. useCallback

#### 2.1 useCallback 的作用

官方文档：

> Pass an inline callback and an array of dependencies. useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed.

简单来说就是返回一个函数，只有依赖项发生变化的时候才会更新（返回一个新的函数）。

