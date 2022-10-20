代码见 "02_ts在vscode中自动编译"

### vscode 自动编译

#### 1. 生成配置文件 tsconfig.json

在集成终端键入 `tsc --init` 生成 `tsconfig.json` 文件

#### 2. 修改 tsconfig.json 配置

在 `tsconfig.json` 中

- 添加`"outDir": "./js"  /* 把 ts 文件最终编译后放在 js 的目录中 */`
-  不使用严格模式; `"strict": false,                    /* Enable all strict type-checking options. */`

#### 3. 启动监视任务

终端 -> 运行任务 -> 监视 tsconfig.json