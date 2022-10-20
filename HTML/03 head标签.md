## `<head>` 标签里有什么？Metadata-HTML中的元数据

head 标签里的内容不会在页面中显示出来。head 标签包含了页面的`<title>`、指向 CSS 的链接、指向自定义的图标的链接和其它**元数据**（描述 HTML 的数据，比如，作者和描述文档的关键字）等信息。

### 1. 什么是 HTML `<head>` 标签

```html
<head>
	<meta charset="utf-8">
  <title>我的测试页面</title>
</head>
```

大型页面的 head 会包含很多元数据。可以用 [开发者工具](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_are_browser_developer_tools#%E5%A6%82%E4%BD%95%E5%9C%A8%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%AD%E6%89%93%E5%BC%80%E5%BC%80%E5%8F%91%E8%80%85%E5%B7%A5%E5%85%B7)查看网页的 head 信息。这里只是初步介绍几项 head 中重要的常用元素。

### 2. 添加标题

`<title>` 元素可以为文档添加标题，别和 `<h1>` 元素是为 body 添加标题的。

- `<h1>` 元素在页面加载完毕时显示在页面中，通常只出现一次，用来标记页面内容的标题（故事名称、新闻摘要，等等）。
- `<title>` 元素是一项元数据，用于表示整个 HTML文档的标题（而不是文档内容）。

### 3. 元数据：`<meta>` 元素

**元数据就是描述数据的数据**，HTML 有一个“官方的”方式来为一个文档添加数据——`<meta>` 元素。

有很多不同种类的 `<meta>` 元素可以被包含进你的页面的 `<head>` 元素，但是这里先解释一些常见到的类型。

#### 3.1 指定你的文档中字符的编码

```html
<meta charset="utf-8">
```

这个元素指定了文档的字符编码——在这个文档中被允许使用的字符集。`utf-8` 是一个通用的字符集，它包含了任何人类语言中的大部分的字符。这意味着该 web 页面可以显示任何的语言。**所以应该在每一个页面都使用这个设置。**

#### 3.2 添加作者和描述

许多 `<meta>` 元素包含了 `name` 和 `content` 属性：

- `name` 指定了 meta 元素的类型；说明该元素包含了什么类型的信息。
- `content` 指定了实际的元数据的内容。

这两个 meta 元素对于定义页面的作者和提供页面的简单描述是很有用的。如下示例：

```html
<meta name="author" content="Chris Mills">
<meta name="description" content="The MDN Web Docs Learning Area aims to provide complete beginners to the Web with all they need to know to get
started with developing web sites and applications.">
```

指定作者在某些情况下是很有用的：如果你需要联系页面的作者，问一些关于页面内容的问题。一些内容管理系统能够自动获取页面作者的信息，然后用于某些用途。

指定包含关于页面内容的关键字的页面内容的描述是很有用的，因为它可能或让你的页面在搜索引擎的相关的搜索出现得更多（这些行为在术语上被称为：**搜索引擎优化，或 SEO。**）

#### 3.3 其他类型的元数据

当你在网站上查看源码时，你也会发现其它类型的元数据。你在网站上看到的许多功能都是专有创作，旨在向某些网站（如社交网站）提供可使用的特定信息。

例如，Facebook 编写的元数据协议 [Open Graph Data](https://ogp.me/) 为网站提供了更丰富的元数据。在 MDN Web 文档源代码中，你会发现：

```html
<meta property="og:image" content="https://developer.mozilla.org/static/img/opengraph-logo.png">
<meta property="og:description" content="The Mozilla Developer Network (MDN) provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and HTML5 Apps. It also documents Mozilla products, like Firefox OS.">
<meta property="og:title" content="Mozilla Developer Network">
```

上面代码展示的一个效果就是，当你在 Facebook 上链接到 MDN 时，该链接将显示一个图像和描述：这为用户提供更丰富的体验。

![](/Users/Kurja/Desktop/Typora/HTML/e6c9d24egy1h4tk0d8k5hj20dq0almxp.jpg)

Twitter 还拥有自己的类型的专有元素协议（称为：[Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards) )，当网站的 URL 显示在 twitter.com 上时，它具有相似的效果。例如下面：

```html
<meta name="twitter:title" content="Mozilla Developer Network">
```

### 4. 在你的站点增加自定义图标

为进一步丰富网站的设计，可以在元数据中添加自定义图标（favicon，为“favorites”的缩写）的引用，这些将在特定的场合（浏览器的收藏，或书签列表）中显示。

这个看起来不起眼的图标已经存在很多年了，16*16 像素是这种图标的第一种类型。你可以看见这些图标出现在浏览器每一个打开的标签页中以及书签页中。

页面添加图标的方式有：

1. 将其保存在与网站的索引页面相同的目录中，以 `.ico` 格式保存（大多数浏览器支持更通用的格式，如 `.gif` 或 `.png`，**但使用 ICO 格式将确保它能在如 Internet Explore 6 那样古老的浏览器显示**）

2. 将以下行添加到 HTML 的 `<head>` 中以引用它：

   ```html
   <link rel="icon" href="favicon.ico" type="image/x-icon">
   ```

### 5. 在 HTML 中应用 CSS 和 JavaScript

如今，几乎你使用的所有网站都会使用 [CSS](https://developer.mozilla.org/zh-CN/docs/Glossary/CSS) 来让网页更加炫酷，并使用 [JavaScript](https://developer.mozilla.org/zh-CN/docs/Glossary/JavaScript) 来让网页有交互功能，比如视频播放器、地图、游戏以及更多功能。这些应用在网页中很常见，它们分别使用 [`<link>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link) 元素以及 [`<script>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script) 元素。

- `<link>` 元素经常位于文档的头部。这个 link 元素有两个属性，`rel="stylesheet"` 表明这是文档的样式表，而 `href` 包含了样式表文件的路径：

  ```html
  <link rel="stylesheet" href="my-css-file.css">
  ```

- `<script>` 元素没有必要非要放在文档的 `<head<` 中，并包含 `src` 属性来指向需要加载的 JavaScript 文件路径，同时最好加上 `defer` 以告诉浏览器在解析完成 HTML 后再加载 JavaScript。这样就可以确保在加载脚本之前浏览器已经解析了所有 HTML 的内容（如果脚本尝试访问某个不存在的元素，浏览器就会报错）。实际上还有很多方法可用于处理加载 JavaScript 的问题，但这是现代浏览器中最可靠的一种方法。

  ```html
  <script src="my-js-file.js" defer></script>
  ```

  