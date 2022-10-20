### Vite 3.0 开发脚手架 vite 模拟数据的实现

#### 1. 首先安装 mockjs

```bash
npm install mockjs --save-dev
```

#### 2. 安装 vite-plugin-mock

```
npm i vite-plugin-mock cross-env -D
```

#### 3. 在 package.json 中设置环境变量

```json
{
    "scripts": {
        // 修改dev构建脚本的命令
        "dev": "cross-env NODE_ENV=development vite",
        "build": "vite build",
        "serve": "vite preview"
    }
}
```

注：**不修改环境变量也没有问题**，`"dev": "vite",`

#### 4. 在 vite.config.js 中添加 mockjs 插件

```js
import vue from "@vitejs/plugin-vue"
import { viteMockServe } from "vite-plugin-mock"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [
        vue(),
        viteMockServe({
         mockPath: "./src/mock",
      	 supportTs: false     //如果使用 ts发开，则需要配置 supportTs 为 true
        })
    ]
})
```

#### 5. 在项目中根目录创建 mock 文件夹，建立 index.js 在其中创建需要的数据接口

```js
// 仅作示例：通过 GET 请求返回一个名字数组
export default [
    {
        url: "/api/getUsers",
        method: "get",
        response: () => {
            return {
                code: 200,
                message: "云柱爱火柱",
                data: ["云柱", "火柱"],
            }
        }
    }
]
```

#### 6. 在 mock.vue 中请求接口，显示数据

```vue
<template>
  <div v-for="(item,index) in users" :key="item">{{ index + 1 }}-{{ item }}</div>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "axios"
import '../mock/index.js'

export default({
  setup() {
    let users = ref([])
    onMounted(() => {
      axios.get(`/api/getUsers`).then(res => {
        users.value = res.data.data
        console.log('users', users)
      }).catch(err => {
        console.log(err)
      })
    })

    return { users }
  }
})
</script>
```

