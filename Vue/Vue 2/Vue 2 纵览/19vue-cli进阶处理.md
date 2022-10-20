### 1. 创建

在当前文件夹的根目录下创建`vue.config.js`文件 ，在这个文件中进行二次配置脚手架。

### 2. 语法

#### 2.1 官网

http://cli.vuejs.org/zh/guide/

#### 2.2 `module.export = {配置项1, 配置项2...}`

#### 2.3 常用配置

##### 2.3.1 pubilcPath

在服务器打包部署的时候，我们往往会根据服务器部署的地址，指定所有插入资源的统一前缀路径。默认/代表部署到服务器根目录。

`publicPath:'/dist/'`

##### 2.3.2 pages

```js
// 配置多页面
pages: {
    index: {
        // page 的入口
        entry: 'src/main.js',
        // 模板来源
        template: 'public/index.html',
        // 指定最后打包完成生成的文件名
        filename: 'index.html',
        // template 中的 title 标签需要是
        // <title><%= htmlWebpackPlugin.options.title %></title>
        title: '首页',
        // 需要依托哪些JS
        chunks: ["chunk-vendors", "chunk-common", "index"]
    },
    login: {
        entry: 'src/login.js',
        template: 'public/login.html',
        filename: 'login.html',
        chunks: ["chunk-vendors", "chunk-common", "login"]
    }
},
```

##### 2.3.3 lintOnSave

- 在开发环境下，是否每次代码编译都执行词法检测。开启后：编译会变慢、而且以后在`xxx.vue`中可能多加一个空格它都编译不过去。
- 默认是true。
- `lintOnSave: false,`一般都禁掉。

##### 2.3.4 devServe

`type: Object`，所有`webpack-dev-serve`的选项都支持。注意：

- 有些值像 `host`、`port`、和`https`可能会被命令行参数覆写。
- 有些值像`publicPath`和`historyApiFallback`不应该被修改，因为它们需要和开发服务器的`publicPath`同步以保障正常的工作。

```js
// webpack-dev-serve
// 改变端口号
devServer: {
    port: 3000,
}
```

##### 2.3.5 devServe.proxy

- 如果你的前端应用和后端API服务器没有运行在同一个主机上，你需要在开发环境下将API请求代理到API服务器。这个问题可以通过`vue.config.js`中的`devServer.proxy`选项来配置。

- ```js
  module.exports = {
      devServe: {
          proxy: 'http://localhost:400'
      }
  }
  // `devServer.proxy`可以是一个指向开发环境API服务器的字符串。
  ```

  ```js
  devServer: {
      proxy: {
          '/api': {
              target: BASE_URL,
              changeOrigin: true
          }
      }
  }
  // devServer.proxy 可以是一个对象
  ```

  



