### background-color 与 background 设置背景颜色的区别

background-color 设置的只是背景色，background 设置的是整个背景。

当元素本身设置了 background-image 属性时，如果设置了 background-color，图片不会被覆盖，**background-color 会在 image 底层**；**如果设置的是 background，那么图片会被颜色覆盖掉**。

### background-attachment

定义 background-image 是否跟随容器的滚动而滚动。对 background-color 无效。

`background-attachment = scroll | fixed | local`

当设置 `background-attachment: fixed` 时，设置的 background-image 背景不随元素滚动而滚动。

### background-position

定义 background-image 在容器的位置。对 background-color 无效。

`Background-position = [left | center | right | top | bottom | length-percentage]`

```css
body { background-position: right top } /* 100% 0% */
body { background-position: top center } /* 50% 0% */
body { background-position: center } /* 50% 50% */
body { background-position: bottom } /* 50% 100% */
```

### Visibility: hidden 与 display: none 对 background-image 的影响

background-image 对应的是一张静态资源图片，当页面渲染前会请求这张图片资源回来进行渲染。

visibility: 元素仍然存在DOM树中，只是不显示而已；display: none，元素不存在与DOM树中。

当元素visibility: hidden时，这张图片资源仍然会请求，但是不会显示出来；当元素设置display: none时，这张图片资源不会请求，也不会显示。

还有一种场景：**如果页面出现了滚动条，那么滚动条下面（即视图之外）的background-image 静态资源会不会请求呢？会的。**只要元素存在于 DOM 树上，不论显示还是隐藏，其依赖的 background-image 资源都将会请求回来。

**从这里可以引发一些对资源请求的思考了**

### background-size

用来设置背景图像的尺寸，默认值为 auto

语法： `background-size:length | percentage | cover | contain`

- `length([width, heigth='auto'])`
- `percentage([width,height='auto'])`:以父元素的百分比来设置背景图像的宽度和高度
- cover: 将背景图像**等比放大到完全覆盖容器**，背景图像有可能超出容器
- contain: 将背景图像**等比缩放到宽度或高度与容器的宽度或高度相等**，背景图像始终被包含在容器内

- `background-size: 100%`:总是 X 轴 100% 铺满整个容器， Y 轴可能被裁剪会出现空白填不满部分，图片不变形，可表现为 cover 或 contain

设定超过一张以上的图片尺寸时，需要提供多项数值，它们通过逗号分隔，如 `background-size: 50% 25%, contain, 50px`

### background-repeat

设置是否及如何重复背景图像，默认值：repeat

语法：`background-repeat:<repeat-style> [<repeat-style>]`; 可设置两个值，第二个值可选；第一个用于横向，第二个用于纵向。

可能的值：

- `repeat-x`：背景图像在横向上平铺
- `repeat-y`：背景图像在纵向上平铺
- `repeat`：背景图像在横向和纵向平铺
- `no-repeat`：背景图像不平铺
- `round`：**背景图像自动缩放直到适应且填充满整个容器。**（CSS3）
- `space`：**背景图像以相同的间距平铺且填充满整个容器或某个方向。**（CSS3）

### background-origin

设置 `background-position`属性相对于什么位置来定位

默认值：padding-box

语法：`background-origin: padding-box | border-box | content-box`

- border-box: 从 border 区域 （含 border）开始显示背景图像；
- padding-box：从 padding 区域（含 padding）开始显示背景图像；
- content-box：从 content 区域开始显示背景图像。

### background-clip

规定背景的绘制区域

默认值：border-box

可能的值：

- `border-box`: 从 border 区域（不含 border）开始向外裁剪背景；

- `padding-box`: 从 padding 区域（不含 padding）开始向外裁剪背景。

- `content-boc`: 从 content 区域开始向外裁剪背景。

- `text`: 从前景内容的形状（比如文字）作为裁剪区域或向外裁剪，如此即可实现背景作为填充色之类的遮罩效果。

  ```css
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: cover;
  ```

Background-clip 只是把背景和背景色粗暴地裁剪。