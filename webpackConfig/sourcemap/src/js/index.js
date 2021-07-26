const fun = require("./functions");

if (module.hot) {
  module.hot.accept("./functions.js", function () {
    // 会监听./function.JS 文件的变化,当这个文件发生变化的时候,其他文件不会打包构建
    // 会执行这个回调函数
  });
}
