#### 解题思路

- 反转两个节点：将n+1的next指向n；
* 反转多个节点：双指针遍历链表，重复上述操作。

```js
var reverseList = function(head) {
    let prev = null;
    let curr = head;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
};
```

但是在控制台调试失败，浪费好多时间，垃圾JS