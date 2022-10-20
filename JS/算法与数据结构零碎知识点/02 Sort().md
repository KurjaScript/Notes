### 语法

`arr.sort([compareFunction])`

如果没有指明 compareFunction，那么元素会按照转换为的字符串的诸个字符的 Unicode 位点进行排序。

如果指明了 comparentFunction，那么数组会按照调用该函数的返回值排序。即 a 和 b 是两个将要被比较的元素：

- 如果 `comparentFunction(a, b)` 小于 0 ，那么 a 会被排列到 b 之前；
- 如果 `comparentFunction(a, b)` 等于 0 ，a 和 b 的相对位置不变。
- 如果 `comparentFunction(a, b)` 大于 0 ，b 会排列到 a 之前。 