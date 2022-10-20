```html
<p class="under">This text has a line underneath it.</p>
<p class="over">This text has a line over it.</p>
<p class="line">This text has a line going through it.</p>
<p>This <a class="plain" href="#">link will not be underlined</a>,
    as links generally are by default. Be careful when removing
    the text decoration on anchors since users often depend on
    the underline to denote hyperlinks.</p>
<p class="underover">This text has lines above <em>and</em> below it.</p>
<p class="blink">This text might blink for you,
    depending on the browser you use.</p>
```

```css
.under {
  text-decoration: underline red;
}

.over {
  text-decoration: wavy overline lime;
}

.line {
  text-decoration: line-through;
}

.plain {
  text-decoration: none;
}

.underover {
  text-decoration: dashed underline overline;
}

.blink {
  text-decoration: blink;
}
```

![text- decoration](https://tva1.sinaimg.cn/large/e6c9d24egy1h2id4lx6sdj214c0e6wgo.jpg)
