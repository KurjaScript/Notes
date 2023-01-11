## 精读《useEffect 完全指南》

### 1. 引言

首先附上[useEffect 完全指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/) 链接。

Hooks API 无论从简洁程度，还是使用深度角度来看，都大大优于之前生命周期的 API，所以必须反复理解，反复实践，否则只能停留在表面原地踏步。

相比 `useState` 或者自定义 Hooks 而言，最有理解难度的是 `useEffect` 这个工具，希望借着  [a-complete-guide-to-useeffect](https://link.juejin.cn/?target=https%3A%2F%2Foverreacted.io%2Fa-complete-guide-to-useeffect%2F) 一文，深入理解 `useEffect` 。

> 原文非常长，所以概述是精简后的。作者是 [Dan Abramov](https://link.juejin.cn/?target=https%3A%2F%2Fmobile.twitter.com%2Fdan_abramov)，React 核心开发者。