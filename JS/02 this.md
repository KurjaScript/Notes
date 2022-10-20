#### 1. this指向问题的由来

首先看以下例子

```js
let obj = {
    foo: function(){
        console.log(this.bar)
    },
    bar: 1
}

let foo = obj.foo;
let bar = 2

obj.foo() //1
foo() //2
```

上面的这块代码，虽然`obj.foo`和`foo`指向同一个函数，但是执行结果却不一样，其中差异的原因就在于函数体内部使用了this关键字。**而this指的是函数运行时所在环境**，例如，对于`obj.foo()`来说，`foo`运行在`obj`环境，所以`this`指向`obj`；对于`foo()`,`foo`运行在全局环境，所以`this`指向全局环境。

但是函数运行环境是怎样决定的？接下来要做的就是搞懂这个问题。

#### 2. 内存的数据结构

JavaScript语言之所以有`this`的设计，跟内存里面的数据结构有关系。

```js
let obj = {foo: 5}
```

上面的代码将一个对象赋值给变量`obj`。JavaScript引擎会先在内存里面生成一个对象`{foo: 5}`, 然后把这个对象的内存地址赋值给变量`obj`。

也就是说，**变量obj是一个地址**(reference)。后面如果要读取`obj.foo`，引擎先从obj拿到内存地址，然后再从改地址读取原始的对象，返回它的`foo`属性。

![img](https://www.wangbase.com/blogimg/asset/201806/bg2018061802.png)

```js
{
  foo: {
    [[value]]: 5
    [[writable]]: true
    [[enumerable]]: true
    [[configurable]]: true
  }
}
```

注意，`foo`属性的值保存在属性描述的 `value`属性里面。

#### 3. 函数

this问题的来由就在于，对象属性的值是一个函数。这时，引擎会将函数单独保存在内存中，然后再将函数的地址赋值给`foo`属性的`value`属性。

![img](https://www.wangbase.com/blogimg/asset/201806/bg2018061803.png)

由于函数是一个单独的值，所以它可以在不同的环境(上下文)执行

```js
let f = function(){};
let obj = {f: f};

//单独执行
f()

//obj环境执行
obj.f()
```

#### 4. 环境变量

JavaScript允许在函数体内部，引用当前环境的其他变量。

```js
let f = function() {
	console.log(x);
}
```

上面代码中，函数里面使用了变量`x`，该变量由运行环境提供。

现在问题就来了，由于函数可以在不同的运行环境执行，所以需要一种机制，能够在函数内部获得当前运行环境(context)。所以，this就出现了，**this的设计目的就是在函数体内部，指代函数当前的运行环境。**

```js
let f = function() {
	console.log(this.x)
}
```

上面代码中，函数里面使用了变量x。该变量由运行环境提供。

```js
let f = function () {
    console.log(this.x)
}

let x = 1;
let obj = {
    f: f,
    x: 2,
};

// 单独执行
f() // 1

// obj环境执行
obj.f() // 2
```

上面代码中，函数`f`在全局环境执行，`this.x`指向全局环境`x`

![img](https://www.wangbase.com/blogimg/asset/201806/bg2018061804.png)



在`obj`环境执行，`this.x`指向`obj.x`。

![img](https://www.wangbase.com/blogimg/asset/201806/bg2018061805.png)

回到开头， `obj.foo()`是通过`obj`找到`foo`，所以就是在`obj`环境执行。一旦`let foo = obj.foo`, 变量`foo`就直接指向函数本身，所以`foo()`就变成在全局环境执行。





#### 5. this指向大致分以下四种情况

- 当函数作为一个函数调用(function)，直接被调用；
- 当函数作为一个方法被调用；
- 当函数作为一个构造函数(constructor)，被实例化；
- 当函数通过apply()、call()方法

##### 1).   函数作为函数被调用

当函数作为普通函数被调用时，也分为两种情况

- 在非严格模式下，this指向**window**
- 在严格模式下，this指向**undefined**

##### 2).  函数作为方法被调用

当函数作为一个**对象**的某个属性时，我们更习惯称呼这个函数为方法。

**当函数作为方法被调用时，this指向方法的拥有者**

##### 3). 函数作为构造函数使用

一个构造函数在new的过程主要发生以下几件事：

- 创建一个空对象；
- 该空对象作为this参数传递给构造函数，从而称为构造函数的上下文；
- 新构造的对象作为new运算符的返回值返回；
- 当构造函数本身返回的非对象时，this走的还是正常初始化流程；
- **当构造函数本身返回的为对象时，会忽略掉初始化的流程 ，直接将返回值作为new的结果进行返回**

##### 4）通过call和apply显示修改 this

- call在修改this同时
- apply
- call()和apply()的区别在于，如果函数需要再接收其他的参数，他们在获取形参列表这一块会有不同，

