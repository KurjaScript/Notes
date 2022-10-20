### 1. 说一说数组的方法

- `map`：遍历数组，返回回调返回值组成的新数组。

- `forEach`：无法 `break`，可以用 `try/catch` 中 `throw new Error` 来停止。

- `join`：通过指定连接符生成字符串。

- `push / pop`：末尾推入和弹出，改变原数组，`push()` 返回新数组的长度，`pop()` 返回删除的元素。

- `unshift / shift`：`unshift()`

  从从数组头部添加元素，改变原数组，返回新数组长度；`shift()` 方法用于把数组的第一个元素删除，改变原数组，并返回删除项。

- `sort(fn) / reverse`：排序与反转，改变原数组。

- `concat`：连接数组，不影响原数组，浅拷贝。

- `slice(start, end)`：返回截断后的新数组，不改变原数组。

- `splice(start, number, value...)`：返回删除元素组成的数组，value为插入项，改变原数组。

- `indexOf / lastIndexOf(value, formIndex)`：查找数组项，返回对应的下标。

- `reduce / reduceRight(fn(prev, cur), defaultPrev)`：两两执行，`prev` 为上次简化函数的 `return` 值，`cur` 为当前值(从第二项开始)

