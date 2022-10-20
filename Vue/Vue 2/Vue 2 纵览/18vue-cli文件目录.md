### 1. node_modules

安装的各个模块

### 2. public

#### 2.1 存放的是最后编译项目时候的页面模块(一个或多个)

#### 2.2 index.html

-  在webpack打包编译的时候，页面模块也会跟着编译——把HTML压缩；把编译后的CSS和JS插入到页面模块中。
- 注意事项：
  - 单独自己导入一些资源信息，把资源信息放置到当前目录下(public)，基于`<% = BASE_URL %>`指定相对引入的地址；
  - 我们需要在页面中留下一个`#APP`容器，因为最后编译的时候，会把所有的内容都插入到这个容器中。
  - 对于不需要打包合并在一起的资源，我们可以单独在模块中自己导入
    - 有一些公共资源，这些公共资源我们不想最后根据`webpack`都打包在一起，我们想单独导入。
    - 还有一些模块不支持`CommonJS/ES6Module`模块规范，这样无法在项目中进行导入导出，此时我们需要单独导入到模块页面中。一般此处导入进来的模块，对应的方法都会暴露到`window`上。
    - 因为模块页面中的东西很少，我们完全可以先自己写一个`Loading`等待的效果(防止移动端资源加载过慢导致的白屏)。
    - 包括一些特殊需要执行的JS或者样式，最好也是单独写在这里。这样不要最后合并打包到一起，例如：REM等比缩放的计算。

### 3. src

包含整个项目中所需要包含的内容代码：脚手架生成的`webpack`配置，只对`src`目录进行编译处理，其他目录是不处理的。

#### 3.1 main.js

项目入口。单页面一个入口，多页面多个入口。

```js
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
new Vue({
    render: h => h(App),
}).$mount('app');
```

导入需要渲染的组件，在new Vue的时候，把组件进行编译，最后放置在模块页面中`#App`容器中。

#### 3.2 App.vue

- 在工程化的项目中，创建组件只需要构建X`xx.vue`即可。文件中包含当前组件自己的数据模板、JS数据状态方法、自己的样式等。

- 当前`index.html`这个页面的主要入口

  ```vue
  <template>
  	<!-- 组件的视图模块 -->
  	<div id="app">云柱和火柱</div>
  </template>
  <script>
  	//当前组件的JS管控
  export default {
      //相当于私有组件中的内容
  };
  </script>
  <style>
  /*
  	当前组件的样式
      问题：直接这样写，最后所有组件中的样式合并打包的时候容易产生冲突。
      1. 手动避免冲突：基于less/sass中的嵌套，指定很长的前缀可与避免，但是生成的CSS性能不好；
      2. 直接设置scoped，代表当前组件中的样式是私有的(webpack帮助我们重新命名)，最后打包在一起的时候不会冲突了。
  */
  </style>
  ```

#### 3.3 components

存放多个组件中需要用到的公共组件

#### 3.4 pages

每一个单独的业务板块或者页面都在这里创建——自己创建的文件夹。

#### 3.5 assets

存放项目需要的静态资源文件：images、css、lib...

#### 3.6 api

存放`axios`的二次配置或者一些接口的数据管理

#### 3.7 store

管理`vuex`中的一套信息

#### 3.8 router

管理路由的一套信息

#### 3.9 views

主组件入口

### 4.bable.config.js

`bable`的配置信息(编译解析JS的)

### 5. package.json

当前项目的模块依赖清单。脚手架生成的项目中，我们还会把一些`webpack`需要用到的配置信息，也写在这里。

#### 5.1 "script"

- ```js
  "script": {
      "serve": "vue-cli-serve serve",
       "build": "vue-cli-serve build",
       "lint": "vue-cli-serve lint"
  }
  ```

  配置可执行的脚本命令

- `$npm run serve/$ yarn serve`

  开发环境下预览项目。`webpack`会打包编译，并且基于`dev-serve`创建一个本地预览服务，并且监听代码变化，一旦有变化会重新编译，自动刷新浏览器看到效果。

- `npm run build`

  生产环境部署之前，基于这个命令，把项目进行打包。打包后的内容放到dist或者build目录中，我们把这个目录中的内容整体部署到服务即可。

#### 5.2 "dependencies": {...}——生产依赖；"devDependencies": {...}——开发依赖

#### 5.3 "eslintConfig": {...}——词法解析规则，可以在从此处自定义ESLINT词法检测规则；"browserslist": {...}——配置浏览器兼容的列表

### 6. vue.config.js——vue-cli的进阶配置

