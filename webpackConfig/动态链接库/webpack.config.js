const webpack = require("webpack");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: resolve(__dirname, "dist"),
  },
  plugins: [
    // 告诉 webpack 引用刚才生成的动态链接库的文件, 以 manifest.json 文件为规则去找到动态链接库的文件
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, "dll/manifest.json"),
    }),
    // 将单独打包库引入到 HTML 里面,并且输出
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, "dll/jquery"),
    }),
  ],
  mode: "production",
};
