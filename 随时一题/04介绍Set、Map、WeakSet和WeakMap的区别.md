Set和Map主要的应用场景在于**数据重组**和**数据储存**

Set是一种叫做**集合的**数据结构，Map是一种叫做**字典**的数据结构

#### 1. 集合（Set）

Set本身是一种构造函数，用来生成Set数据结构，类似于数组，但成员是唯一且无序的，没有重复的值。

```js
new Set([iterable])
```

举个例子：

```js
const s = new Set()
[1, 2, 3, 4, 3, 2, 1].forEach(x => s.add(x))
for (let i of s){
    console.log(i)  //1 2 3 4 
}
// 数组去重
let arr = [1, 2, 3, 2, 1, 1]
[...new Set(arr)] //[1, 2, 3]
```

- Set实例属性

  - constructor: 构造函数

  - size: 元素数量

    ```js
    let set = new Set([1, 2, 3, 2, 1])
    console.log(set.length) // undefined
    console.log(set.size)   // 3
    ```

- Set实例方法

  - 操作方法

    - add(value): 新增，相当于array里的push；

    - delete(value): 若存在就删除集合中的value；

    - has(value): 判断集合中是否存在value

    - clear(): 清空集合

      ```js
      let set = new Set()
      set.add(1).add(2).add(1)
      
      set.has(1) //true
      set.has(3) //false
      set.delete(1)
      set.has(1) //false
      ```

      `Array.from`方法可以**将Set结构转化为数组**

      ```js
      const items = new Set([1, 2, 3, 2])
      const array = Array.from(items)
      console.log(array) //[1, 2, 3]
      ```

      `...`运算扩展符**将Set结构转化为数组更直观简洁**

      ```js
      const items = new Set([1, 2, 3, 2])
      const array = [...items]
      console.log(array) //[1, 2, 3]
      ```

      

  - 遍历方法(遍历顺序为插入顺序)

    - keys(): 返回一个包含集合中所有键的迭代器；

    - values(): 返回一个包含集合所有值的迭代器；

    - entries(): 返回一个包含Set对象中所有元素的键值对迭代器；

    - forEach(callbackFn, thisArg): 用于对集合成员执行callbackFn操作，如果提供了thisArg参数，回调中的this会是这个参数，没有返回值。

      ```js
      let set = new Set([1, 2, 3])
      console.log(set.keys()) //SetIterator {1, 2, 3}
      console.log(set.values()) //SetIterator {1, 2, 3}
      console.log(set.entries()) //SetIterator {1 => 1, 2 => 2, 3 => 3}
      
      for (let item of set.keys()){
          console.log(item); //1 2 3
      }
      
      for (let item of set.entries()){
          console.log(item); //[1, 1] [2, 2] [3, 3]
      }
      
      set.forEach((value, key) => {
          console.log(key + ':' + value); //1:1  2:2  3:3
      })
      
      console.log([...set]) // [1, 2, 3]
      ```

      Set可默认遍历，默认迭代器生成函数values()方法

      ```js
      Set.prototype[Symbol.iterator] === Set.prototype.values //true
      ```

      所以，Set可以使用map、filter方法

      ```js
      let set = new Set([1, 2, 3])
      set = new Set([...set].map(item => item * 2))
      console.log([...set]) //[2, 4, 6]
      
      set = new Set([...set].filter(item => (item >= 4))
      console.log([...set]) // [4, 6]
      ```

      因此，Set很容易实现交集(Intersect)、并集(Union)、差集(Difference)

      ```js
      let set1 = new Set([1, 2, 3])
      let set2 = new Set([4, 3, 2])
      
      let intersect = new Set([...set1].filter(value => set2.has(value)))
      let union = new Set([...set1, ...set2])
      let difference = new Set([...set1].filter(value => !set2.has(value)))
      ```


#### 2.WeakSet

WeakSet对象允许你将**弱引用对象**储存在一个集合中

**弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。**

##### WeakSet与Set的区别：

- WeakSet只能储存对象引用，不能存放值，而Set对象都可以
- WeakSet对象中储存的对象值都是弱引用，**即垃圾回收机制不考虑WeakSet对象的应用，如果没有其他变量或属性引用这个对象值，则这个对象将会被垃圾回收掉**(不考虑该对象还存于WeakSet中)，所以，WeakSet对象里有多少个成员元素，取决于垃圾回收机制有没有运行，运行前后成员个数可能不一致，遍历结束之后，有的成员可能取不到了(被垃圾回收了)，WeakSet对象是无法被遍历的(ES6规定WeakSet不可遍历)，也没有办法拿到它包含的所有元素。

属性：

- constructor: 构造函数，任何一个具有Iterable接口的对象，都可以作参数

  ```js
  const arr = [[1, 2], [3, 4]]
  const weakset = new WeakSet(arr)
  console.log(weakset)
  ```

  ![image-20220126141043762](C:\Users\GunKing\AppData\Roaming\Typora\typora-user-images\image-20220126141043762.png)

然而我在浏览器控制台的调试结果是这样的，没有顺序打印，何故？然而，用其他数据测试则是正常

![image-20220126141007136](C:\Users\GunKing\AppData\Roaming\Typora\typora-user-images\image-20220126141007136.png)

![image-20220126141114833](C:\Users\GunKing\AppData\Roaming\Typora\typora-user-images\image-20220126141114833.png)

方法：

- add(value): 在WeakSet对象中添加一个元素value；

- has(value): 判断WeakSet对象中是否包含value；

- delete(value): 删除元素value；

- clear(): 清空所有元素，**注意该方法已废除**

  ```js
  let ws = new WeakSet()
  let obj = {}
  let foo = {}
  
  ws.add(window)
  ws.add(obj)
  
  ws.has(window) //true
  ws.has(foo) //false
  
  ws.delete(window) //true
  ws.has(window) //false
  ```

#### 3. 字典(Map)

##### 集合与字典的异同：

- 共同点：集合、字典可以储存不重复的值 ；
- 不同点：集合是以[value, value]的形式储存元素，字典是以[key, value]的形式储存。

```js
const m = new Map()
const o = {p: 'haha'}
m.set(o, 'content')
m.get(o) //content
m.has(o) //true
m.delete(o)
m.has(o) //true
```

**任何具有Iterator接口、且每个成员都是一个双元素的数组的数据结构都可以被当作Map构造函数的参数**，例如：

```js
const set = new Set([
	['foo', 1],
    ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') //3
```

如果读取一个未知的键，则返回undefined

```js
new Map().get('askbdk') // undefined
```

注意，只有对同一对象的引用，Map结构才将其视为同一个键。这一点要非常小心。

```js
const map = new Map();

map.set(['a'],555);
map.get(['a']) //undefined
```

上面代码的`set`和`get`方法，表面上针对同一个键，但实际上这是两个值，内存地址是不一样的，因此`get`方法无法读取该键，返回`undefined`。

由此可知，Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键，这就解决了**同名属性碰撞**(clash)的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。

##### Map的属性及方法：

属性：

- constructor：构造函数

- size：返回字典中所包含的元素个数

  ```js
  const map = new Map([
      ['name', 'An']
      ['des', 'JS']
  ])
  map.size // 2
  ```

操作方法：

- set(key, value): 向字典中添加新元素；
- get(key): 通过键查找特定的数值并返回；
- has(key): 判断字典中是否存在key；
- delete(key): 通过键key从字典中移除对应的数据；
- clear(): 将这个字典中的所有元素删除。

遍历方法：

- keys(): 将字典中包含的所有键名以迭代器的形式返回；

- values(): 将字典中包含的所有数值以迭代器的形式返回；

- entries(): 返回所有成员的迭代器；

- forEach(): 遍历字典所有成员

  ```js
  const map = new Map([
  	['name', 'An'],
      ['des', 'JS']
  ]);
  console.log(map.entries())  //MapIterator {"name" => "An", "des" => "JS"}
  console.log(map.keys())  //MaoIterator {"name", "des"}
  ```

Map结构的默认遍历器接口(Symbol.iterator属性)，就是entries方法。

```js
map[Symbol.iterator] === map.entries  //true
```

Map结构转为数组结构，比较快速的方法是使用扩展运算符(`...`)

对于forEach，看一个例子

```js
const reporter = {
    report: function(key, value){
        console.log("Key: %s, Value: %s",key, value);
    }
};

let map = new Map([
    ['name', 'An'],
    ['des', 'JS']
])
map.forEach(function(value, key, map){
    this.report(key, value);
}, reporter);
//Key: name, Value: An
//Key: des, Value: JS
```

在这个例子中，forEach方法的回调函数的this，就指向reporter

##### 与其他数据结构的相互转换

- ###### Map转Array

  ```js
  const map = new Map([[1, 1], [2, 2], [3, 3]])
  console.log([...map]) // [[1, 1], [2, 2], [3, 3]]
  ```

- ###### Array转Map

  ```js
  const map = new Map([[1, 1], [2, 2], [3, 3]])
  console.log(map) //Map {1 => 1, 2 => 2, 3 => 3}
  ```

- ###### Map转Object

  因为Object的键名都为字符串，而Map的键名为对象，所以转换的时候会把非字符串键名转换为字符串的键名。

  ```js
  function mapToObj(map) {
      let obj = Object.create(null)
      for (let [key, value] of map) {
          obj[key] = value
      }
      return obj
  }
  const map = new Map().set('name', 'An').set('des', 'JS')
  mapToObj(map) //{name: "An", des: "JS"}
  ```

- ###### Object转Map

  ```js
  function objToMap(obj){
      let map = new Map()
      for (let key of Object.keys(obj)) {
          map.set(key, obj[key])
      }
      return map
  }
  objToMap({'name': 'An', 'des': 'JS'}) //Map {"name" => "An", "des" => "JS"}
  ```

- ###### Map转JSON

  ```js
  function mapToJson(map){
      return JSON.stringify([...map])
  }
  
  let map = new Map().set('name', 'An').set('des', 'JS')
  mapToJson(map) //[["name","An"], ["des","JS"]]
  ```

- ###### JSON转Map

  ```js
  function jsonToMap(jsonStr){
      return objToMap(JSON.parse(jsonStr)); //先将JSON转化为Object，再转化为Map
  }
  jsonToStrMap('{"name": "An", "des": "JS"}') //Map {"name" => "An", "des" => "JS"}
  ```

#### 4. WeakMap

WeakMap对象是一组键值对的集合，其中的**键是弱引用对象，而值可以是任意**。

**注意，WeakMap弱引用的只是键名，而不是键值。键值依然是正常引用。**

WeakMap中，每个键对自己所引用对象的引用都是弱引用，在没有其他引用和该引用同一对象，这个对象将会被垃圾回收(相应的key则变成无效)，所以，WeakMap的key是不可枚举的。

属性：

- constructor：构造函数

方法：

- has(key): 判断是否有key关联对象；

- get(key): 返回key关联对象(没有则返回undefined)；

- set(key): 设置一组key关联对象；

- delete(key)：移除 key 的关联对象

  ```js
  let myElement = document.getElementById('logo');
  let myWeakmap = new WeakMap();
  
  myWeakmap.set(myElement, {timesClicked: 0});
  
  myElement.addEventListener('click', function() {
    let logoData = myWeakmap.get(myElement);
    logoData.timesClicked++;
  }, false);
  ```

#### 5. 总结

- ##### Set

  - 成员唯一、无序且不重复；
  - [value, value], 键值与键名是一致的(或者说没有键值，没有键名)；
  - 可以遍历，方法有：add、delete、has。

- ##### WeakSet

  - 成员都是对象；
  - 成员都是弱引用，可以被垃圾回收机制回收，**可以用来保存DOM节点，不容易造成内存泄漏**；
  - 不能遍历，方法有：add、delete、has。

- ##### Map

  - 本质上是键值对的集合，类似集合；
  - 可以遍历，方法很多，可以跟各种数据格式转换，很重要。

- ##### WeakMap

  - 只接受对象作为键名(null除外)，不接受其他类型的值作为键名；
  - 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的；
  - 不能遍历，方法有get、set、has、delete。

#### 6. 扩展：Object与Set、Map

- ##### Object与Set

  ```js
  //Object
  const properties1 = {
      'width': 1,
      'height': 1
  }
  console.log(properties1['width']?true: false) //true
  
  //Set
  const properties2 = new Set()
  properties2.add('width')
  properties2.add('height')
  console.log(properties2.has('width')) //true
  ```

- ##### Object与Map

  **JS中的对象(Object)，本质上是键值对的集合(hash结构)**

  ```js
  const data = {};
  const element = document.getElementsByClassName('App');
  
  data[element] = 'metadata';
  console.log(data['[object HTMLCollection]']) //"metadata"
  ```

  但当一个DOM节点作为对象data的键值，对象会 被自动转化为字符串[Object HTMLCollection], 所以说， Object结构提供了**字符串-值**对应，Map提供了**值-值**的对应。