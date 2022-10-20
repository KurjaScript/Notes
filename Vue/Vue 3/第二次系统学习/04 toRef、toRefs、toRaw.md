### ref

如果使用 ref 函数将某个对象中的属性变成响应式数据，修改响应式数据是不会影响到原始数据的。

```tsx
import { ref } from 'vue';
export default {
  name: 'App',
  setup() {
    let obj = {name: 'Kurja', age: '26'};
    let newObj = ref(obj.name);
    function change() {
      newObj.value = '云柱';
      console.log(obj, newObj)
    }
    return {
      newObj,
      change
    }
  }
}
```

上述代码，当 change 执行的时候，响应式数据发生改变，而原始数据并不会改变。

**原因在于， ref 本质是拷贝，与原始数据没有引用关系。**

需要注意的是， `ref(obj.name)` 相当于 `ref('Kurja')` 相当于 `reactive({value:'Kurja'})`, 所以修改响应式数据时，是修改 `newObj.value=xxx` 。

### toRef

**而如果使用 toRef 将某个对象中的属性变成响应式数据，修改响应式数据是会影响到原始数据的。**但需要注意的是，如果修改通过 toRef 创建的响应式数据，并不会触发 UI 界面的更新。

**toRef 是对定义的响应式对象的某个属性进行引用，本质是引用，与原始数据有关联。**

```tsx
import { toRef } from 'vue'
export default {
  name: 'App'
  setup() {
    let obj = {name: 'Kurja', age: 26}
    let newObj = toRef(obj, 'name')
    function change() {
      newObj.value = '云柱',
     	console.log(obj, newObj)
    }
    return {
      newObj,
      change
    }
  }
}
```

以上代码，obj 中的 name 和 newObj 都变成了云柱，但是视图显示还是Kurja。

### toRefs

toRefs 是将整个对象转化成响应式数据 toRefs(obj)

```tsx
import { toRefs } from 'vue'
export default {
  let obj = {name: 'Kurja', age: 26}
	let newObj = toRefs(obj)
  setTimeout(() => {
    newObj.name.value = '云柱'
    console.log(obj, newObj)
  }, 2000)
	return {obj, newObj}
}
```

需要注意的是，按照上面这种写法，在模版中使用的时候，需要按照这种方式 `{{newObj.name.value}}`，如果想直接使用 {{name}}，那么在 setup 中 return 的时候需要解构下

```tsx
import { toRefs } from 'vue'
export default {
  let obj = {name: 'Kurja', age: 26}
	let newObj = toRefs(obj)
  setTimeout(() => {
    newObj.name.value = '云柱'
    console.log(obj, newObj)
  }, 2000)
	return {obj, ...newObj}
}
```

这样，在模版中就可以直接通过 {{name}}来获取了。

### toRaw

在`setup`函数中，我们通过`ref`和`reactive`函数创建响应式数据，其特点是，每次修改数据都会更新`UI`界面，这样的问题是非常消耗性能.

可以通过 vue3 提供的 toRaw 方法来获取该数据被 Proxy 包装前的原始数据，然后通过对原始数据进行修改，进而可以修改对应的代理对象内部数据。这是通过原始数据修改改变的，并不会触发 UI 界面更新

```tsx
import {reactive, toRaw} from 'vue'
export default {
  setup() {
    const obj1 = {name: 'Kurja'}
    const user = reactive(obj1)
    const obj2 = toRaw(user)
    console.log(obj1 === obj2) // true
    function change() {
      obj2.name = 'Frank'
    }
    return {user, change}
  }
}
```

上面例子中，通过包装后的响应式对象 user 来修改，界面会立即跟新。但如果通过修改原始数据 obj2 来修改数据，界面是不会更新的。另外我们可以看见 `obj1 === obj2`，由此证明：`toRaw` 就是用于获取一个 Proxy 对象的原始数据。**还原**