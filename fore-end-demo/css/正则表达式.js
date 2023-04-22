var reg = /\d+/g;  //全局匹配所有数字
var str = "Hello 123 World 456";
var result = str.replace(reg, "-");
console.log(result);
