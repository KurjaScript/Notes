关于JS中**call()**、**apply()**、**bind()**的用法

这其实是很简单的东西，认真捋一遍就能从一脸懵到完全理解！

先举个例子：

**例1**

```js
let name = '云柱', age = 27;
let obj = {
    name: '火柱',
    objAge: this.age,
    myFun: function(){
        console.log(this.name + "年龄" + this.age )
    } 
}
```

```js
console.log(obj.objAge); //27
console.log(obj.myFun()); //火柱年龄undefined
```

**例2**

```js
let fav = '云柱'
function shows(){
	console.log(this.fav)
}
```

```js
console.log(show()); //云柱
```

比较一下二者this 的差别，第一个打印里面的this指向obj，第二个全局声明的shows()函数this是window；

#### 1. call()、apply()、bind()都是用来重定义this这个对象的！

如：

```js
let name = '火柱', age = 27;
let obj = {
	name: '云柱',
	objAge: this.age,
	myFun: function(){
		console.log(this.name + '年龄' + this.age)
	}
}
let mn = {
	name: '吗哪',
    age: 40
}
```

```js
console.log(obj.myFun.call(mn)); //吗哪年龄40
console.log(obj.myFun.apply(mn)); //吗哪年龄40
console.log(obj.myFun.bind(mn))(); //吗哪年龄40
```

以上除了bind方法后面多了一个()。结果返回都一致。

由此可知，**bind返回的是一个新的函数**，你必须调用它才会执行。

#### 2. 对比call、bind、apply的传参情况

```js
let name = 'kurja', age = 26;
let obj = {
    name: '火柱',
    objAge: this.age,
    myFun: function(fm, t){
        console.log(this.name + "年龄" + this.age, "来自" + fm + "去往" + t);
    }
}
let sophia = {
    name: '云柱',
    age: 27,
}
```

```js
console.log(obj.myFun.call(sophia, '昆明','南京'));// 云柱年龄27 来自昆明去往南京
console.log(obj.myFun.apply(sophia, ['昆明','南京']));// 云柱年龄27 来自昆明去往南京
console.log(obj.myFun.bind(sophia, '昆明','南京')());// 云柱年龄27 来自昆明去往南京
console.log(obj.myFun.bind(sophia, ['昆明','南京'])());// 云柱年龄27 来自昆明,南京去往 undefined
```

微妙的差距！

从上面四个结果不难看出：

- call、bind、apply这三个函数的**第一个参数都是this的指向对象**，第二个参数的差别就来了；
- **call的参数是直接放进去的**，第二第三第n个参数全都是用逗号分隔开，直接放到指向对象后面（这样比较混乱）**obj.myFun.call(mn, '昆明', '南京'，... ,'string')**;
- **apply的所有参数都必须放在一个数组里面传进去**，**obj.myFun.apply(mn,['云南', '昆明', ..., 'string'])**;
- **bind**除了**返回是函数**以外，**它的参数和call一样**；
- 当然，三者的参数不限定是string类型，允许各种类型，包括函数、object等。

