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

### 3. 约束泛型

假设有这样一个函数，打印传入参数的长度：

```typescript
function printLength<T>(arg: T): T {
  console.log(arg.length)
  return arg
}
```

因为不确定 T 是否有 length  属性，会报错：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/836e0afdd34b42f2aec13628168dfd23~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

可以和 interface 结合，来约束类型。

```typescript
interface ILength {
  length: number
}
function printLength<T extends ILength>(arg: T): T {
  console.log(arg.length)
  return arg
}
```

这其中的关键就是 `<T extends ILength>`，让这个泛型继承接口 `ILength`，这样就能约束泛型。

我们定义的变量一定要有 length 属性，比如下面的 str、arr 和 obj，才可以通过 TS 编译。

```typescript
const str = printLength('lin')
const arr = printLength([1,2,3])
const obj = printLength({length: 10})
```

这个例子也再次印证了 interface 的 `duck typing`（类？）。只要你有 length 属性，都符合约束，那就不管你是 str、arr 还是 obj，都没问题。当然，如果定义一个不包含 length 属性的变量，比如数字，就会报错：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a8261afe4e7429a804c980d3c1eede7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

### 4. 泛型的一些应用

使用泛型，可以在定义函数、接口或类的时候，不预先指定具体类型，而是使用的时候再指定类型。

#### 4.1 泛型约束类

定义一个栈，有入栈和出栈两个方法，如果想入栈和出栈的元素类型统一，可以这么写：

```typescript
class Stack<T> {
	private data: T[] = []
  push(item:T) {
    return this.data.push(item)
  }
  pop():T | undefined {
    return this.data.pop()
  }
}
```

在定义实例的时候写类型，比如，入栈和出栈都要是 number 类型，就这么写：

```typescript
const s1 = new Stack<number>()
```

这样，入栈一个字符串就会报错：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6bf0b6eba6a40a486b1a74d490dd63a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

这是非常灵活的，如果需求变了，入栈和出栈都要是 string 类型，在定义实例的时候改一下就好了：

```typescript
const s1 = new Stack<string>()
```

这样，入栈一个数字就会报错：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8f15fa43b864d47800da8a24c85bd5d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

特别注意的是，**泛型无法约束类的静态成员。**

给 pop 方法定义 `static` 关键字，就报错了

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8843a0a665f34484b4b13fab67bcc0a7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

#### 4.2 泛型约束接口

使用泛型，也可以对 interface 进行改造，让 interface 更灵活。

```typescript
interface IkeyValue<T, U> {
  key: T
  value: U
}

const k1: IKeyValue<number, string> = {key: 18, value: 'lin'}
const k2: IKeyValue<string, number> = {key: 'lin', value: 18}
```

