### BFC 是什么
`BFC` 全称：`Block Formatting Context`， 名为 "块级格式化上下文"。`BFC`是一个完全独立的空间（布局环境），让空间里的子元素不会影响到外面的布局。
#### 如何触发 BFC

- `overflow: hidden`
- `display: inline-block`
- `position: absolute`
- `position: fix`
- 垂直方向的距离由 `margin` 决定， 属于同一个`BFC`的两个相邻的标签外边距会发生重叠；
- 计算`BFC`的高度时，浮动元素也参与计算；

### BFC 解决了哪些问题

- 子元素使用 `float` 脱离文档流，造成父元素高度塌陷，由于父元素高度没有被撑开，从而背景颜色渲染不出来；这时可以让父元素触发 `BFC` ；
- margin 边距重叠问题，两个盒子之间的距离为 margin 的较大值，而不是 margin 的和；这时可以让盒子触发称为 BFC；
- 两栏布局，当第一个元素设置 float 脱离文档流，会把第二个元素的宽度覆盖，未解决这个问题，可以给第二个元素触发 BFC；