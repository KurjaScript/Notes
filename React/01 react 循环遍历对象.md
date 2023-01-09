## React 技巧之循环遍历对象

### 1. 遍历对象的键

在 React 中循环遍历对象：

1. 使用 `Object.keys()` 方法得到对象的键组成的数组；
2. 使用 `map()` 方法来迭代键组成的数组。

```jsx
export default function App() {
  const employee = {
    id: 1,
    name: 'Bob',
    salary: 123,
  }
  return (
  	<div>
     {/* interate object KEYS */}
      {Object.keys(employee).map((key, index) => {
        return (
          <div key={index}>
          	<h2>
            	{key}: {employee[key]}
            </h2>
            <hr />
          </div>
        );
      })}
      <br />
      <br />
      <br />
      {/* iterate object VALUES */}
      {Object.values(employee).map((value, index) => {
        return (
        	<div key={index}>
            <h2>{value}</h2>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
```

我们使用 `Object.keys` 方法得到对象的键组成的数组。

```jsx
const employee = {
  id: 1,
  name: 'Bob',
  salary: 123,
}

// ['id', 'name', 'salary']
console.log(Object.keys(employee))

// [1, 'Bob', 123]
console.log(Object.values(employee))
```

我们只可以在数组上调用 `map()` 方法。所以我们需要得到对象的键组成的数组，或者值组成的数组。

我们传递给 `Array.map` 方法的函数被调用，其中包含数组中的每个元素和当前迭代的索引。在上面的例子中，我们使用 `index` 作为元素上的 `key` 属性，如果可以的话，更好的方式是使用更加稳定的、独一无二的标识符。

当遍历对象的键时，使用对象的键作为 `key` 属性是安全可靠的，因为对象中的键保证是唯一的

```jsx
export default function App() {
  const employee = {
    id: 1,
    name: 'Bob',
    salary: 123,
  };
  
  return (
  	<div>
    {/* interate object KEYS */}
      Object.keys(employee).map(key => {
        return (
          <div key={key}>
            <h2>
              {key}: {employee[key]}
            </h2>

            <hr />
          </div>
        )
      })
    </div>
  );
}
```

然而，如果遍历对象的值，那么使用对象的值作为 `key` 属性是不安全的，除非你可以确保所有值在对象中都是独一无二的。

由于性能的原因，React 需要在内部使用 `key` 属性。这有助于库确保只重新渲染已经改变的数组元素。说到这里，你不会看到使用索引和一个稳定、唯一的标识符之间有任何明显的区别，除非你要处理成千上万的数组元素。

