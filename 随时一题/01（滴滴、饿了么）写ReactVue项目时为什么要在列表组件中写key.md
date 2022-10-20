#### 原理

vue和react都是采用**diff算法**来对比新旧虚拟节点，从而更新节点。在vue的diff函数中，在交叉对比中，但新节点和旧节点**头尾交叉对比**没有结果时，会根据新节点的key去对比旧节点数组中的key，从而找到相应旧节点（这里对应的是一个key => index的map映射）。如果没找到就认为是一个新增节点。而如果没有key，那么就会采用遍历查找的方式去找到对应的旧节点。一种一个map映射，另一种是遍历查找。相比而言，map映射的速度更快。

vue部分源码如下：

```js
// vue项目  src/core/vdom/patch.js  -488行
// 以下是为了阅读性进行格式化后的代码

// oldCh 是一个旧虚拟节点数组
if (isUndef(oldKeyToIdx)) {
  oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
}
if(isDef(newStartVnode.key)) {
  // map 方式获取
  idxInOld = oldKeyToIdx[newStartVnode.key]
} else {
  // 遍历方式获取
  idxInOld = findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
}
```

**创建map函数**

```js
function createKeyToOldIdx (children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}
```

**遍历寻找**

```js
// sameVnode 是对比新旧节点是否相同的函数
 function findIdxInOld (node, oldCh, start, end) {
    for (let i = start; i < end; i++) {
      const c = oldCh[i]
      
      if (isDef(c) && sameVnode(node, c)) return i
    }
  }
```

#### key的作用

key是给每一个vnode的唯一id，可以依靠key，更准确、更快地拿到oldVnode中对应的vnode节点

##### 更准确

**因为带key就不是就地复用了**，在`saneNode`函数`a.key === b.key`对比中可以避免就地复用的情况。所以更加准确。

##### 更快

利用key的唯一性生成map对象来获取对应节点，比遍历方式更快。