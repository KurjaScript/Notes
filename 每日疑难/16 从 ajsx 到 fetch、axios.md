## 从 ajax 到 fetch、axios

前端是个发展迅速的领域，前端请求自然也发展迅速，从原生的 XHR 到 jquery ajsx，再到现在的 axios 和 fetch。

### 1. jquery ajax

```js
$.ajax({
  type: 'POST',
  url: url,
  data: data,
  dataType: dataType,
  success: function() {}
  error: function
})
```

它是对原生 XHR 的封装，还支持 JSONP，非常方便，用过的都说好。但是随着 react，vue 等前端框架的兴起，jquery 早已不复当年。很多情况下我们只需要使用 ajax，但是却需要引入整个 jquery，这非常不合理，于是便有了 fetch 的解决方案。

### 2. fetch

fetch 是 ajsx 的替代品，它的 API 是基于 Promise 设计的，旧版的浏览器不支持 Promise，需要使用 polyfill es6-promise。

举个例子：

```js
// 原生 XHR
var xhr = new XMLHttpRequest()
xhr.open('GET', url)
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText) // 从服务器获取数据
  }
}
xhr.send()

// fetch
fetch(url)
		.then(response => {
  		if (response.ok) {
        return response.json()
      }
		})
		.then(data => console.log(data))
		.catch(err => console.log(err))
```

看起来好像是方便点，then 链就想之前熟悉的 callback。

在 MDN 上，讲到它跟 jquery ajax 的区别，这也是 fetch 很奇怪的地方：

> 当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），  仅当网络故障时或请求被阻止时，才会标记为 reject。 默认情况下, fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于用户 session，则会导致未经认证的请求（要发送 cookies，必须设置 credentials 选项）.

突然感觉这还不如jquery ajax好用呢？别急，再搭配上async/await将会让我们的异步代码更加优雅：

```js
async function test() {
  let response = await fetch(url)
  let data = await response.json()
  console.log(data)
}
```

看起来就想同步代码一样，但 async / await 是 ES7 的 API ，目前还在试验阶段，还需要我们使用 babel 进行转译成 ES5 代码。

还要提一下是，fetch 是比较底层的 API，很多情况下都需要我们再次封装。比如：

```js
// jquery ajax
$.post(url, {name: 'test'})
// fetch
fetch(url, {
  method: 'POST',
  body: Object.keys({name: 'test'}.map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
  }).join('&'))
})
```

由于 fetch 是比较底层的 API，所以需要我们手动将参数拼接成 

'name=test' 的格式，而 jquery ajax 已经封装好了，所以 fetch 并不是开箱即用的。另外，fetch 还不支持超时控制。哎呀，感觉 fetch 好垃圾，还需继续成长。

### 3. axios

axios 也是对原生 XHR 的封装。它有以下几大特性：

- 可以在 node.js 中使用
- 提供了并发请求的接口
- 支持 Promise API

简单使用

```js
axios({
  method: 'GET',
  url: url,
})
.then(res => {console.log(res)})
.catch(err => {console.log(err)})
```

写法有很多中，可以自行查看文档

**并发请求**

```js
function getUserAccount() {
  return axios.get('/user/12345')
}

function getUserPermissions() {
  return axios.get('/user/12345/permission')
}

axios.all([getUserAccount(), getUserPermissions()])
	.then(axios.spread(function (acct, perms) {
  	// Both request are now complete
	}))
```

axios 体积比较小，也没有 fetch 的各种问题。这些都是基础用法，深入了解还要在实战中多多历练。