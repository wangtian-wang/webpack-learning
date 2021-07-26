const { module } = require("../webpack.config");

/** 持久化缓存 */
/**
 * 每个打包好的资源有一个唯一的 hash 值
 * 只有被修改文件的文件的 hash 才会发生变化
 *
 *
 *
 *
 * 问题 : js文件的 hash 值和 css 的 hash 值相同的话,改变 JS 的 hash 值,会影响 css 的重新加载吗?
 * webpack 打包是将 css 文件打包到 JS 文件中的,所以使用的是相同的 hash 值, JS 的 hash 值变化,会使 css 的hash 值发生变化
 */

module.exports = {
  output: {
    filename: "[name].[content:8].bundle.js", // 没有按需加载的文件的命名规则
    chunkFilename: "[id].[contenthash:8].bundle.js", //  被拆分出来的代码的命名规则
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[content:8].css",
      chunkFilename: "[id].[contenthash:8].css",
    }),
  ],
};
