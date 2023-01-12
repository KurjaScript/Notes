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

### 