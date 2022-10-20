`hasOwnProperty` 是 `Object.prototype` 的一个方法。

它能判断一个对象是否包含自定义属性而不是原型链上的属性。

```js
Object.prototype.chang = 1; 
var foo = {goo: undefined};   //对象
foo.chang;                    // 1
'bar' in foo;                 // true
foo.hasOwnProperty('chang');  // false  chang是原型上的 
foo.hasOwnProperty('goo');    // true
//在js中只有hasOwnProperty方法可以用来排除原型链上的属性，而不是定义在对象自身上的属性。
```

