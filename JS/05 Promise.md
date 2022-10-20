`Promise` 最大的好处是在异步执行的流程中，把执行代码和处理结果的代码清晰地分离了：

![promise](https://www.liaoxuefeng.com/files/attachments/1027242914217888/l)

`Promise`还可以做更多的事情，比如，有若干个异步任务，需要先做任务1，如果成功后再做任务2，任何任务失败则不再继续并执行错误处理函数。

```js
// 串行执行异步任务
job1.then(job2).then(job3).catch(handleError);
```

其中，`job1`、`job2`和`job3`都是Promise对象。

`Promise`还可以并行执行异步任务，用`Promise.all()`实现，例如：

试想一个页面聊天系统，我们需要从两个不同的URL分别获得用户的个人信息和好友列表，这两个任务是可以并行执行的，

```js
let p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'P1');
})
let p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 600, 'P2')
})
// 同时执行p1和p2，并在他们完成后执行then
Promise.all([p1, p2]).then(function (result) {
    console.log(result); // 'P1'
})
```

由于`p1`执行较快，`Promise`的`then()`将获得结果`'P1'`。`p2`仍在继续执行，但执行结果将被丢弃。

如果我们组合使用Promise，就可以把很多异步任务以并行和串行的方式组合起来执行。