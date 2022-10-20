### flex子元素不换行并且溢出部分用省略号表示

```css
.father {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    //white-space: nowrap; //不换行
    .child {
        width: 120px;
        overflow: hidden;
        text-overflow: ellipsis; //省略号
    }
}
```

