### 1. 作用 

可以监测数据的改变

### 2. 语法

`Object.defineProperty(obj, prop, descriptor)`

其中，obj为要定义属性的对象；prop为定义或修改的属性名称；descriptor为要定义或要修改的属性描述符(是一个对象)

### 3. 属性描述符

#### 3.1数据描述符

是一个具有值的属性，该值可以是可写的，也可以是不可写的。

#### 3.2 存取描述符

是由getter函数和setter函数所描述的属性

#### 3.3 注意

**一个描述符只能是这两者之一**，不能同时都是。这两种描述符都是对象。

### 4. 属性描述符-共享键值对

默认值是指在使用`Object.defineProperty()`定义属性时的默认值。

#### 4.1 enumerable

- enumerable定义了对象的属性是否可以在`for...in`循环和`Object.keys()`中被枚举。

- 默认值——false，当且仅当该属性的enumerable键值为true时，该属性才会出现在对象的枚举属性中。

#### 4.2 configurable

- 默认值——false;
- 当且仅当该属性的configurable的键值为true时，该属性的描述符才能够改变，同时该属性也能从对应的对象上被删除。

### 5. 数据描述符可选键值

#### 5.1 value

- 默认值——undefined；
- 该属性对应的值可以是任何有效的JavaScript值(数值，对象，函数等)

#### 5.2 writable

- 默认值——false
- 当且仅当该属性的writable键值为true时，属性的值，也就是上面的value，才能被赋值运算符改变。

### 6. 存取描述符可选键值

#### 6.1 get

- 默认值——undefined
- 属性的getter函数，如果没有getter，则为undefined
- 当访问该属性时，会调用此函数，执行时不传入任何参数，但是会传入this对象。由于继承关系，这里的this并不一定是定义该属性的对象。该函数的返回值会被用作属性的值。

#### 6.2 set

- 默认值——undefined；
- 熟悉的setter函数，如果没有setter，则为undefined
- 当属性被修改时，会调用此函数。该方法接收一个参数，也就是被赋予的新值，会传入赋值时的this对象。