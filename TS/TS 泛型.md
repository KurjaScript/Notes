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

