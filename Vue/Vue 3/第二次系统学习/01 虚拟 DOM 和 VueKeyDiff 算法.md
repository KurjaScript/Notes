### 为什么需要虚拟 DOM

```js
let div = document.createElement('div')
let str = ''
for (const key in div) {
	str += key + ' '
}
console.log(str)
```

执行以上代码，会发现一个 dom 上的属性非常多，所以直接操作 dom 非常浪费性能。

解决方案是，**用 js 的计算性能来换取操作 dom 所消耗的性能**，既然我们逃不掉操作 dom 这道坎，但是我们可以尽量减少操作 dom。**操作 js 是非常快的**。

### Diff 算法

```html
<template>
	<div>
    <div :key="index" v-for="(item,index) in Arr">
      {{item}}
    </div>
  </div>
</template>

<script setup lang="ts">
	const Arr: Array<string> = ['A', 'B', 'C', 'D']
  Arr.splice(2, 0, 'DDDD')
</script>

<style></style>
```

![](/Users/Kurja/Desktop/Typora/Vue/Vue%203/%E7%AC%AC%E4%BA%8C%E6%AC%A1%E7%B3%BB%E7%BB%9F%E5%AD%A6%E4%B9%A0/e6c9d24egy1h45a0qsg8lj213i0muacp.jpg)

还得看源码啊