`function*` 这种声明方式(`function`关键字后跟一个星号）会定义一个***生成器函数\* **`(generator function)`，它返回一个  [`Generator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator) 对象。

```js
function* generator(i) {
  yield i;
  yield i + 10;
}

const gen = generator(10);

console.log(gen.next().value);
// 10

console.log(gen.next().value);
// 20
```

### 语法：

```js
function* name([param[, param[, ... param]]]) { statements }
// name——函数名
// param——传递给函数的一个参数名称，一个函数最多可以有255个参数
// statements——普通JS语句
```

### 描述

**生成器函数**在执行时能暂停，后面又能从暂停处继续执行。

调用一个**生成器函数**并不会马上执行它里面的语句，而是返回一个这个生成器的 **迭代器** **（ [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterator) ）对象**。

当这个迭代器的 `next() `方法被首次（后续）调用时，**其内的语句会执行到第一个（后续）出现**[`yield`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield)**的位置为止**，[`yield`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield) 后紧跟迭代器要返回的值。或者如果用的是 [`yield*`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield*)（多了个星号），则表示将执行权移交给另一个生成器函数（当前生成器暂停执行）。

`next()`方法返回一个对象，这个对象包含两个属性：`value` 和 `done`，`value` 属性表示本次 `yield `表达式的返回值，`done` 属性为布尔类型，表示生成器后续是否还有` yield `语句，即生成器函数是否已经执行完毕并返回。

