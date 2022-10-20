```bash
npm install mockjs --save-dev
npm i vite-plugin-mock cross-env -D
```

之后要在vite.config.js 中添加 mockjs 插件

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

