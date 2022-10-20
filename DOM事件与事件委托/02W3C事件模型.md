#### 1. addEventListener

**事件绑定API**

- IE5*：`baba.attachEvent('onclick', fn)` //冒泡

- 网景：`baba.addEventListener('click', fn)` // 捕获
- **W3C**: `baba.addEventListener('click', fn, bool)`

如果bool**不传或为false**，就让fn走冒泡，即当浏览器在**冒泡阶段**发现baba有fn监听函数，就会调用fn，并提供事件信息；

如果bool为**true**，就让fn走捕获，即当浏览器在**捕获阶段**发现baba有fn监听函数，就会调用fn，并提供事件信息；

从这里可以看出，W3C是偏向微软的，默认使用冒泡。

- **捕获永远在冒泡前面，这个过程是固定的。**如果是平级关系，不考虑父子关系，则不分先后，谁先监听谁先执行。
- e对象被传递给所有监听函数，事件结束后，e对象就不存在了

#### 2. target、currentTarget、取消冒泡

##### **target与currentTarget的区别**

- e.target ——用户操作的元素
- e.currentTarget —— 程序员监听的函数
- this是e.currentTarget, 不推荐

举例

- div > span{文字}，用户点击文字
- e.target是span，e.currentTarget是div

##### 取消冒泡

捕获不可取消，但是冒泡可以

- **e.stopPropagation()**可终断冒泡，浏览器不再往上走
- 一般用于封装某些独立的组件

**scroll** event不可取消冒泡（他让不取消，你就别想法子取消）

