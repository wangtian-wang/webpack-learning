const { resolve } = require("path");
/**
 * handle js  base compatibility :
 * babel @babel/core babel-loader babel-preset-env
 *  handle js  all compatibility : 原理: 提前定义好所有的JS 高级方法对应的 ES5 代码,一旦发现浏览器不识别,就将这些方法挂载到原型上面
 *  @babel/polyfill  在 JS 文件中 ;import "@babel/polyfill" 就可以使用了.
 * 问题 : 增大代码体积;
 * 完美的解决方案 : 需要做兼容性处理的,就去做, 按需加载 -----> core-js
 */
module.exports = {
  entry: {
    main: "./js/index.js", // main 表示在这个配置中的文件名,对应的是那个入口文件
  },
  output: {
    filename: "[name].[ext]",
    path: resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: babel - loader,
        options: {
          preset: [
            [
              "@babel/preset-env",
              {
                // 按需加载转译
                useBuiltIns: "usage",
                corejs: {
                  version: 3, // core-js 的版本
                },
                // 指定兼容性做到那个版本
                targets: {
                  chrome: "60",
                  firefox: "60",
                  ie: "9",
                  safari: "10",
                  edge: "12",
                },
              },
            ],
          ],
        },
      },
    ],
  },
};
