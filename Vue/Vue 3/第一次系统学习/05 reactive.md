reactive 是响应性基础 API，返回对象的响应式副本

```js
const obj = reactive({count: 0})
```

响应式转换是“深层”的——它影响所有嵌套 property。在基于 [ES2015 Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 的实现中，返回的 proxy 是**不**等于原始对象的。建议只使用响应式 proxy，避免依赖原始对象。

#### 类型声明

```js
function reactive<T extends object>(target: T):UnWrapNestedRefs<T>
```

reactive 将**解包**所有深层的 refs，同时维持 ref 的响应特性。

**注：解包的含义就是将组合在一起的数据进行拆分**。

函数解包分为两部分：**参数解包**、**返回值解包**。

对于参数解包，要求传入的数据的个数或字典的键的个数和函数的参数的个数一致。

对于返回值解包，等号左边的对象个数需要和函数返回值个数一致。

```js
const count = ref(1)
const obj = reactive({count})

// ref 会被解包
console.log(obj.count === object.value) // true

// 它会更新 `obj.count`
count.value++
console.log(count.value) // 2
console.log(obj.count) // 2

// 它也会更新 `count` ref
obj.count++
console.log(obj.count) // 3
console.log(count.value) // 3
```

当将 ref 分配给 reactive property 时，ref 将被自动解包

```js
const count = ref(1)
const obj = reactive({})

obj.count = count

console.log(obj.count) // 1
console.log(obj.count === count.value) // true
```

