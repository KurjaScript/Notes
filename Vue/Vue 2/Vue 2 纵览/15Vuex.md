### 1. 概述

#### 1.1 组件之间共享数据的方式

父向子传值：`v-bind`事件绑定

子向父传值：`v-on`事件绑定

兄弟组件之间共享数据：`EventBus`

- `$on`接收数据的那个组件
- `$emit`发送数据的那个组件

<font color='green'>如果我们需要大范围、频繁地实现组件之间地数据的共享，以上三种方案就有点力不从心了。</font>于是就引出了Vuex。

#### 1.2 Vuex是什么

Vuex是实现组件全局状态（数据）管理的一种机制，可以方便的实现组件之间数据的共享。

![image-20220104143402038](C:\Users\Kurja\AppData\Roaming\Typora\typora-user-images\image-20220104143402038.png)

<font color='green'>存储在</font>`vuex`<font color='green'>中的数据都是响应式的，能够实现数据与页面的同步。</font>

对于私有数据，存储在组件自身的`data`即可；一般情况下，只有组件之间共享的数据，才有必要`vuex`中。

**注意：Vuex实现的是同一个页面中，各组件的信息通信——SPA单页面。**



### 2. 步骤

- 创造一个vuex实例 `let store = new Vuex.Store({配置项})`

  配置项`state`、`mutations`、`action`、`getters`、`modules`

- 把创造的实例注入到跟组件中

  ```js
  let vm = new Vue({
      el: '#app',
      // 属性名：store是vue规定的(必须用store)
      // 属性名：是创建的vuex实例的名称
      store: store,
  });
  ```

  注入完成之后，每一个组件中都多了一个$store的属性。

  注意：$store中的state中存储的就是我们的数据来源。

### 3. 配置项

#### 3.1 state

- 作用：存放组件之间需要共享的公共状态，即Vuex中的基本数据。

- 使用

  ```js
  state: {
      // 这里存放的都是公用资源
      color: 'red',
      bro1Color: 'blue',
      bro2Color: 'green'
  },
  ```

  **尽量通过`mutations`中的方法来修改这些数据**，不要直接修改。

- 调用：

  `<h1 :style='{color:$store.state.bro1Color}'>这是一个bro1组件</h1>`

  直接使用state在视图中渲染

#### 3.2 mutations

- 作用：**这个属性中存储的都是用来更改state中的数据的同步方法**。

- 使用

  ```js
  mutations：{
      // 函数名自定义的
      // 这里存放的都是用来修改state中的属性的方法
      changeBro1Color(state, option){
          // state就是vuex中的那个state
          // option 是调用这个函数时传递的参数
          state.bro1Color = option;
      }
  }
  ```

  这些方法都至少有一个参数，最多两个。

  第一个参数是vuex默认传的state(数据源)；第二个参数是我们通过commit调用mutations中的对应方法的时候传递的参数。

- 调用：

  `this.$store.commit('changeBro1Color', 'gold')`;

  `this.$store.commit('mutations中的方法名', 传过去的参数)`

- 扩展：

  这里的函数必须都是同步函数，虽然这不是技术规定，这样做主要是为了方便状态可控，修改状态有迹可循。

#### 3.3 getters

- 作用：可以对state中的成员加工后传递给外界，理解为vuex的计算属性即可。

  当多个组件共用一套处理逻辑时，建议使用getters。

- 使用：

  ```js
  getters: {
      nameInfo(state){
          return "姓名" + state.name
      },
  	fullInfo(state, getters){
          return getters.nameInfo + '年龄' + state.age
      }        
  }
  ```

  如果不需要，第二个参数可以省略。

  state：当前Vuex对象中的状态对象；getters：当前getters对象，用于将getters下的其他getter拿来用。

- 调用：`this.$store.getters.fullInfo`

#### 3.4 modules

- 作用：

  使用一个单状态树，导致应用的所有状态集中到一个很大的对象。但是，当应用变大时，store对象会变得臃肿不堪。为了解决这个问题，Vuex允许我们将store分割到模块(module)，每个模块拥有自己的state、mutation、action、getter、甚至嵌套模块——从上到下进行同样方式的分割。

- 使用

  ```js
  const moduleA = {
      state: ()=> ({...}),
      mutations: {...},
      actions: {...},
      getters: {...}
  }
  ```

  ```js
  const moduleB = {
      state: ()=> ({...}),
      mutations: {...},
      actions: {...},
  }
  ```

  ```js
  const store = new Vuex.store({
      modules: {
          a: moduleA,
          b: moduleB
      }
  })
  ```

- 注意：

  - 对于模块内部的`mutation`和`getter`，接收的第一个参数是模块的局部状态对象。

  - 对于模块内部的getter和actions，根节点状态会作为第三个参数暴露出来。

- 命名空间：

  - 默认情况下，模块内部的action、mutation和getter是注册在全局命名空间的，这样使得多个模块能够对同一mutation或action作出响应。

  - 在跟模块下加`namespaced: true`属性，会把当前模块作为一个封闭空间。调用指定模块下的mutations中的方法:

    `this.$store.commit('login/changeCount', 10)`

### 4. 辅助函数

- `...Vuex.mapState(['state中的状态名称'])`，在哪个组件使用，就相当于把state中的属性挪到了那个组件中，一般挪到计算属性中。
- `...Vuex.mapMutation(['mutations中的方法名称'])`，在哪个组件中使用，就相当于把mutations中的方法移到了本组件的methods中。
- `...Vuex.mapActions()`,在哪个组件中使用，就相当于把actions中的方法移到那个组件中。
- `...Vuex.mapGetters()`

**注意：**名字`"[名字]"`不能与组件中的属性名重复，如果本组件中有了这个属性名，我们还想用辅助函数的时候就需要这样命名：`...Vuex.mapState({count123:'count'})`,之后在本组件中使用时，用count123这个名字即可。

