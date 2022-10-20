Vue 3 获取节点的方式：

```html
<template>
    <div ref="myRef">获取单个 DOM 节点</div>
</template>
<script>
    import { ref, onMounted } from 'vue'
export default {
    setup(){
        const myRef = ref(null)
        onMounted(() => {
            console.dir(myRef.value)
        })
        return {
            myRef
        }
    }
}
</script>
```

