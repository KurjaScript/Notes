**vertical-align** 用来指定行内元素（inline）或表格单元格（table-cell）元素的垂直对齐方式。

该属性可被用于两种环境：

- 使行内元素盒模型与其行内元素容器垂直对其。

- 垂直对其表格单元内容。

**注意：** vertical-align 只对行内元素、行内块元素和表格单元元素生效，不能用它垂直对齐块级元素。

#### 语法：

```css
/* Keyword values */
vertical-align: baseline; // 使元素的基线与父元素的下标基线对齐；
vertical-align: sub;  // 使元素的基线与父元素的下标基线对齐；
vertical-align: super; // 使元素的基线与父元素的上标基线对齐；
vertical-align: text-top; // 使元素的顶部与父元素的字体顶部对齐；
vertical-align: text-bottom; // 使元素的底部与父元素的字体底部对齐；
vertical-align: middle; // 使元素的中部与父元素的基线加上父元素x-height 的一半对齐；
vertical-align: top; // 使元素及其后代元素的顶部与整行的顶部对齐；
vertical-align: bottom; // 使元素及其后代元素的底部与整行的底部对齐；

/* <length> values */
/* 使元素的基线对齐到父元素的基线之上的给定长度，可以是负数。 */
vertical-align: 10em; //
vertical-align: 4px;

/* <percentage> values */
/* 使元素的基线对齐到父元素的基线之上的给定百分比，该百分比是 line-height 属性的百分比，可以是负数。 */
vertical-align: 20%;

/* Global values */
vertical-align: inherit;
vertical-align: initial;
vertical-align: unset;

```

