### 1. 前言

在跟着教程搭建好项目之后，你会收获：

- 快速搭建一个文档/博客，后期只需要修改 markdown 内容和导航参数，即可一键打包生成页面。
- 页面具有非常好的加载性能和搜索引擎优化（SEO），其他页面只会在用户浏览到的时候才按需加载。
- 自动生成全局搜索、记录上次修改时间等功能。
- 可嵌入 vue 组件或跳转至其他页面，可定制自己的样式模版便于扩展。
- 一键免费部署到 github.pages，**无需服务器即可拥有自己的在线文档/博客**。

vuepress 是 vue 驱动的静态网站生成器。项目整体以 Markdown 为中心结构，可以让你用最少的配置完成文档/博客写作。但是，vuepress 官方文档对初学者不太友好，里面的主题是什么东西？配置里面为什么没有页面和导航设置？首页和其他页面到底在哪？为什么主题还可以导出？浏览 vuepress 官方文档的最大感受就是**看不懂**。

### 2. 如何制作文档结构？

首先要明确很重要的两个概念：

1. **vuepress 项目的文档结构，都必须按照官方文档的格式进行制作。**比如你想修改整体的主题颜色，你就必须修改 styles 文件夹下的 palette.style。你想在 markdown 中添加 vue 组件，vue 组件必须放在 components 文件夹下，诸如此类。**等到 vuepress 在打包的时候，它会遍历特定的路径和文件名称，读取内容生成页面结构和样式。**
2. 我们这里使用的，都是官方的默认主题。**主题的意思就是页面的样式和结构。**你选择了某一个主题，你的文档内容结构就得根据当前主题进行设置。

接下来开始我们的制作。首先打开 git 客户端，创建一个文件夹，并且进入文件夹。

```bash
mkdir testproject // 创建文件夹，文件夹名字最好为小写
cd testproject  // 进入文件夹
```

然后将 VuePress 安装为本地依赖

我们已经不再推荐全局安装 VuePress

```bash
yarn add -D vuepress # npm install -D vuepress
```

接下来初始化项目，创建 package.json 文件

```bash
npm init -y
```

创建完成后，进入 package.json 文件，在 script 中添加两条命令

```
"script": {
	"dev": "vuepress dev docs", // 用于实时预览
	"build": "vuepress build docs" // 用于打包项目
}
```

接着我们需要创建 vuepress 项目的文件夹和文件，先创建好整体的架构再跟着教程了解里面的内容。

```
// 下面没有文件类型后缀的都是文件夹
// 部分内容并不是必须的，想自己定制的话可以参考官方文档。这里是按照我的思路写的。

├── docs
│   ├── .vuepress  //存放核心内容的文件夹
│   │   ├── components  //存放你需要添加的vue组件
│   │   ├── public  //存放静态文件，如图片等
│   │   ├── styles  //存放需要定制的样式
│   │   │   └── palette.styl  //配置页面主题颜色的文件
│   │   └── config.js   //设定顶部导航栏、侧边导航栏等项目配置的核心文件
│   ├── pages   //存放markdown文件，用于设置其他页面内容
│   ├── README.md   //首页展示用的markdown文件
├── deploy.sh     //之后用于编写上传、发布脚本的文件
└── package.json  //之前创建的Node.js项目描述文件
```

对整体项目结构有一定了解后，我们再了解如何调整每个模块。之后就可以对整个项目得心应手了。[官方的目录结构](https://vuepress.vuejs.org/zh/guide/directory-structure.html) 较为丰富，可自行参照。

### 3. 页面的具体内容如何设置

#### 3.1 修改页面整体设置

首先我们先设定网页与浏览器标签栏相关的一些设置，直接在我们的 `config.js` 文件添加下面的代码。

```ts
module.exports = {
    title: '云柱首页', // 显示在左上角的网页名称以及首页在浏览器标签显示的 title 名称
    description: '云柱的前端记录', // meta 中的描述文字，用于 SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', 
            { rel: 'icon', href: '/cloud_pillar.png'}
            // 浏览器的标签栏的网页图标，第一个 '/' 会遍历 public 文件夹的文件
        ],
    ],
}
```

修改完后，在 `doc/.vuepress/public` 文件夹里面放置我们的 logo 图片。

![](/Users/Kurja/Desktop/Typora/%E5%B7%A5%E5%85%B7%E5%BA%93/VuePress/e6c9d24egy1h4lb5a3hctj20fc07iwek-20220727110959727.jpg)

然后运行 `yarn dev`， 打开 `http://localhost:8080` 会得到如下效果。左上角的图标和页面名称就设置好了：

![](/Users/Kurja/Desktop/Typora/%E5%B7%A5%E5%85%B7%E5%BA%93/VuePress/e6c9d24egy1h4lbaisus9j20lv062wep.jpg)

#### 3.2 设置首页内容

接下来我们来设置首页的内容，按照官网给的格式修改 `README.md` 文件，填写如下内容

```yaml
---
home: true
heroImage: /home_logo.jpeg
heroText: 云柱的前端记录
tagline: 一点一滴都是进步
actionText: 马上进入 →
actionLink: /pages/folder1/test1.md
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
---
```

> herolmage 的地址配置第一个 '/' 默认指向的是 `docs/.vuepress/public`， 你需要在此文件夹放置你的首页图片。
>
> actionLink 地址配置第一个 '/' 默认指向的是 docs/，若路径文件不存在，点击进去会跳转至 404.文件路径之后会详细讲解。

上面每个你都可以对照下面的图片进行查看，都是一一对应的，此时再重新运行 `yarn dev`, 网页如下图所示。

![](/Users/Kurja/Desktop/Typora/%E5%B7%A5%E5%85%B7%E5%BA%93/VuePress/e6c9d24egy1h4lchypf8tj21a10meabv-20220727150553640.jpg)

#### 3.3 修改页面导航栏、侧边导航栏

导航栏修改和侧边栏修改在 `config.js` 文件进行修改，在之前添加的 `module.exports` 里添加如下代码：

```tsx
module.exports = {
  // ...省略部分代码
  
  // 下面涉及到的 md 文件和其他文件的路径下一步再详细解释
  themeConfig: {
    logo: '/home_logo', // 网页顶端导航栏左上角的图标
    
    // 顶部导航栏
    nav: [
    	// 格式一：直接跳转， '/' 为不添加路由，跳转至首页
    	{ text: '首页', link: '/'},
      
      // 格式二：添加下拉菜单，link 指向的文件路径
      {
        text: '分类', // 默认显示
        ariaLabel: '分类', // 用于识别的 label
        item: [
          { text: '文章', link: '/pages/folder1/test1.md'},
          // 点击标签会跳转至 link 的 markdown 文件生成的页面
          { text: '琐碎', link: '/pages/folder1/test4.md'},
        ]
      },
  		{ text: '功能演示', link: '/pages/folder1/test3.md'},
      
      // 格式三：跳转至外部网页，需 http/https 前缀
  		{ text: 'Github', link: 'https://github.com/KurjaScript'},
    ],
    
    // 侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
    sidebar: {
      '/pages/folder1/': [
        {
          title: '测试菜单1', // 一级菜单名称
          collapsable: false, // false 为默认展示菜单，默认值 true 是折叠
          sidebarDepth: 1, // 设置侧边导航自动提取 markdown 文件标题的层级，默认 1 为 h2 层级
          children: [
            ['test1.md', '子菜单1'], // 菜单名称为 '子菜单1'，跳转至 /pages/folder1/test1.md
            ['test3.md', '子菜单2']
          ]
        },
        {
          title: '测试菜单2',
          collapse: false,
          children: [
            ['test2.md', '子菜单1']
          ]
        }
      ],
      
      // ...可添加多个不同的侧边栏，不同页面会根据路径显示不同的侧边栏
    }
  }
}
```

此时我们的网页首页应该是这个样子。其他页面还无法跳转，因为此处点击菜单跳转时，页面对应的 markdown 文件为空，会跳转至 404 页面。而侧边栏则会自动匹配当前页面路径，**若侧边栏数据存在当前页面路径，则显示不出来，路径匹配不到则隐藏侧边栏，这也是它可以不同页面匹配不同的侧边栏的原因**。

![](/Users/Kurja/Desktop/Typora/%E5%B7%A5%E5%85%B7%E5%BA%93/VuePress/e6c9d24egy1h4lhlt7ajzj21a30memz4-20220727162403441.jpg)

### 4. markdown 及其他文件路径解析

到这一步，首页、导航栏和侧边栏都已经实现了，但是点击导航栏跳转页面，都会跳转至 404 页面。我们的链接都是链接到 markdown 文件，在 vuepress 打包后会自动生成页面。若链接对应的 markdown 文件不存在，则会跳转 404。若存在，则跳转解析生成的页面。

![](/Users/Kurja/Desktop/Typora/%E5%B7%A5%E5%85%B7%E5%BA%93/VuePress/e6c9d24egy1h4lkya210hj207i05bt8k.jpg)

还得明确一个概念，vuepress 的文件寻址，**不同类型的文件都已经预设好不同的默认路径。**比如说上一步的 logo 图片引用的路径，就是遍历 `docs/.vuepress/public` 寻找文件，我们只需要把图片放在这个文件夹就可以了。 Markdown 的文件就是按我们写的放在 `docs/pages` 文件夹下，里面每个文件夹名字就是一个子路径。如此类推，每个类型的文件必须放在规定好的位置。

 **文件路径的默认寻址方式**

- 和图标/图片等静态资源相关的，第一个 '/' 默认指向的是 `/docs/.vuepress /public/`
- 侧边栏/导航栏链接的 markdown 文件，第一个 '/' 默认指向的是 `docs/`，我们这里都放置在 `docs/pages` 里
- 嵌入在 markdown 中使用的 vue 组件，放置在 `docs/.vuepress/components`目录中

此时留意一下，我们在上一步设置顶端导航栏和侧边栏的时候，顶端的**分类-文章**，侧边的**测试菜单1-子菜单1**都共同指向 `/pages/folder1/test1.md`，当我们点击其中一个链接时，跳转的页面都是一致的。都是会跳转到 `docs/pages/folder1/test1.md` 文件解析生成的页面中。所有导航栏都会根据当前页面地址，判断当前导航的选中状态。

根据之前设置的导航参数，我们需要在 **pages 文件夹**下创建以下的文件，并在每个 markdown 文件中填写一定的内容，便于测试效果。

![](/Users/Kurja/Desktop/Typora/%E5%B7%A5%E5%85%B7%E5%BA%93/VuePress/e6c9d24egy1h4ln0bu2foj20d80c4t91.jpg)

```md
## markdown 示例内容，可以自己填写别的

#### 1小时搞定vuepress快速制作vue文档/博客+免费部署预览
https://juejin.cn/post/6844903999129436174

#### nginx一健配置
https://nginxconfig.io/

#### lodash按需加载
https://www.jianshu.com/p/f03ff4f3a8b3
```

当我们的 markdown 文件创建好之后，我们导航栏和侧边栏的跳转链接也就有了对应的文件。再点击进入顶端导航栏的**分类-文章**，即可跳转至如下页面：

![](/Users/Kurja/Desktop/Typora/%E5%B7%A5%E5%85%B7%E5%BA%93/VuePress/e6c9d24egy1h4lo4iycijj21a80gy3zq.jpg)

文档梳理完后，我们之后每次只需要修改 `config.js` 文件中的导航栏和侧边栏，确保每个路径对应的位置都存在相对应的文件，我们就可以专注在 markdown 文档的编辑中了。

### 一键部署至 Github Pages

按照[官方部署教程](https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages)，我们需要修改一开始创建的 `deploy.sh` 文件。**该文件的作用是用于批量执行我们的打包、上传至仓库等命令。**而`.sh` 格式是脚本文件。

```bash
# 确保脚本抛出遇到的错误
set -e

# 打包生成静态文件
yarn build

# 进入打包好的文件夹
cd docs/.vuepress/dist

# 创建 git 的本地仓库，提交修改
git init
git add -A
git commit -m "deploy"

# 覆盖式地将本地仓库发布到 Github，因为发布不需要保留历史记录
# 格式为：git push -f git@github.com:'用户名'/'仓库名'.git master
git push -f git@github.com:KurjaScript/KurjaScript.github.io.git master

cd -
```

**注：第一次部署，不明白为什么新建仓库名一定要命名为`KurjaScript.github.io`**

然后修改 `package.json`，在里面添加一条执行脚本文件的命令

```json
"script": {
  ......
  "deploy": "bash deploy.sh"
},
// bash 就是用来执行文件的命令，如果报错显示没有此命令，请安装 git-bash 使用，或改成"satrt deploy.sh"
```

之后每次执行的时候，只需要运行 `yarn deploy`

就可完成打包、上传操作，Github 会为我们自动更新页面代理。一般推送成功后需要等待一两分钟，你再打开 `https://kurjascript.github.io`，就可以看到你的文档/博客页面了。在整个项目的结构结构调整后，只需要编辑一丢丢，即可实现编辑文档+维护，真是很方便呢！

![](/Users/Kurja/Desktop/Typora/%E5%B7%A5%E5%85%B7%E5%BA%93/VuePress/e6c9d24egy1h4mi6t5v0ij21h10q676u.jpg)