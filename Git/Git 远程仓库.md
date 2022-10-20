#### 1. 创建 ssh key

```bash
ssh-keygen -t rsa -C "kurja0403@gmail.com"
```

或执行下面这行命令

```
ssh-keygen -t rsa -b 4096 -C "kurja0403@gmail.com"
```

一直回车直到看到气泡一样的图案

执行以下命令获取密钥

```bash
cat /c/Users/Kurja/.ssh/id_rsa.pub
```

执行以下命令行与远程仓库建立连接

```js
 ssh -T git@github.com
```



#### 2. 上传代码

```bash
git remote add origin git@github.com:KurjaScript/Typora.git

git push -u origin master


```

