目前我使用 Vue 3 + JS + element-plus 开发, 由于 element-plus 使用的是 TS 语法, 一些组件的引用只适用于 TS, 这时只得借助 element-ui。

在写表单校验的时候，我照搬了 element 的代码，出现无法将信息键入表单的问题：

```vue
<el-form :model="ruleForm" :rule="rules" ref="ruleForm" label-width="100px", class="demo-ruleForm">
    ......
</el-form>
```

我删除了 `ref=ruleForm` 才解决了这个 bug, 或者给 ref 换一个名字也能正常运行。

