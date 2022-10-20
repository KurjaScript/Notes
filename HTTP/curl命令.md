#### 1. 用curl命令可以发送http请求

```bash
curl -v http://baidu.com

curl -s -v --https://www.baidu.com
```

![image-20220117090236743](C:\Users\GunKing\AppData\Roaming\Typora\typora-user-images\image-20220117090236743.png)

#### 2. 理解以下概念

- url会被curl工具重写，先请求DNS获取IP
- 先进行TCP连接，TCP连接成功后，开始发送HTTP请求
- 请求内容看一眼
- 响应内容看一眼
- 响应结束后，关闭TCP连接（看不出来）
- 真正结束

#### 3. HTTP

规定请求的格式是什么，响应的格式是什么