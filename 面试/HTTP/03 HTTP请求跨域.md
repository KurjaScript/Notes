### 1. 跨域的原理

**跨域**，是由同源策略造成的，如果**协议、域名、端口**有任何一个不同，就会出现跨域问题，跨域就是避开浏览器的安全限制请求资源。

### 2. 跨域的解决方案？

`ajax` 请求受同源策略的影响，不允许进行跨域请求，而 `script` 标签 `src` 属性中的链接却可以访问跨域的 js 脚本，利用这个特性，服务端不再返回 JSON 格式的数据，而是返回一段调用某个函数的 js 代码，在 src 中调用，这样就实现了跨域。

步骤：

1. 创建一个 script 标签；
2. script 的 src 属性设置接口地址；
3. 接口参数，必须要带一个自定义函数名，要不然后台无法返回数据；
4. 通过自定义函数去接受返回的数据。

但是 **JSONP 跨域**只支持 get 请求，因为 script 标签只能使用 get 请求；**JSONP 跨域**需要后端配合返回指定格式的数据。



### 代码示例



### 代码示例

#### 2

```js
// 动态创建 script
let script = documnet.cerateElement('script')
// 设置回调函数
function getData(data){
    cosole.log(data)
}
// 设置 script 的 src 属性，并设置请求地址
script.src = 'http://localhost:3000/?callback=getData';
// 让 script 生效
document.body.appendChild(script)
```

