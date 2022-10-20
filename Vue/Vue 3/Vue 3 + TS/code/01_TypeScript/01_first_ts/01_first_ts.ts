(() => {
    // str 这个参数是 string 类型的
    function sayHi(str: string) {
        return '我爱你，' + str
    }
    let text = '云柱'
    console.log(sayHi(text))
})()