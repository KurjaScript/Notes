在jQuery里面有一个很典型的例子能说明_this的作用

```js
$("#btn").click(function(){
	let that = this; //这里this和that都代表了"#btn"这个对象
    $("#tr").each(function(){
        this; //这里this代表的是每个遍历到的".tr"对象
        that; //仍代表"#btn"对象
    })
})
```

这种情况就是在一个代码片段里this有可能代表不同的对象，而编码者希望_this代表最初的对象

```js
let that = this;
    let ajax = new XMLHttpRequest();
    ajax.open('get', 'http://127.0.0.1:24010/ZKIDROnline/ScanReadIdCardInfo?OP-DEV=1&CMD-URL=4');
    ajax.send();
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status === 200){
            /*eslint-disable no-eval*/ // 这个注释必须要
            let data = eval("(" + ajax.responseText + ")");
            let res = data.Certificate;
            if (res) {
                that.setState({
                    value: res
                })
            }
        }
    }
```

