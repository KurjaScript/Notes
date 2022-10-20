computed 的另一种写法

```html
<template>
	<div>
    <input v-model="firstName" type="text">
    <input v-model="firstName" type="text">
    <div>
      {{name}}
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
 let firstName = ref('')
 let lastName = ref('')
 const name = computed({
   get() {
     return firstName.value + lastName.value
   }
   set() {
     firstName.value + lastName.value
   }
 })
</script>
```

 