[原文](https://juejin.cn/post/6994959998283907102#heading-3)

#### 1. 什么是虚拟DOM？

**diff算法**的预热

**虚拟DOM**是一个**用来表示真实 DOM的对象**，以下是一个**真实DOM**：

```html
<ul id="list">
    <li class="item">哈哈</li>
    <li class="item">呵呵</li>
    <li class="item">嘿嘿</li>
</ul>
```

其对应的虚拟DOM为：

```js
let oldVDOM = { // 旧虚拟DOM
        tagName: 'ul', // 标签名
        props: { // 标签属性
            id: 'list'
        },
        children: [ // 标签子节点
            {
                tagName: 'li', props: { class: 'item' }, children: ['哈哈']
            },
            {
                tagName: 'li', props: { class: 'item' }, children: ['呵呵']
            },
            {
                tagName: 'li', props: { class: 'item' }, children: ['嘿嘿']
            },
        ]
    }

```

当我们修改一个li标签，会生成一个新的虚拟DOM，这就是我们常说的**新旧两个虚拟DOM**。

“虚拟DOM比 真实DOM快”这句话并不严谨，甚至是错误的，正确的说法应该是：**虚拟DOM算法操作真实DOM，性能高于直接操作真实DOM**。

**虚拟DOM**和**虚拟DOM算法**是两种概念。**虚拟DOM算法 = 虚拟DOM + Diff算法**

#### 2. 什么是Diff算法

**Diff算法是一种对比算法**。对比两者是旧虚拟DOM和新虚拟DOM，对比出是哪个虚拟节点更改了，找出这个虚拟节点，并只更新这个虚拟节点对应的真实节点，而不用更新其他数据没发生改变的节点，实现精准地更新DOM，进而提高效率。

**虚拟DOM算法的损耗计算：**

**总损耗 = 虚拟DOM增删改 + （与Diff算法效率有关）真实DOM差异增删改 + （较少节点）排版与重绘**

**直接操作真实DOM的损耗计算：**

**总损耗 = 真实DOM完全增删改查  + （可能较多节点）排版与重绘**

#### 3. Diff算法的原理

新旧虚拟DOM对比的时候，Diff算法比较只会在同层级进行，不会跨层级比较。所以Diff算法是：**深度优先算法**，时间复杂度：O(n)

