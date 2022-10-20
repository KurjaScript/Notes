### 1. computed

#### 1.1 定义

是一个计算属性，类似于过滤器，对绑定到view的数据进行处理。

computed中的属性会挂载到实例上，函数中的this是当前实例，它储存的值是对应方法返回的结果——getter函数处理的结果。

#### 1.2 computed全写

计算属性默认只有getter，不过在需要时也可以提供一个setter：

##### 1.2.1 简写

```js
computed: {
    //GETTER函数
    reverseComputed() {
        return this.text.split('').reverse().join('')
    }
}
```

##### 1.2.2 全写

```js
computed: {
    reverseComputed: {
        get() {
            //=> GETTER: 只要获取这个属性值就会触发GET函数执行
            return this.text.split('').reverse().join('')
        },
        set(value) {
            //=> SETTER: 给属性设置值的时候会触发SET函数，VALUE是给属性设置的值
            console.log('OK', value);
        }
    }
}
```

##### 1.2.3 get和set用法

- getter函数——只要获取这个属性值就会触发GET函数执行；
- setter函数——给属性设置值的时候会触发SET函数

```js
data: {
    firstName: '云柱',
    lastName: '火柱'
},
computed: {
    fullName: {
        //回调函数，当需要读取当前值是执行，根据相关数据计算并返回当前属性的值
        get(){
            return this.firstName + ' ' + 'this.lastName'
        },
        //监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据
        set(val){
            //val就是fullName的最新属性值
            console.log(val)
            const names = val.split(' ');
            console.log(names)
            this.firstName = names[0];
            this.lastName = names.[1];
        }
    }
}
```

#### 1.3 应用场景

- 当小胡子中用到的是复杂的表达式的时候，我们一般用计算属性先处理一下，把计算属性的返回结果放在小胡子中。
- 有明显的依赖关系的时候，建议用计算属性。

#### 1.4 注意

- 计算属性中必须关联一个响应式的数据，否则GETTER函数只执行一次。
- 异步的时候，尽量不要选用computed。



### 2. watch

#### 2.1 定义

watch是一个观察动作，监听响应式数据的改变。

#### 2.2 作用

当需要在数据变化时执行异步或开销较大的操作时，应用监听器。

#### 2.3 监听简单数据类型

```js
data: {
    firstName: '云柱',
    lastName: '火柱'，
    fullName: '云柱 火柱'
},
watch: {
    firstName: function(val){
        this.fullName = val + ' ' + this.lastName
    },
    lastName: function(val){
    	this.fullName = this.firstName + ' ' + val   
    }
}
```

上面是监听firstName和lastName的变化，但仅限简单数据类型。

#### 2.4 监听复杂数据类型

监听复杂数据类型需用**深度监听**

```js
data(){
    return {
        'first': {
            second: 0
        }
    }
},
watch: {
    secondChange: {
        handler(oldVal, newVal){
            console.log(oldVal)
            console.log(newVal)
        },
        deep: true
    }
}
```

`console.log`打印结果显示，`oldVal`和`newVal`的值是一样的，所以深度监听虽然可以监听到对象的变化，但无法监听到具体对象里面那个属性的变化。

`oldVal`和`newVal`值一样的原因是它们索引同一个对象/数组。`Vue`不会保留修改之前值的副本。

**vm.$watch的深度监听**

![image-20220218023135191](C:\Users\Kurja\AppData\Roaming\Typora\typora-user-images\image-20220218023135191.png)

**深度监听对应的函数名必须是`handler`**，否则无效果，因为`watcher`里面对应的是对`handler`的调用。

#### 2.5 监听对象单个属性

方法一：可以直接用对象属性的方法拿到属性

```js
data(){
    return {
        'first': {
            second: 0
        }
    }
},
watch: {
    first.second: function(newVal, oldVal){
        console.log(newVal, oldVal)
    }
},
```

方法二： `watch`如果想要监听对象的单个属性的变化，**必须用computed作为中间件转化**，因为`computed`可以取到对应的属性值。

```js
data: {
    return {
        'first': {
            second: 0
        }
    }
},
computed: {
    secondChange(){
        return this.first.second
    }
},
watch: {
    secondChange(){
        console.log('second属性变化了')
    }
},

```

### 3. computed 和 watch 的区别

#### 3.1 computed 特性

- 是计算值；

- 应用：就是简化`template`里面`{{}}`计算和处理`props`或`$emit`的传值；

- 具有缓存性，基于它们的响应式依赖进行缓存，**只要依赖不发生变化，这个函数就不会执行。**依赖就是这个函数中使用的this上的属性(**必须是同步使用**)。页面重新渲染值不变化，计算属性会立即返回之前的计算结果，而不必再次执行函数。

  ```js
  data: {
      name: '云柱',
      age: 27
  },
  computed: {
      personType(){
          console.log(this.name)
          return this.age >= 18 ? "成年人" : "未成年人" 
      }
  }，
  ```

  只要name和age没有发生改变，计算属性就会立即返回之前的计算结果，把计算属性的返回结果放在小胡子中。

#### 3.2 watch 特性

- watch中监听的响应式数据必须在data中初始化。
- 应用：监听`props`，`$emit`或本组件的值执行异步操作；而computed的getter不支持异步获取数据。
- 无缓存性，页面重新渲染时值不变化也会执行。

### 4. props 传值

#### 4.1 传输简单数据类型常见错误

```js
props: ['listShop'],
data(){
    return{}
},
created(){
    this.listShop = 30
}
```

传入的值想作为全局变量来使用，直接使用会报错

![image-20220218033049619](C:\Users\Kurja\AppData\Roaming\Typora\typora-user-images\image-20220218033049619.png)

这个错误说的是，**避免直接修改父组件传入的值，因为会改变父组件的值**。

#### 4.2 解决方法

简单数据类型的解决方案：

可以在data中重新定义一个变量，改变指向，但是也只是针对简单数据类型，因为**复杂数据类型栈存储的是指针**（待以后深入理解原因）

```js
props: ['listShop'],
data(){
    return {
        listShopChild: this.listShop
    }
},
created(){
    this.listShopChild = 30
}
```

这样就可以愉快地更改传入的简单数据类型的数据啦！不会有任何报错，也不影响父组件！

#### 4.3 传输复杂数据类型常见问题

复杂数据类型在栈中存储的是指针，所以赋值给新的变量也会改变原始的变量值

#### 4.4 解决方法一

##### 4.4.1手动深度克隆一个复杂的数据出来，循环或者递归都行

**数组深度克隆**

```js
let x = [1, 2, 3];
let y = [];
for (let i = 0; i < x.length; i++){
    y[i] = x[i]
}
console.log(y); //[1,2,3]
y.push(4);
console.log(y); //[1,2,3,4]
console.log(x); //[1,2,3]
```

**对象深度克隆**

```js
let x = {
    a: 1,
    b: 2
}
let y = {}
for(let i in x){
    y[i] = x[i]
}
console.log(y); //{a: 1,b: 2}
y.c = 3;
console.log(y); //{a:1, b: 2, c: 3}
```

**函数深度克隆**

```js
let x = function(){
    console.log(1)
}
let y = x;
y = function(){
    console.log(2)
}
x(); //1
y(); //2
```

为什么函数可以直接赋值克隆？

由于函数对象克隆之后的对象会单独复制一次并储存实际数据，因此并不影响克隆之前的对象。所以采用简单的复制`"="`即可完成克隆

##### 4.4.2 Object.assign

只会对一级属性复制，比浅拷贝多深拷贝了一层而已，所以还是无法达到深度克隆的目的

##### 4.4.3强大的JSON.stringfy 和 JSON.parse

```js
const obj1 = JSON.parse(JSON.stringfy(obj))
```

这是ES5新出来的API，**先将对象转化为字符串，就是简单数据类型赋值，再用JSON.parse转化**。

#### 4.5 解决方法二

直接用`computed`改变

```js
computed: {
    listShopChild(){
        return this.listShop
    }
}
```

此时用computed时，如果是数组this.$set(arr, 1,true)对应值也不更新，这很坑

如果传入的值只在data定义，并未在methods或生命钩子更改，直接改变也会报错，所以还是可以先用局部变量接收，再修复，这个坑比较多。

