### 1. 脚手架

- 根据业务需求或者功能需求，把需要配置的`webpack`以及一些每一次都要做的事情进行封装，以后根据脚手架安装，就可以很快把这些东西处理好。
- 脚手架一般都是基于命令操作的。研发脚手架需要把`Node`学好/npm包管理学好。
- `vue-cli`就是一个脚手架。

### 2. Vue 工程化

- 项目中需要基于工程化开发来管理vue项目。
- `<template></template> => _vNode 把template语法基于vue-template-loader`解析成虚拟DOM。
- 基于`vue-cli`打造vue工程化

### 3. vue-cli

- 官网：https://cli.vuejs.org/zh/guide

- 定义：Vue CLI是一个基于Vue.js进行快速开发的完整系统；

- 安装：`$npm install @vue/cli -g`全局安装

  mac 全局安装必须在前面加`sudo`

  `$vue --version`查看当前版本号

  `$npm root -g`查看全局安装目录

- 创建项目(待完善)

### 4. 文件目录(待完善)

### 5. 配置完成预览页面

- 执行命令 `$npm run serve`

- 成功展示

  ![image-20220225213045329](C:\Users\Kurja\AppData\Roaming\Typora\typora-user-images\image-20220225213045329.png)

- 运行不成功可能是因为丢包，重新跑下环境或许就好了。
