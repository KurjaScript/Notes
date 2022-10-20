### 1. 定义

监听某个对象，要把监听对象克隆一份给Proxy代理，原对象没有变化。Proxy()构造函数用于创建Proxy对象。

Proxy()构造函数只能通过实例获取，才能触发。

### 2. 语法

`new Proxy(target, handler)`

其中，target为还要包装的目标对象Proxy，它可以是任何类型的对象。handler是一个对象，其属性是定义对Proxy执行操作时的行为的函数。

### 3. Proxy 与 defineProperty 的区别

- Proxy优势在于，不用每一个属性都进行劫持，它是整个对象的劫持。
- defineProperty是一个一个劫持。

