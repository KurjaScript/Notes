### 1. 指令v-on

用来实现事件绑定中的指令，原理是DOM 2级事件绑定。`v-on:`简写为`@`

### 2. 使用

#### 2.1 语法

`v-on: 事件类型 = '函数'`

或`@事件类型 = '函数'`

#### 2.2 注意

例如，`@click = 'fn'`,绑定的函数，从是否传参、是否需要事件源，可分为下面几种情况：

- `fn`不需要传递实参时，小括号可以省略；
- `fn(a, b)`,需要传递实参时，注意形参和实参个数相对应；
- `fn($event, a, b)`,实参中$event位置不限，无论在第几个都代表事件对象。需要使用事件对象的时候，**用`$event`接收事件对象，且只能使用其接收**。

### 3. 常规修饰符

`@xxx.prevent = '函数名'`，阻止默认行为，相当于原生：`preventDefault`；

`@xxx.stop = '函数名'`，阻止冒泡传播，相当于原生: `stopPropergation`;

`@xxx.once = '函数名'`，当前函数只会执行一次；

`@xxx.self = '函数名'`，只有点击元素本身才会触发这个函数；

`@xxx.capture = '函数名'`，控制函数在捕获阶段执行，相当于原生：`ele.addEventListener('click', 函数名, {capture: false})`

`xxx.passive = '函数名'`，先执行默认，后执行函数。`ele.addEventListener('click',函数名, {capture: false, passive: true})`,`passive: true`优先执行默认。

注意：

- 修饰符可以串联，例如`<a @click.stop.prevent = 'doThat'></a>`

- 修饰符的顺序很重要，例如`@click.prevent.self`会阻止所有点击，而`@click.self.prevent`只会阻止元素自身的点击。

### 4. 按键修饰符

使用：`@keydown.按键(或键盘码) = '函数名'`

支持以下按键、及其对应的键盘码`@keydown.按键 = '函数'`操作

`.enter`、`.tab`、`.delete(捕获"删除"和"退格"键)`、`.esc`、`.space`、`.up`、`.down`、`.left`、`.right`