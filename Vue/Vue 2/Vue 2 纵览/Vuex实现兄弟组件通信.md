#### Vuex主要包含四类：state、getter、mutations、actions

这四类之间的关系如下：

![img](https://img-blog.csdnimg.cn/20190118092334270.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Rhbmc0MjI2MjI=,size_16,color_FFFFFF,t_70)

- state主要用于管理项目的数据(进行数据初始化)；
- getters用于读取state中的数据，相当于computed，当数据进行更新时读取数据；
- mutations主要用于操作state中的数据，即对state数据进行更改；
- action提交的是mutation，而不是直接变更状态，(dispatch)触发，(参数需要context)