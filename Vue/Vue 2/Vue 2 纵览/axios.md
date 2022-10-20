### 概述

Axios是一个基于promise的HTTP库

**本质是XMLHttpRequests请求，即ajax请求**

#### 特性

- 从浏览器中创建`XMLHttpRequests`；
- 从`node.js`创建`http`请求；
- 支持Promise API；
- 拦截请求和响应；
- 转换请求数据和响应数据；
- 取消请求；
- 自动转换JSON数据；
- 客户端支持防御XSRF

### 基本使用

Axios提供两种不同的形式来发送HTTP请求，一种是通过axios()方法，另一种是分别通过axios对象提供的与HTTP方法对应的方法来发送请求，如：

- axios.get(url)
- axios.post(url, data)
- axios.update(url)
- axios.update(url)
- axios.put(url,data)

axios.get()等方法在官方文档中被描述为请求方法的别名

#### axios API的使用

axios(config)方法接收一个对象，这个对象包含了一些对请求的配置，axios会根据这些配置来发送对应的请求。

最基本的配置项应该包括：

- method请求的方法(可选值：get, post等)
- url请求的地址(必须项)
- data请求发送的数据(post等请求需要)

默认的请求方法是get，所以如果是get请求可以不设置method

```js
axios({
    method: 'post',
    url: '/user/12345',
    data: {
        fisrtName: '云柱',
        lastName: '火柱'
    }
});
```

请求响应的处理在then和catch回调中，请求正常会进入then，请求异常则会进入catch。

```js
// 发送POST请求
axios({
    method: 'post',
    url: '/user/12345',
    data: {
        firstName: '云柱',
        lastName: '火柱',
    }
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
```

```js
// 发送请求
axios('/url/12345');
```

个人观点：对于Axios，只需掌握axios() api的基本使用就可以了

### 请求别名的使用

axios还为每一个HTTP的方法提供与之对应的方法来发送get请求：

```js
// 为给定ID的user创建请求
axios.get('/user?ID=12345').then(function(response){
    console.log(response);
}).catch(function (error){
    console.log(error);
})
```

```js
// 发送post请求
axios.post('/user', {
    firstName: '云柱',
    lastName: '火柱',
}).then(function (response){
    console.log(response)
}).catch(function(error) {
    console.log(error);
})
```

其他的方法使用类似，略

注意：在使用别名方法时，url、method、data这些属性都不必在配置中指定。

### 响应结构

通过axios发出请求的响应结果中，axios会加入一些字段，如下：

```js
{
    // `data` 由服务器提供的响应
    data: {},
    // `status` 来自服务器响应的HTTP状态码
    status: 200,
    // `statusText` 来自服务器响应的HTTP状态信息
    statusText: 'OK',
    // `headers` 服务器响应头
    headers: {},
    // `config` 是为请求提供的配置信息
    config: {},
    // `request` 是生成此响应的请求，(在重定向中)它是node.js中的最后一个ClientRequest实例；XMLHttpRequest 实例是浏览器
    request: {}
}
```

其中data是后端返回的数据，**一般我们也只需要关注response中的data字段就行**

### 创建实例

可以使用自定义配置新建一个axios实例axios.create([config])

```js
const instance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
})
```

创建的实例中的axios() api 改为了request() api，使用方式是一样的，其他如请求别名等函数，都没有改变

以下是实例所拥有的方法:

```js
request(config)
get(url[,config])
delete(url[,config])
header(url[,config])
optoions(url[,config])
post(url[, data[, config]])
put(url[, data[, config]])
patch(url[, data[, config]])
```

axios会把这些方法中的config与创建实例时指定的config合并到一起使用

[未完](https://juejin.cn/post/6884561821127491597)

