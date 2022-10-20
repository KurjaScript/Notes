### 字符串实例的方法

#### 1. `String.prototype.repeat()`

`repeat()` 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。

**语法**：`str.repeat(count)`

#### 2. `String.prototype.split()`

`split()` 使用指定的分隔符字符串将一个 String 对象分割成子字符串**数组**，以指定的分割字串来决定每个拆分的位置。

#### 3. `String.prototype.replace()`

`repalce()` 方法返回一个由替换值 (repalcement) 替换部分或所有**模式** (pattern) 匹配项后的新字符串。

模式可以是一个字符串或者一个[正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。**如果`pattern`是字符串，则仅替换第一个匹配项。**

##### 语法 

`str.replace(regexp|substr, newSubStr|function)`

##### 参数

- `regexp`(pattern)：一个 `RegExp` 对象或者其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉。
- `substr`(pattern)：一个将被 `newSubStr` 替换的字符串。被其视为一整个字符串，而不是一个正则表达式。仅第一个匹配项会被替换。
- `newSubStr`(replacement)：用于替换掉第一个参数在原字符串中的匹配部分的字符串。该字符串中可以内插一些特殊的变量名。
- `function`(replacement)：一个用来创建子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果。

##### 返回值

一个部分或全部匹配由替代模式所取代的新的**字符串**。

