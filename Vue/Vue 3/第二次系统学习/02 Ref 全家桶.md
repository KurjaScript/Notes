有实力看看源码吧

Ref：`let message: Ref<string> = ref('Kurja')`

isRef： `console.log(isRef(message))`,判断是否是 ref 数据

shallowRef：`let message = shallowRef()`，创建一个跟踪自身 .value 变化的 ref，但不会使其值也变为响应式。

shallowRef 和 triggerRef 可以配合使用，triggerRef 可以强制更新 dom, 和 Vue2 中的 $set 很像

```tsx
import {shallowRef, triggerRef}
let message = shallowRef({
  name: 'Kurja',
})
const changeMsg = () => {
  message.value.name = '云柱'
  triggerRef(message)
}
```

toRef: 

- 为响应式对象上的某个属性创建一个 ref 对象，二者内部操作的是同一个数据值，更新时二者是同步的。
- 区别 ref：拷贝了一份新的数据值单独操作，更新时互相不影响；
- 应用：**当要将某个 prop 的 ref 传递给复合函数时，toRef 很有用**。父子组件传值

customRef：

- 创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制
- 需求：使用 customRef 实现 防抖

```html
<template>
  <h2>App</h2>
  <input v-model="keyword" placeholder="搜索关键字" />
  <p>{{keyword}}</p>
</template>
<script lang="ts">
import { ref, customRef} from 'vue'
export default {
  setup () {
    const keyword = useDebounceRef('', 500)
    console.log(keyword)
    return {
      keyword
    }
  },
}
  
/* 实现函数防抖的自定义 ref */
function useDebounceRef<T>(value: T, delay = 200) {
  let timeout: number
  return customRef((track, trigger) => {
    return {
      get() {
        // 告诉 Vue 追踪数据
        track()
        return value
      },
      set(newValue: T) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          // 告诉 Vue 去触发界面更新
          trigger()
        }, delay)
      }
    }
  })
}
</script>
```

