const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  // 生产模式, 自动开启 js 的压缩, 用到的插件是 uglifyJsPlugin
  mode: "production",
  plugin: [
    new HtmlWebpackPlugin({
      //  配置压缩 HTML
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
};
