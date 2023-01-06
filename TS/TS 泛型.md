### 1. 前言

泛型，是 TS 最难理解的部分，拿下了泛型，TS 就没什么难的了。

> 软件工程中，我们不仅要创建一致定义良好的 API，同时也要考虑可重用性。组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。
>
> 在像 C# 和 Java 这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。这样用户就可以以自己的数据类型来使用组件。

### 2. 泛型的基本使用

#### 2.1 处理函数参数

泛型的语法是 `<>` 里写类型参数，一般可以用 `T` 来表示。

```typescript
function print<T>(arg: T):T {
  console.log(arg)
  return arg
}
```

这样，我们就做到了输入和输出的类型统一，且可以输入输出任何类型。

如果类型不统一，就会报错。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4411b32b4414c8585892199cd8cd9f8~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

泛型中的 T 就想一个占位符、或者说一个变量，在使用的时候可以把定义的类型**像参数一样传入**，它可以**原封不动地输出**。

> 泛型的写法对前端工程师来说有点古怪，比如 `<>` `T`，但记住就好，只要一看到 `<>`，就知道这是泛型。

我们在使用的时候可以有两种方式指定类型。

- 定义要使用的类型
- TS 类型推断，自动推导出类型

```typescript
print<string>('hello') // 定义 T 为 string

print('hello') // TS 类型推断，自动推导类型为 string
```

我们知道，type 和 interface 都可以定义函数类型，也用泛型来写一下，.

type 这么写：

```typescript
type  Print = <T>(arg: T) => T
const printFn:Print = function print(arg) {
  console.log(arg)
  return arg
}
```

Interface 这么写：

```typescript
interface Iprint<T> {
	(arg: T): T
}
function print<T>(arg: T) {
  console.log(arg)
  return arg
}
const myPrint: Iprint<number> = print
```

#### 2.2 默认参数

如果要给泛型加默认参数，可以这么写：

```typescript
interface Iprint<T = number> {
  (arg: T): T
}
function print<T>(arg: T) {
  console.log(arg)
  return arg
}
const myPrint: Iprint = print
```

#### 2.3 处理多个函数参数

现在有这么一个函数，传入一个只有两项的元组，交换元组的第 0 项和第 1 项，返回这个元组。

```typescript
function swap(tuple) {
  return [tuple[1], tuple[0]]
}
```

这样写就丧失了类型，用泛型改造一下。用 T 代表第 0 项的类型，用 U 代替第 1 项的类型。

```typescript
function swap<T, U>(tuple: [T, U]):[U, T] {
  return [tuple[1], tuple[0]]
}
```

这样就实现了元组第 0 项和第 1 项类型的控制。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a9a08e24f1a481e81fa89d3e8220dcc~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

传入的参数里，第 0 项为 string 类型，第 1 项为 number 类型。

在交换函数的返回值里，第 0 项为 number 类型，第 1 项为 string 类型。

第 0 项上全是 number 的方法。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1766430bbdc42bbb53687354af65795~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

第 1 项上全是 string 的方法。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34d4c780556344999bdc460f04bf11d7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

#### 2.4 函数副作用操作

泛型不仅可以很方便地约束函数的参数类型，还可以用在函数执行副作用操作的时候。

假如有一个通用的异步请求方法，想根据不同的 url 请求返回不同类型的数据。

```typescript
function request(url: string) {
  return fetch(url).then(res => res.json())
}
```

调用一个获取用户信息的接口：

```typescript
request('user/info').then(res => {
  console.log(res)
})
```

这个时候的返回结果 res 就是一个 any 类型，非常讨厌。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f611ca6aa43547a9adf9dea388b9579a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

**我们希望调用 API 都清晰地知道返回类型是什么数据结构**，就可以这么做：

```typescript
interface UserInfo {
  name: string
  age: number
}
function request<T>(url: string): Promise<T> {
  return fetch(url).then(res => res.json())
}
request<UserInfo>('user/info').then(res => {
  console.log(res)
})
```

这样就能很舒服地拿到接口返回的数据类型，开发效率大大提高：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d85a3ad4567f4bc4bdca004853755192~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)