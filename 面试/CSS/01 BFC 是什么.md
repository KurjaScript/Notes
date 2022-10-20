### 1. BFC 是什么?

`BFC` 全称：`Block Formatting Context`， 名为 "块级格式化上下文"。`BFC`是一个完全独立的空间（布局环境），让空间里的子元素不会影响到外面的布局。

### 2. 你知道怎么触发 BFC 吗？

#### 如何触发 BFC

1. 绝对定位，或者把 `position` 设置为 `fix` 

2. `flex` 布局，或者把 display 设置为 `inline-block`、`table-cell`；

3. 把 overflow 设置为 hidden。

### 3. BFC 解决了哪些问题

1. 子元素使用 `float` 脱离文档流，造成父元素高度塌陷，由于父元素高度没有被撑开，从而背景颜色渲染不出来；这时可以让父元素触发 `BFC` ；

2. margin 边距重叠问题，两个盒子之间的距离为 margin 的较大值，而不是 margin 的和；这时可以让盒子触发称为 BFC；

3. 两栏布局，当第一个元素设置 float 脱离文档流，会把第二个元素的宽度覆盖，为解决这个问题，可以给第二个元素触发 BFC；



