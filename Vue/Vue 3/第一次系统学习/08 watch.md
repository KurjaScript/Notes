`watch` API 与选项式 API this.$watch (以及相应的 watch 选项)完全等效。 `watch` 需要侦听特定的数据源，并在单独的回调函数中执行副作用。默认情况下，它也是惰性的——即回调仅在侦听源发生变化时被调用。

- 与 `watchEffect` 相比，`watch` 允许我们：
  - 惰性地执行副作用；
  - 更具体地说明应触发侦听器重新运行的状态；
  - 访问被侦听状态的先前值和当前值。

### 侦听单一源

侦听器数据源可以是一个具有返回值的 getter 函数，也可以直接是一个 ref：

```js
// 侦听一个 getter
const state = reactive({ count:0 })
watch(
	() => state.count,
  (count, prevCount) => {
    /* ... */
  }
)

// 直接侦听一个 ref
const count = ref(0)
watch(count, (count, prevCount) => {
  /* ... */
})
```

### 侦听多个源

侦听器还可以使用数组以同时侦听多个源：

```js
watch([fooRef, barRef], ([foo, bar], [prevF00, prevBar]) => {
  /* .. */
})
```

### watch 与 watchEffect 相同的行为

`watch` 与 `watchEffect` 在手动停止侦听、清除副作用（将 onInvalidate 作为第三个参数传递给回调）、刷新时机和调试方面有相同的行为。

**类型声明：**

```js
// 侦听单一源
function watch<T>(
  source: WatcherSource<T>,
  callback: (
    value: T,
    oldValue: T,
    onInvalidate: InvalidateCbRegistrator
  ) => void,
  options?: WatchOptions
): StopHandle

// 侦听多个源
function watch<T extends WatcherSource<unknown>[]>(
  sources: T
  callback: (
    values: MapSources<T>,
    oldValues: MapSources<T>,
    onInvalidate: InvalidateCbRegistrator
  ) => void,
  options? : WatchOptions
): StopHandle

type WatcherSource<T> = Ref<T> | (() => T)

type MapSources<T> = {
  [K in keyof T]: T[K] extends WatcherSource<infer V> ? V : never
}

// 参见 `watchEffect` 共享选项的类型声明
interface WatchOptions extends WatchEffectOptions {
  immediate?: boolean // 默认：false
  deep?: boolean
}
```

