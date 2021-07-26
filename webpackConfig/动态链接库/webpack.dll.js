/**
 * 动态链接库: 将各种包单独的打包成文件 适用于自己整合第三方包
 * 单独打包的库,必须使用单独的打包命令打包, 之后才会生成 manifest.json 文件单独运行修改运行命令:
 * webpack --config webpack.dll.js
 * 解决的问题:第三方的库,单独打包之后,就不用再重新打包,节省了打包时间,避免反复打包
 */
const webpack = require("webpack");
module.exports = {
  entry: {
    jquery /**(最终打包生成的包名) */: ["jQuery (那些包需要打包)"],
    react: ["react", "react-dom"], // 需要将 react 中这些类打包
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "dll"),
    library: "[name]_[hash]", // 打包的库向外暴露出去的内容叫啥名字
  },
  plugins: [
    // 打包生成一个 manifest.json 文件 ,提供和 jquery 的映射, 告诉 webpack 这个 jquery 包不需要打包,这个包名在前面已经定义过了
    //
    new webpack.DllPlugin({
      name: "[name]_[hash]", // 映射库的暴露名称,
      path: resolve(__dirname, "dll/[name]manifest.json"), // 1: 输出的描述动态链接库的内容的文件的路劲 2: 在 package.json 里面配置生成描述文件的脚本
    }),
  ],
  mode: "production",
};
