Vue3 不建议直接书写 render() 函数，因为会跳过编译器优化。

render() 和 tempalte 都是类编译器，在渲染的过程中，render() 是 template 的下一步。

```js
// Vue 的渲染过程
// template => render(), h => 原生 JS 的 createElement() => 创建真实元素 => 生成虚拟 DOM => 真实 DOM
render (h) {
	return h('button', {
    // v-bind: class
    class: {
      btn: true;
      'btn-success': this.type === 'success',
      'btn-error': this.type === 'error',
      'btn-warning': this.type === '',
      'normal': this.type
    },
    
    // DOM 属性
    domProps: {
      innerText: this.text || '默认按钮'
    },
    // v-on 绑定方法
    on: {
      
    }
  })
}
```

