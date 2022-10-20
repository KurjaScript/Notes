### 1. 说一说 web 存储的几种方式。

`cookie、localStorage、sessionStorage`

### 2. 能进一步说一说他们的特点吗？

#### cookie

`cookie` 本身用于浏览器和服务器之间的通讯，被 ’借用‘ 到本地存储，可以用 `document.cookie = '...'` 来修改。

但是 `cookie` 的存储大小只有 4KB，`http` 请求时需要发送到服务端，增加请求数量。只能用 `document.cookie = '...'` 来修改，太过简陋。

#### localStorage 和 sessionStorage

这是 **HTML5** 专门为存储设计的，最大可存 5 M，**API** 简单易用，`setItem`、`getItem`，不会随着 http 请求被发送到服务端。

### 3. localStorage 和 sessionStorage 有什么区别？

- `localStorage` 数据会永久存储，除非代码删除或手动删除；
- `sessionStorage` 数据只存在于当前会话，浏览器关闭就清空。

一般用 `localStorage` 会多一些。

