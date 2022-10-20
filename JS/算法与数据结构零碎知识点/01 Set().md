NaN 和 undefined 都可以被存储在 Set 中，NAN 之间被视为相同的值。

### 实例属性

`Set.prototype.size` 返回 Set 对象中的值的个数

### 实例方法

- `Set.prototype.add(value)` 

- `Set.prototype.clear()`
- `Set.prototype.delete(value)`
- `Set.prototype.entries()` ：返回一个迭代器对象，该对象包含 Set 对象中的按插入顺序的所有元素的值的[value, value]数组。**为了使这个方法和 Map 对象保持相似，每个值的键和值相等。**
- `Set.prototype.forEach(callbackFn[, thisArg])` ：按照插入顺序，为 Set 对象中的每一个值调用一次 callBackFn。如果提供了 thisArg 参数，回调中的 this 会是这个参数。
- `Set.prototype.has(value)` 
- `Set.prototype.keys()` ：和 value() 方法相同。
- `Set.prototype.values()` ：返回一个新的迭代器对象，该对象包含 Set 对象中的按插入顺序排列的所有元素的值。
- `Set.prototype.[@@iterator]()`：返回一个新的迭代器对象，该对象包含 Set 对象中的按插入顺序排列的所有元素的值。