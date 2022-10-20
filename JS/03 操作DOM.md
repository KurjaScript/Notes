### 1. querySelector() 和 querySelectorAll()

```js
// 通过querySelector获取ID为ql的节点
let ql = document.querySelector('#ql');

// 通过querySelectorAll获取ql节点内的符合条件的所有节点
let ps = ql.querySelectorAll('div.highlighted > p')
```

这里的DOM节点指`Element`，但是DOM节点实际上是`Node`，在HTML中，`Node`包括`Element`、`Comment`、`CDATA_SECTION`等多种，以及根节点`Document`类型，但是，绝大多数的时候我们只关心`Element`。

根节点`Document`已经自动绑定为全局变量`document`。

**练习**

```html
<!-- HTML结构 -->
<div id="test-div">
  <div class="c-red">
    <p id="test-p">JavaScript</p>
    <p>Java</p>
  </div>
  <div class="c-red c-green">
    <p>Python</p>
    <p>Ruby</p>
    <p>Swift</p>
  </div>
  <div class="c-green">
    <p>Scheme</p>
    <p>Haskell</p>
  </div>
</div>
```

根据条件选择指定的节点

```js
// 选择<p>JavaScript<p>
let js = document.querySelector('#test-p')

// 选择<p>Python</p>,<p>Ruby</p>,<p>Swift</p>
let arr = document.queryselectorAll('.c-red.c-green p') // .c-red.c-green没有空格

// 选择<p>Haskell</p>
let haskell = document.querySelector('#test-div div:last-Child p:last-child') //冒号之后没有空格
```

### 2. 更新DOM



