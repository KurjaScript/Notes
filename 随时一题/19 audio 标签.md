## HTML5 之 Audio 标签

### 1. 标签属性

- `autoplay`：音频会尽快自动播放，不会等待整个音频下载完成；
- `controls`：浏览器提供包括声音、播放进度、播放暂停的控制面板（不同浏览器不一致），用户可以控制音频播放；
- `loop`：循环播放音频；
- `muted`：是否静音，默认值为 false，表示有声音；
- `preload`：
- 预加载，包括 `auto` 、 `metadata` 和 `none` 三个参数值，`auto` 表示加载音频，`metadata` 表示不加载音频，但是需要获取音频元数据（如音频长度），`none` 表示不加载音频。若指定为空字符串，则等效于 `auto`。注意 `autoplay` 属性优先级高于 `preload`，若 `autoplay` 被指定，则会忽略此属性，浏览器将加载音频以供播放；
- `src`：嵌入音频 url



### 2. 设置多个音频资源

不同浏览器支持的音频播放格式有所不同，一般为了兼容效果，会放置多种音频格式，浏览器会自上而下选择符合的音频格式。

```js
<audio controls>
  <source src="music.ogg" type="audio/ogg" />
  <source src="music.mp3" type="audio/mpeg" />
  <source src="music.wav" type="audio/Wav" />
  当前浏览器不支持audio标签
</audio>
```



### 3. 元素属性

#### 3.1 只读

- `duration`：双进度浮点数，音频的播放时长，以秒为单位。若音频不可用或者音频未加载，则返回 NaN；
- `pause`：若音频被暂停或者未开始播放，则返回 `true`；
- `ended`：音频是否播放完毕，播放完毕则返回 `true` ；
- `error`：发生错误情况下的`MediaError`对象 ；
- `currentSrc`：返回正在播放或加载的音频的`URL`地址，对应于浏览器在`source`元素中选择的文件；
- `seeking`：用户是否在音频中移动或者跳跃到新的播放点

```js
<audio preload="auto" src="music.mp3" onseeking="fn()" controls />
<script>
  var audio = document.querySelector('audio')

  function fn() {
    console.log(audio.seeking)
  }
</script>
```

#### 3.2 可读写

- `autoplay`：设置音频自动播放，或者查询音频是否设置 `autoplay`；
- `loop`：设置或者查询音频是否循环播放；
- `currentTime`：返回音频当前的播放时间点、双精度浮点数，单位为秒。音频未播放，可用于设置音频开始播放的时间点；
- `controls`：显示或隐藏音频控制面板，或者查询控制面板是否可见；
- `volume`：返回音量值，介于 `0-1` 之间的双进度浮点数，或者设置音量值；
- `muted`：设置或查询是否静音；
- `playbackRate`：设置或者查询音频的播放速度，`1` 表示正常速度，大于 `1` 表示快进，`0-1` 表示慢进，`0` 表示暂停（控制面板仍然播放，仅仅是速度为 `0`)

#### 3.3 特殊属性

##### 3.3.1 played

表示用户已经播放的音频范围，返回 `TimeRanges` 对象，其中 `TimeRanges` 对象包括一个 `length` 属性和 `start()`、`end()` 两个方法。

- `length`：获取音频范围的数量，未开始播放为 `0` ，开始播放后至少为 `1`；
- `start(index)`：获取某个音频范围的开始位置；
- `end(index)`：获取某个音频范围的结束位置。

若用户在音频中移动或者跳跃播放点，则会获得多个音频范围。

如下为一段音频，用户跳跃播放了两次，因此 `play.length` 为 `3`，其中三段音频范围分别为开始播放、第一个跳跃点、第二个跳跃点的播放范围。

![在这里插入图片描述](/Users/Kurja/Desktop/Typora/%E9%9A%8F%E6%97%B6%E4%B8%80%E9%A2%98/0efed884e80e40cdb83996d7632b709a~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

上述部分代码如下：

```html
<template>
  <div class="container">
    <audio class="music" src="audio/Mr_Rattlebone.mp3" controls>因为</audio>
    <button id="btn">console.log</button>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
onMounted(() => {
  let btn = document.querySelector("#btn");
  let audio = document.querySelector("audio");
  console.log(audio);
  console.log(btn);
  btn?.addEventListener("click", () => {
    debugger;
    const length = audio?.played.length || 1;
    console.log(`length: ${length}`);
    for (var i = 0; i < length; i++) {
      let start = audio?.played.start(i) || 0;
      let end = audio?.played.end(i) || 0;

      console.log(
        `index: ${i}, start: ${start}, end: ${end}, durations: ${end - start}s`
      );
    }
  });
});
</script>
<style scoped lang="less">
.container {
  audio {
    border: 1px solid red;
  }
  #id {
    width: 20px;
  }
}
</style>
```

##### 3.3.2 buffered

表示浏览器已经缓存的音频范围，返回 `TimeRanges` 对象，若音频已完全加载则 `buffered.length` 为 `1`， `buffered.start(0)` 为 `0`，即第一个缓存开始的区域，`buffered.end(0)` 为音频时长，即第一个缓存结束的区域。[详见 MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/buffered)

##### 3.3.3 seekable

表示用户可跳转或移动的音频范围，返回 `TimeRanges` 对象，若音频已完全加载则 `seekable.length` 为`1`，`seekable.start(0)` 为 `0` ，`seekable.end(0)`为音频时长。音频未加载或者加载错误，则`seakable.length`为`0`，对应的`start(0)`和`end(0)`也就不存在，[详细参考](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Fseekable)。

##### 3.3.4 networkState

获取音频的网络范围，[详细参考](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2FnetworkState)。

- `0`：`NETWORK_EMPTY`，音频尚未初始化
- `1`：`NETWORK_IDLE`，浏览器已选择好采用什么编码格式来播放媒体，但尚未建立网络连接
- `2`：`NETWORK_LOADING`，浏览器正在加载
- `3`：`NETWORK_NO_SOURCE`，未找到音频资源

##### 3.3.5 error

通常正常加载音频，则返回`null`，若加载过程中发生错误，浏览器将会返回`MediaError`对象。`MediaError`对象包括`code`和`message`属性，`message`为错误描述信息，`code`为如下错误码。

- `1`：`MEDIA_ERR_ABORTED`，音频加载加载过程中由于用户操作而被终止
- `2`：`MEDIA_ERR_NETWORK`，确认音频资源可用，但是加载时出现网路错误，音频加载被终止
- `3`：`MEDIA_ERR_DECODE`，确认音频资源可用，但是解码发生错误
- `4`：`MEDIA_ERR_SRC_NOT_SUPPORTED`，音频格式不被支持或者资源不可用



### 4. 方法

#### 4.1 play

播放音频，返回 `Promise`，播放成功时为 resolve，因为任何原因播放失败为 `reject`，[详见参考](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/play)

```ts
let audio = document.querySelector('audio')
audio.play()
  .then(() => { })
  .catch(() => { })
```

参考一个范例：视频的播放由 [`async`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) `playVideo()` 函数控制。函数尝试播放视频，如果播放成功，将 `playButton` 元素的类名称设为 `"playing"`。如果播放失败，去除 `playButton` 元素的类名称，恢复其原来的样式。通过监视 `play()` 返回的 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 是被解决还是被拒绝以保证播放按钮的外观与实际的播放状态相匹配。

```ts
let videoElem = document.getElementById("video")
let playButton = document.getElementById("playbutton")

playButton.addEventListener("click", handlePlayButton, false)
playVideo()

async playVideo = () => {
  try {
    await videoElem.play()
    playButton.classList.add("playing")
  } catch (err) {
    playButton.classList.remove("playing")
  }
}
const handlePlayButton = () => {
  if (videoElem.paused) {
    playVideo()
  } else {
    videoElem.paused()
    playButton.classList.remove("playing")
  }
}
```

#### 4.2 pause

暂停音频，无返回值，[详细参考](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Fpause)。

```ts
var audio = document.querySelector('audio')

audio.pause()
```

#### 4.3 load

重新加载 `src` 指定的资源，[详细参考](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Fload)。

```ts
let audio = document.querySelector('audio')

audio.src = 'music.mp3'
audio.load()
```



### 5. 事件

#### 5.1 常用事件

- [loadstart](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Floadstart_event): 开始载入音频时触发；
- [durationchange](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Fdurationchange_event)：`duration` 属性更新时出发；

- [loadedmetadata](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Floadedmetadata_event)：音频元数据加载完成时触发;
- [loadeddata](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Floadeddata_event)：音频的第一帧加载完成时触发，此时整个音频还未加载完;
- [progress](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Fprogress_event)：音频正在加载时触发;
- [canplay](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Fcanplay_event)：浏览器能够开始播放音频时触发;
- [canplaythrough](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Fcanplaythrough_event)：浏览器预计在不停下来进行缓冲的情况下，能够持续播放指定的音频时会触发.

#### 5.2 其他事件

- [abort](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Fabort_event)：音频终止时触发，非错误导致；
- [emptied](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Femptied_event)：音频加载后又被清空，如加载后又调用 load 重新加载；

- [ended](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Fended_event)：播放结束，若设置 `loop` 属性，音频播放结束后不会触发；
- [error](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Ferror_event)：发生错误；
- [play](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Fplay_event)：播放事件，第一次播放、暂停后播放会触发；

- [playing](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Fplaying_event)：播放事件，第一次播放、暂停后播放、播放结束后循环播放会触发；
- [pause](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Fpause_event)：暂停事件；
- [ratechange](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Fratechange_event)：播放速率改变；
- [seeking](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Fratechange_event)：播放点改变开始；
- [seeked](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Fratechange_event)：播放点改变结束；
- [stalled](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Fstalled_event)：浏览器尝试获取音频，但是音频不可用时触发；
- [suspend](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Fsuspend_event)：音频加载暂停时触发；
- [timeupdate](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Ftimeupdate_event)：音频`currentTime`改变时触发；
- [volumechange](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Fvolumechange_event)：音量改变时触发，包括静音；
- [waiting](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FHTMLMediaElement%2Fwaiting_event)：开始播放前缓冲下一帧时触发



### 6. 在 JS 中调用的 audio 属性

`<audio>` 元素还有一些属性只能通过 JavaScript 设置，假如有 HTML 如下：

```html
<audio id="myAudio" src="audiofile.mp3"></audio>
```

则：

#### 6.1 currentTime

`currentTime` 是一个可读兼可写的属性，用来设置或获取当前已经播放的时长，单位是秒。

例如：

```ts
// 获取音频已经播放时长
let playedTime = myAudio.currentTime
```

如果音频尚未开始播放，则 `playedTime` 的返回值是 `0` 。

我们也可以通过设置 `currentTime` 属性值，让我们的音频定位到我们希望的时间进行播放，例如。从 5 秒开始播放，则：

```
// 跳到 5 秒那里
myAudio.currentTime = 5
```

#### 6.2 volume

`volume` 也是一个可读兼可写的属性，用来设置或获取音频的音量大小，范围是 0-1。

例如，设置音量50%，则：

```ts
// 设置音量 50% 
myAudio.volume = 0.5
```

如果音频文件设置了 `muted` 为 `true`，则 `myAudio.volume` 的返回值是 `0`。

#### 6.3 playbackRate

`playbackRate` 是一个可读兼可写的属性，用来设置或获取当前媒体文件的播放速率，值为数值，例如：

```ts
// 获得音频播放速率
let audioSpeed = audio.playbackRate
// 设置音频播放速率为正常速度的 1.5 倍
audio.playbackRate = 1.5
```

**速率范围**

根据[文档](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playbackRate)显示，Gecko内核浏览器速率范围是0.25到5.0，超出这个范围就静音。

对于Chrome浏览器，我自己实地测试了下，速率上限居然可以到`16`，如下图：

![](/Users/Kurja/Desktop/Typora/%E9%9A%8F%E6%97%B6%E4%B8%80%E9%A2%98/e6c9d24egy1h5sg8232n1j20e2062t8y.jpg)

然后，此属性兼容性不错，IE9+都支持。

#### 6.4 paused

`paused` 是一个只读属性，表示当前音频处于暂停状态

```ts
// true或false
console.log(myAudio.paused)
```

未播放或者播放暂停都会返回 `true`。























