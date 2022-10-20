### watch

watch是一个函数,第一个参数是侦听的对象，第二个参数是一个关于新旧值的函数，第三个参数是{deep: true, immediate: true}。

如果想一开始就在回调函数中做一些动作，那就在第三个参数中使用 `immediate: true`

```
import { ref, watch } from 'vue'
let message = ref({
	nav: {
		bar: {
			name: 'Kurja'
		} 
	}
})
watch(message, (newVal, oldVal) => {
	console.log('新的', newVal)
	console.log('旧的', oldVal)
}, {
	deep: true,
	immediate: true
})
```

如果是用 reactive，即使不写第三个参数，也是可以侦听到对象的深层次的属性。

如果只想侦听对象中的某一个属性值，可以把第一个参数传入一个返回改属性的函数。`watch(() => message.name,(newVal, oldVal) => {...})`

### watchEffect

#### flush

首先看一段代码

```tsx
const childOne = ref(null)
watchEffect(() => {
  console.log('打印', childOne.value)
}, {
  flush: 'post'
})
```

![](/Users/Kurja/Desktop/Typora/Vue/Vue%203/%E7%AC%AC%E4%BA%8C%E6%AC%A1%E7%B3%BB%E7%BB%9F%E5%AD%A6%E4%B9%A0/e6c9d24egy1h46ji24aghj204g01amwx.jpg)

如果不加 flush 属性，就会打印模版还会挂载的值，加了 flush 一定是挂载完毕才会打印。

#### stop

在写 vue2.0 时，有时候想要停止监听却无计可施，只能眼巴巴等到组件被销毁才能停止。vue3 提供了 stop 函数来停止监听。

停止监听，比较简单的一个方式就是再调一次 watch() 函数的返回值。如下：

```
const stop = watchEffect(count, (val,oldVal) => {
	if(val !== oldVal) {
		data.value.pageNum = val
		// 当页码不一样调取接口
	}
})
// 然后在某个函数中调用 stop() 函数，监听就停止了
```

### watch 和 watchEffect 的区别

1. watch 时惰性执行的，也就是只有监听值发生变化的时候才会执行，但是 watchEffect 不同，每次代码加载 watchEffect 都会执行。（忽略 warch 第三个参数的配置，如果修改配置项也可以实现立即执行）；

2. watch 需要传递监听对象， watchEffect 不需要；

3. watch 只能监听响应式数据：ref 定义的属性和 reactive 定义的对象，如果直接监听 reactive 定义对象中的属性是不允许的，除非使用函数转换一下；

4. watchEffect 如果监听 reactive 定义的对象是不起作用的，只能监听对象中的属性。

   ```tsx
   let count = ref(0)
   let countObj = reactive({ count: 0 })
   
   // 惰性，首次加载不执行
   watch(count, (newVal, oldVal) => { console.log(newVal, oldVal)})
   // watch 不能直接监听 reactive 里面的属性，只能监听 ref、reactive 对象、function、array，如果想监听 reactive 里某个属性，需要转换成函数
   watch(() => countObj.count, (newVal, oldVal) => { console.log(oldVal, newVal)}, {})
   watch(countObj,(newVal, oldVal) => {
     console.log(newVal, oldVal)
   })
   // 监听多个值，前面是监听数据的数组，后面的参数是两个数组，前面数组是变化后监听对象值的数组，后面是变化前监听对象值的数组
   watch([countObj, count], ([oneNewName,twoNewName], [oneOldName, twoOldName]) => {
     console.log(oneNewName, oneOldName, twoNewName, twoOldName)
   })
   // watchEffect 和 watch 不一样，1. 会立即执行，只要定义了就会执行；2. 他只能监听某个值，监听对象不管用； 3. 不需要传参，会自动管制代码中的变量； 4. 没法获取 newVal 和 oldVal
   const watchEf = watchEffect(() => {
     console.log(countObj.count)
   })
   ```

   