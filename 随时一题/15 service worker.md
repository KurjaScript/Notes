## Service Worker

### 1. service worker 是什么？

service worker 是浏览器和服务器的中间人角色，如果网站中注册了 service worker，那么它可以拦截当前网站所有的请求，进行判断（需要编写相应的判断程序），如果需要向服务器发起请求的就转给服务器，如果可以直接使用的缓存的，就直接返回缓存不再转给服务器。从而大大提高浏览体验。

### 2. service worker 的特点

- 基于 web worker（一个独立于 JavaScript 主线程的独立线程，在里面执行需要消耗大量资源的操作，不会堵塞主线程）；
- 在 web worker 的基础上增加了离线缓存的能力；
- 本质上充当 web 应用程序（服务器）与浏览器之间的代理服务器（可以拦截全站的请求，并作出相应的动作-> 由开发者指定的动作）；
- 创建有效的离线体验（将一些不常更新的内容缓存在浏览器，提高访问体验）；
- 由事件驱动的，具有生命周期；
- 可以访问 cache 和 indexDB；
- 支持推送；
- 并且可以让开发者自己控制管理缓存的内容以及版本。

### 3. 如何使用

#### 1. 注册 service worker，在index.html 加入以下内容

```js
/* 判断当前浏览器是否支持 serviceWorker */
if ('serviceWorker' in navigator) {
  /* 当页面加载完成就创建一个 serviceWorker */
  window.addEventListener('load', function() {
    /* 创建并指定对应的执行内容 */
    /* scope 参数是可选的，可以用来指定你想让 service worker 控制的内容的子目录。在这个例子里，我们制定了 '/'，表示 根网域下的所有内容。这也是默认值。 */
    navigator.serviceWorker.register('./serviceWorker.js', {scope: './'})
    	.then(function (registration) {
      	console.log('ServiceWorker registration successful with scope:', registration.scope);
    	})
    	.catch(function (err) {
      	console.log('ServiceWorker registration failed:', err);
    	});
  });
}
```

#### 2. 安装 worker：在我们指定的处理程序 `serviceWorker.js` 中书写对应的安装及拦截逻辑

```js
/* 监听安装事件，install 事件一般是用来设置你的浏览器的离线缓存逻辑 */
this.addEventListener('install', function(event) {
  /* 通过这个方法可以防止缓存未完成，就关闭 serviceWorker */
  event.waitUntil(
  	/* 创建一个名叫 V1 的缓存版本 */
    caches.open('v1').then(function(cache) {
      /* 指定要缓存的内容，地址为相对于根域名的访问路径 */
      return cache.addAll([
        './index.html'
      ]);
    })
  );
});

/* 注册 fetch 事件，拦截全站的请求 */
this.addEventListener('fetch', function(event) {
  event.respondWith(
  	// magic goes here
    /* 缓存中匹配对应请求资源直接返回 */
    caches.match(event.request)
  );
});
```

以上是一个最简单的使用例子，更多内部 api 请查看 [mdn service worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API) 

### 4. 注意事项

- Service worker 运行在 worker 上下文 --> 不能访问 DOM
- 它设计为完全异步，同步 API（如 XHR 和 localStorage）不能在 service worker 中使用
- 出于安全考量，Service workers 只能由 HTTPS 承载
- 在 Firefox 浏览器的用户隐私模式，Service Worker 不可用
- 其生命周期与页面无关（关联页面未关闭时，它也可以退出，没有关联页面时，它也可以启动）