#### 1.什么是npm脚本

npm允许在`package.json`文件里面，使用`scripts`字段定义脚本命令。

```javascript
{
  // ...
  "scripts": {
    "build": "node build.js"
  }
}
```

以上代码是package.json文件里的片段，scripts字段是一个对象，它的每一个属性对应一段脚本，比如build命令对应的脚本是node build.js。

```bash
$ npm run build
# 等同于执行
$ node build.js
```

查看当前项目的所有npm脚本命令，可以使用不带任何参数的`npm run`命令。

#### 2. 原理

每当执行npm run，就会自动新建一个Shell，在这个Shell里面执行指定的脚本命令。因此，只要是Shell（一般是bash)可以执行的命令，就可以写在npm脚本里。

npm run新建的Shell会将当前目录的<font color='red'>node_modules/.bin</font>的子目录加入PATH变量，执行结束后再将PATH变量恢复原样。

<font color='green'>这意味着，当前目录的</font><font color='red'>node_modules/.bin</font><font color='green'>子目录里面的所有脚本，都可以用脚本名调用，而不必加上路径。</font>比如当前项目的依赖里面有Mocha，只要直接写<font color='red'>mocha test</font>就可以了。

```bash
"test": "mocha test"
```

而不用写成下面这样：

```bash
"test": "./node_modules/.bin/mocha test"
```

#### 3. 通配符

由于 npm 脚本就是 Shell 脚本，因为可以使用 Shell 通配符。

```bash
"lint": "jshint *.js"
"lint": "jshint **/*.js"
```

上面代码中，`*`表示<font color='cornflowerblue'>任意文件名</font>，`**`表示<font color='cornflowerblue'>任意一层子目录</font>。

如果要将通配符传入原始命令，防止被 Shell 转义，要将星号转义。

```bash
"test": "tap test/\*.js"
```

#### 4.传参

向 npm 脚本传入参数，要使用`--`标明。

```bash
"lint": "jshint **.js"
```

向上面的`npm run lint`命令传入参数，必须写成下面这样：

```bash
$ npm run lint --  --reporter checkstyle > checkstyle.xml
```

也可以在`package.json`里面再封装一个命令。

```javascript
"lint": "jshint **.js",
"lint: checkstyle": "npm run lint -- --reporter checkstyle > checkstyle.xml"
```

#### 5. 执行顺序

如果是并行执行（即同时的平行执行），可以使用`&`符号。

```bash
$ npm run script1.js & npm run script2.js
```

如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用`&&`符号。

```bash
$ npm run script1.js && npm run script2.js
```

这两个符号是 Bash 的功能。此外，还可以使用 node 的任务管理模块：[script-runner](https://github.com/paulpflug/script-runner)、[npm-run-all](https://github.com/mysticatea/npm-run-all)、[redrun](https://github.com/coderaiser/redrun)。

#### 6. 默认值

一般来说，npm 脚本由用户提供。但是，npm 对两个脚本提供了默认值。也就是说，这两个脚本不用定义，就可以直接使用。

```javascript
"start": "node server.js"，
"install": "node-gyp rebuild"
```

上面代码中，`npm run start`的默认值是`node server.js`，前提是项目根目录下有`server.js`这个脚本；`npm run install`的默认值是`node-gyp rebuild`，前提是项目根目录下有`binding.gyp`文件。

#### 7.钩子

npm 脚本有`pre`和`post`两个钩子。举例来说，`build`脚本命令的钩子就是`prebuild`和`postbuild`。

```javascript
"prebuild": "echo I run before the build script",
"build": "cross-env NODE_ENV=production webpack",
"postbuild": "echo I run after the build script"
```

用户执行`npm run build`的时候，会自动按照下面的顺序执行。

```bash
npm run prebuild && npm run build && npm run postbuild
```

因此，可以在这两个钩子里面，完成一些准备工作和清理工作。下面是一个例子：

```javascript
"clean": "rimraf ./dist && mkdir dist",
"prebuild": "npm run clean",
"build": "cross-env NODE_ENV=production webpack"
```

npm 默认提供下面这些钩子：

- prepublish，postpublish
- preinstall，postinstall
- preuninstall，postuninstall
- preversion，postversion
- pretest，posttest
- prestop，poststop
- prestart，poststart
- prerestart，postrestart

注意，`prepublish`这个钩子不仅会在`npm publish`命令之前运行，还会在`npm install`（不带任何参数）命令之前运行。这种行为很容易让用户感到困惑，所以 npm 4 引入了一个新的钩子`prepare`，行为等同于`prepublish`，而从 npm 5 开始，`prepublish`将只在`npm publish`命令之前运行。

#### 8. 简写形式

四个常用的 npm 脚本有简写形式。

- `npm start`是`npm run start`
- `npm stop`是`npm run stop`的简写
- `npm test`是`npm run test`的简写
- `npm restart`是`npm run stop && npm run restart && npm run start`的简写

`npm restart`是一个复合命令，实际上会执行三个脚本命令：`stop`、`restart`、`start`。具体的执行顺序如下：

```
1. prerestart
2. prestop
3. stop
4. poststop
5. restart
6. prestart
7. start
8. poststart
9. postrestart
```

#### 9. 变量

首先，通过`npm_package_`前缀，npm 脚本可以拿到`package.json`里面的字段。比如，下面是一个`package.json`

```javascript
{
  "name": "foo", 
  "version": "1.2.5",
  "scripts": {
    "view": "node view.js"
  }
}
```

那么，变量`npm_package_name`返回`foo`，变量`npm_package_version`返回`1.2.5`。

```javascript
// view.js
console.log(process.env.npm_package_name); // foo
console.log(process.env.npm_package_version); // 1.2.5
```

上面代码中，我们通过环境变量`process.env`对象，拿到`package.json`的字段值。如果是 Bash 脚本，可以用`$npm_package_name`和`$npm_package_version`取到这两个值。

`npm_package_`前缀也支持嵌套的`package.json`字段。

```javascript
  "repository": {
    "type": "git",
    "url": "xxx"
  },
  scripts: {
    "view": "echo $npm_package_repository_type"
  }
```

上面代码中，`repository`字段的`type`属性，可以通过`npm_package_repository_type`取到。

下面是另外一个例子：

```javascript
"scripts": {
  "install": "foo.js"
}
```

上面代码中，`npm_package_scripts_install`变量的值等于`foo.js`。

然后，npm 脚本还可以通过`npm_config_`前缀，拿到 npm 的配置变量，即`npm config get xxx`命令返回的值。比如，当前模块的发行标签，可以通过`npm_config_tag`取到。

```javascript
"view": "echo $npm_config_tag",
```

注意，`package.json`里面的`config`对象，可以被环境变量覆盖。

```javascript
{ 
  "name" : "foo",
  "config" : { "port" : "8080" },
  "scripts" : { "start" : "node server.js" }
}
```

上面代码中，`npm_package_config_port`变量返回的是`8080`。这个值可以用下面的方法覆盖：

```bash
$ npm config set foo:port 80
```

最后，`env`命令可以列出所有环境变量。

```javascript
"env": "env"
```

#### 10. 常用脚本示例

```javascript
// 删除目录
"clean": "rimraf dist/*",

// 本地搭建一个 HTTP 服务
"serve": "http-server -p 9090 dist/",

// 打开浏览器
"open:dev": "opener http://localhost:9090",

// 实时刷新
 "livereload": "live-reload --port 9091 dist/",

// 构建 HTML 文件
"build:html": "jade index.jade > dist/index.html",

// 只要 CSS 文件有变动，就重新执行构建
"watch:css": "watch 'npm run build:css' assets/styles/",

// 只要 HTML 文件有变动，就重新执行构建
"watch:html": "watch 'npm run build:html' assets/html",

// 部署到 Amazon S3
"deploy:prod": "s3-cli sync ./dist/ s3://example-com/prod-site/",

// 构建 favicon
"build:favicon": "node scripts/favicon.js",
```

