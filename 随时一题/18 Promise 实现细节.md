## Promise 实现细节

### 1. 手写前需要了解这些

#### 1.1 什么是宏任务与微任务？

JS 是单线程，但是一些高耗时操作会带来进程阻塞问题。为了解决这个问题，JS 有两种任务的执行模式：**同步模式（Synchronous）和异步模式（Asynchronous）**。

在异步模式下，创建**异步任务主要分为宏任务和微任务两种**。ES6 规范中，宏任务（Macrotask）称为 Task，微任务（Microtask）称为 Jobs。**宏任务是由宿主发起的，而微任务是由 JS 自身发起的。**

**宏任务与微任务的几种创建方式**

| 宏任务（Macrotask）      | 微任务（Microtask）             |
| ------------------------ | ------------------------------- |
| setTimeout               | requestAnimationFrame（有争议） |
| setInterval              | MutationObserver（浏览器环境）  |
| MessageChannel           | Promise.[ then/catch/finally ]  |
| I/O，事件队列            | process.nextTick（Node环境）    |
| setImmediate（Node环境） | queueMicrotask                  |
| script（整体代码块）     |                                 |

**如何理解 script（整体代码块）是个宏任务**

实际上，如果同时存在两个 script 代码块，会首先执行第一个 script 代码块中的同步代码，如果这个过程中创建了微任务并进入微任务队列，第一个 script 同步代码执行完之后，会首先去清空微任务队列，再去开启第二个 script 代码块的执行。所以这里应该就理解 script （整体代码块）为什么会是宏任务。

#### 1.2 什么是 EventLoop？

*![](/Users/Kurja/Desktop/Typora/%E9%9A%8F%E6%97%B6%E4%B8%80%E9%A2%98/e6c9d24egy1h52ww9o9d0j20dn0ep3yy.jpg)**

因为首次执行宏任务队列会有 script（整体代码块）任务，所以实际上就是 JS 解析完成后，在异步任务中，会先执行完所有的微任务，这也是很多面试题喜欢考察的。需要注意的是，**新创建的微任务会立即进入微任务队列排队执行，不需要等待下一次轮巡。**

#### 1.3 什么是 Promise A+ 规范

目前我们使用的 Promise 是基于 [Promise A+ 规范](https://promisesaplus.com/) 实现的。

检验一份手写 Promise 靠不靠谱，通过 Promise A+ 规范自然是基本要求，这里我们可以借助 [promises-aplus-tests](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fpromises-aplus-tests) 来检测我们的代码是否符合规范，后面我会讲到如何使用它。



### 2. Promise 核心逻辑实现

我们先简单实现一下 Promise 的基础功能。先看原生 Promise 实现的例子，第一步我们要完成相同的功能。

原生的例子：

```js
const promise = new Promise((resolve, reject) => {
	resolve('success')
	reject('err')
})
promise.then(value => {
  console.log('resolve', value)
}，reason => {
	console.log('reject',reason)
}）
// 输出 resolve success
```

我们先分析一下**基本原理**：

> 1. Promise 是一个类，在执行这个类的时候会传入一个执行器，这个执行器会立即执行；
> 2. Promise 会有三种状态
>    - Pending 等待
>    - Fulfilled 完成
>    - Rejected 失败
> 3. 状态只能由 Pending --> Fullfilled 或者 Pending --> Rejected，**且一旦发生改变不可二次修改**；
> 4. Promise 中使用 resolve 和 rejected 两个函数来更改状态；
> 5. then 方法内部做但事情就是状态判断
>    - 如果状态是成功，调用成功回调函数
>    - 如果状态是失败，调用失败回调函数

下面开始实现：

#### 2.1 新建 MyPromise 类，传入执行器 execytor

```js
// 新建 MyPromise.js

// 新建 MyPromise 类
class MyPromise (
	constructor(executor) {
		// executor 是一个执行器，进入会立即执行
		executor()
	}
)
```

#### 2.2 excutor 传入 resolve 和 reject 方法

```js 
// MyPromise.js

// 新建 MyPromise 类
class MyPromise {
  constructor(executor) {
    // executor 是一个执行器，进入会立即执行
    // 并传入 resolve 和 reject 方法
    executor(this.resolve, this.reject)
  }
  // resolve 和 reject 为什么要用箭头函数？
  // 如果直接调用的话，普通函数 this 指向的是 window 或者 undefined
  // 用箭头函数就可以让 this 指向当前实例对象
  // 更改成功后的状态
  resolve = () => {}
  // 更改失败后的状态
  reject = () => {}
}
```

#### 2.3 状态与结果的管理

```js
// MyPromise.js

// 先定义三个常量表示状态
const PENFING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// 新建 MyPromise 类
class MyPromise {
  constructor(executor) {
    // executor 是一个执行器，进入会立即执行
    // 并传入 resolve 和 reject 方法
    executor(this.resolve, this.reject)
  }
  
  // 储存状态的变量，初始值是 pending
  status = PENDING
  
  // resolve 为什么要用箭头函数？
  // 如果直接调用的话，普通函数 this 指向的是 window 或者 undefined
  // 用箭头函数就可以让 this 指向当前实例对象
  // 成功之后的值
  value = null;
  // 失败之后的原因
  reason = null
  
  // 更改成功后的状态
  resolve = (value) => {
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED
      // 保存成功之后的值
      this.value = value
    }
  }
  
  // 更改失败后的状态
  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为失败
      this.status = REJECTED
      // 保存失败的原因
      this.reason = reason
    }
  }
}
```

#### 2.4 then 的简单实现

```js
// MyPromise.js

then(onFulfilled, onRejected) {
  // 判断状态
  if (this.status === FULFILLED) {
    // 调用成功回调，并且把值返回
    onFulfilled(this.value)
  } else if (this.status === REJECTED) {
    // 调用失败回调，并且把原因返回
    onRejected(this.reason)
  }
}
```

#### 2.5 使用 module.exports 对外暴露 MyPromise 类

```js
// MyPromise.js
module.exports = MyPromsie
```

看一下完整代码：

```js
// MyPromsie.js

// 先定义三个常量表示状态
const PENFING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// 新建 MyPromise 类
class MyPromsie {
  constructor(executor) {
    executor(this.resolve, this.reject)
  }
  status = PENDING
  // 成功之后的值
  value = null
  // 失败之后的原因
  reason = null
  
  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
    }
  }
  
  // 更改失败后的状态
  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
    }
  }
  
  then(onFulfilled, onRejected) {
    // 判断状态
    if (this.status === FULFILLED) {
      // 调用成功回调，并且把值返回
      onFulfilled(this.value)
    } else if (this.status === REJECTED) {
      // 调用失败回调，并把原因返回
      onRejected(this.reason)
    }
  }
}

module.exports = MyPromise
```

使用手写代码执行上面的那个例子

```js
// 引入 MyPromise.js
// import MyPromise from './MyPromise'
const MyPromise = require('./MyPromise.js')
debugger
const promise = new MyPromise((resolve, reject) => {
  resolve('success')
  reject('err')
})

promise.then(value => {
  console.log('resolve', value)
}, reason => {
  console.log('reject', reason)
})

// 执行结果：resolve success
```

执行结果符合预期，第一步就完成了。



### 3. 在 Promise 类中加入异步逻辑

上面还没有经过异步处理，如果有异步逻辑加入会带来一些问题，例如：

```js
// test.js

const MyPromise = require('./MyPromise')
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 2000)
})

promise.then(value => {
  console.log('resolve',value)
}, reason => {
  console.log('reject', reason)
})

// 没有打印信息
```

分析原因：

>  主线程代码立即执行，setTimeout 是异步代码，then 会马上执行，这个时候判断 Promise 状态，状态是 Pending，然而之前并没有判断等待这个状态。

#### 3.1 缓存成功与失败回调

```js
// MyPromise.js

// MyPromise 类中新增
// 存储成功回调函数
onFulfilledCallback = null
// 存储失败回调函数
onRejectedCallback = null
```

#### 3.2 then 方法中的 Pending 的处理

```js
// MyPromise.js

then(onFulfilled, onRejected) {
  // 判断状态
  if (this.status === FULFILLED) {
    // 调用成功回调，并且把值返回
    onFulfilled(this.value);
  } else if (this.status === REJECTED) {
    // 调用失败回调，并且把原因返回
    onRejected(this.reason);
  } else if (this.status === PENDING) {
    // ==== 新增 ====
    // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
    // 等到执行成功失败函数的时候再传递
    this.onFulfilledCallback = onFulfilled;
    this.onRejectedCallback = onRejected;
  }
}
```

#### 3.3 resolve 与 reject 中调用回调函数

```js
// MyPromise.js

// 更改成功后的状态
resolve = (value) => {
  // 只有状态是等待，才执行状态修改
  if (this.status === PENDING) {
    // 状态修改为成功
    this.status = FULFILLED;
    // 保存成功之后的值
    this.value = value;
    // ==== 新增 ====
    // 判断成功回调是否存在，如果存在就调用
    this.onFulfilledCallback && this.onFulfilledCallback(value);
  }
}
```

```js
// MyPromise.js

// 更改失败后的状态
reject = (reason) => {
  // 只有状态是等待，才执行状态修改
  if (this.status === PENDING) {
    // 状态成功为失败
    this.status = REJECTED;
    // 保存失败后的原因
    this.reason = reason;
    // ==== 新增 ====
    // 判断失败回调是否存在，如果存在就调用
    this.onRejectedCallback && this.onRejectedCallback(reason)
  }
}
```

我们再执行一下上面的例子：

```js
// test.js

const MyPromise = require('./MyPromise')
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 2000); 
})

promise.then(value => {
  console.log('resolve', value)
}, reason => {
  console.log('reject', reason)
})

// 等待 2s 输出 resolve success
```

目前已经可以简单处理异步问题了。



### 4. 实现 then 方法多次调用添加多个处理函数

> Promise 的 then 方法是可以被多次调用的。这里如果有三个 then 的调用，如果是同步回调，那么直接返回当前的值就行；如果是异步回调，那么保存的成功失败的回调，需要用不同的值保存，因为都互不相同。之前的代码需要改进。

同样地，先看一个例子：

```js
// test.js

const MyPromise = require('./MyPromise')
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 2000); 
})

promise.then(value => {
  console.log(1)
  console.log('resolve', value)
})
 
promise.then(value => {
  console.log(2)
  console.log('resolve', value)
})

promise.then(value => {
  console.log(3)
  console.log('resolve', value)
})

// 3
// resolve success
```

目前的代码只能输出：`3 resolve success`，怎么可以把1、2弄丢呢！

要保证所有 then 中的回调函数都可以执行，所以要继续改造。

#### 4.1 MyPromsie 类中新增两个数组

```js
// MyPromise.js

// 存储成功回调函数
onFulfilledCallbacks = []
// 储存失败回调函数
// onRejectedCallback = null
onRejectedCallbacks = []
```

#### 4.2 回调函数存入数组中

```js
// MyPromise.js

then(onFulfilled, onRejected) {
  // 判断状态
  if (this.status === FULFILLED) {
    // 调用成功回调，并且把值返回
    onFulfilled(this.value);
  } else if (this.status === REJECTED) {
    // 调用失败回调，并且把原因返回
    onRejected(this.reason);
  } else if (this.status === PENDING) {
    // ==== 新增 ====
    // 因为不知道后面状态的变化，这里先将成功回调和失败回调存储起来
    // 等待后续调用
    this.onFulfilledCallbacks.push(onFulfilled);
    this.onRejectedCallbacks.push(onRejected);
  }
}
```

#### 4.3 循环调用成功和失败回调

```js
// MyPromise.js

// 更改成功后的状态
resolve = (value) => {
  // 只有状态是等待，才执行状态修改
  if (this.status === PENDING) {
    // 状态修改为成功
    this.status = FULFILLED
    // 保存成功之后的值
    this.value = value
    // === 新增 ===
    // resolve 里面将所有成功回调拿出来执行
    while (this.onFulfilledCallbacks.length) {
      // Array.shift() 取出数组第一个元素，然后()调用，shift 不是纯函数，取出后，数组失去该元素，直到数组为空
      this.onFulfilledCallbacks.shift()(value)
    }
  }
}
```

```js
// MyPromise.js

// 更改失败后的状态
reject = (reason) => {
  // 只有状态是等待，才执行状态修改
  if (this.status === PENDING) {
    // 状态成功为失败
    this.status = REJECTED;
    // 保存失败后的原因
    this.reason = reason;
    // ==== 新增 ====
    // resolve里面将所有失败的回调拿出来执行
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(reason)
    }
  }
}
```

再来运行一下，结果如下

```js
1
resolve success
2
resolve success
3
resolve success
```

完美！待续！！



#### 5. 实现 then 方法的链式调用

> then 方法要链式调用，就需要返回一个 Promise 对象
>
> then 方法里面 return 一个返回值作为下一个 then 方法的参数，如果 return 一个 Promise 对象，那么就需要判断它的状态。

举个例子

```js
// test.js

const MyPromise = require('./MyPromise')
const promise = new MyPromise((resolve, reject) => {
  // 目前这里只处理同步的问题
  resolve('success')
})

function other () {
  return new MyPromise((resolve, reject) =>{
    resolve('other')
  })
}
promise.then(value => {
  console.log(1)
  console.log('resolve', value)
  return other()
}).then(value => {
  console.log(2)
  console.log('resolve', value)
})
```

用目前的手写代码运行的时候会报错，无法链式调用。

```js
}).then(value => {
  ^

TypeError: Cannot read property 'then' of undefined
```



### 6. then 方法链式调用识别 Promise 是否返回自己

> 如果 then 方法返回的是自己的 Promise 对象，则会发生循环调用，这个时候程序会报错

例如下面这种情况

```js
// test.js

const promise = new Promise((resolve, reject) => {
	resolve(100)
})
const p1 = promise.then(value => {
  console.log(value)
  return p1
})
```

使用原生 Promise 执行这个代码，会报类型错误

```js
100
Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>
```

我们在 MyPromise 实现一下

```js
// MyPromise.js

class MyPromise {
  ......
  then(onFulfilled, onRejected) {
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED){
        const x = onFul
      }
    })
  }
}
```

