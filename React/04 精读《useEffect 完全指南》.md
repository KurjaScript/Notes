## 精读《useEffect 完全指南》

### 1. 引言

首先附上[useEffect 完全指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/) 链接。

Hooks API 无论从简洁程度，还是使用深度角度来看，都大大优于之前生命周期的 API，所以必须反复理解，反复实践，否则只能停留在表面原地踏步。

相比 `useState` 或者自定义 Hooks 而言，最有理解难度的是 `useEffect` 这个工具，希望借着  [a-complete-guide-to-useeffect](https://link.juejin.cn/?target=https%3A%2F%2Foverreacted.io%2Fa-complete-guide-to-useeffect%2F) 一文，深入理解 `useEffect` 。

> 原文非常长，所以概述是精简后的。作者是 [Dan Abramov](https://link.juejin.cn/?target=https%3A%2F%2Fmobile.twitter.com%2Fdan_abramov)，React 核心开发者。

### 2. 概述

**unLearning**，也就是学会忘记。**你之前的学习经验会阻碍你进一步学习。**

想要理解好 `useEffect` 就必须深入理解 Function Component 的渲染机制，Function Component 与 Class Component 功能上的不同在上一期 [精读《Function VS Class 组件》](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fdt-fe%2Fweekly%2Fblob%2Fmaster%2F95.%E7%B2%BE%E8%AF%BB%E3%80%8AFunction%20VS%20Class%20%E7%BB%84%E4%BB%B6%E3%80%8B.md) 已经介绍，而他们还存在思维上的不同：

**Function Component 是更彻底的状态驱动抽象，甚至没有 Class Component 生命周期的概念，只有一个状态，而 React 负责同步到 DOM。**这是理解 Function Component 以及 `useEffect` 的关键，后面还会详细介绍。