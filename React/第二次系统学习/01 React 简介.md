React 特点：组件化、声明式编码；在 React Native 中可以使用 React 语法进行移动端开发；虚拟 DOM + Diffing 算法。



关于虚拟DOM：

1. 本质是 Object 类型的对象（一般对象）；
2. 虚拟 DOM 比较“轻”，真实 DOM 比较“重”，因为虚拟 DOM 是 React 内部使用，无需真实 DOM 那么多属性；
3. 虚拟 DOM 最终会被 React 转化为真实 DOM，呈现在页面上。