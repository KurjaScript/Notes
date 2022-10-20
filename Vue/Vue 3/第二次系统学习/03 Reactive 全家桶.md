先看一段代码

```html
<script setup lang="ts">
import {reactive} from 'vue'
let message = reactive<number[]>([])
setTimeout(() => {
  let arr = [1, 2, 3, 4]
  message = arr // 这种直接赋值的方式会破坏 message 的响应式
	console.log(message) // 输出为空，并没有更新
}, 1000)
</script>
```

可以通过 push，但如果是想修改里面值，可以通过以下方式

```html
<script setup lang="ts">
import {reactive} from 'vue'
type O = {
	list: number[]
}
let message = reactive<O>({
    list: []
  })
setTimeout(() => {
  message.list = [1, 2, 3, 4, 5]
}, 1000)
</script>
```

readonly: 拷贝一份 proxy 对象将其设置为只读——不可更改

```
import {reactive, readonly} from 'vue'
const person = reactive({count:only})
const copy = readonly(person)

copy.count++
```

shallowReactive

和`reactive`一样，该方法只能把对象或数组包装为响应式对象

```html
<template>
    <div class="about">
        {{ test }}
        <button @click="change">change</button>
    </div>
</template>
<script setup>
const test = shallowReactive({
    a: {
        b: "b",
    },
});

function change() {
    test.a.b = "new";
    console.log(test);
}
</script>
```

通过 change 方法改变了 test 的深层属性，这时会发现控制台中打印的数据是改变后的，而浏览器中视图中仍热是原来的对象，而如果把`change`改成修改`test`的第一层属性，则会触发视图的更新

```tsx
function change() {
    test.a = "new";
    console.log(test);
}
```

