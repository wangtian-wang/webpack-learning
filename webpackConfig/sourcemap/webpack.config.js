/*
 webpack devServer  可以实现自动打包文件,自动刷新文件, 但是一个文件的某块地方变化了之后, 所有的文件都会发生变化, 性能高
    开启了热更新之后, 只有
     css 文件,可以使用 HMR 功能, 因为 style-loader 内部实现了这个功能;
      JS 文件, 默认不能使用 HMR 功能, ----> 需要在 非入口文件的  JS 文件里面添加代码
      HTML 文件, 因为只有一个,所以不能支持 HMR 功能, 同时会产生问题, HTML 文件不能热更新了,
      解决: 修改 entry 入口,将 HTML 文件引入

*/
/**
 * source-map 打包之后, 通过映射可以追踪源码的错误
 * 模式:  内联: 打包速度快,不单独生成文件
 *            eval-source-map 每个 JS 文件都生成一个 source-map  错误代码的准确信息,和源代码的错误的位置
 *            inline-source-map 只生成一个内联的 source-map  错误代码的准确信息,和源代码的错误的位置
 *
 *       外联 : 单独生成文件
 *            source-map    错误代码的准确信息,和源代码的错误的位置
 *            hidden-source-map    提示错误代码的错误原因但是没有错误位置, 只能提供错误代码在构建后的代码中的位置
 *            cheap-source-map    提示错误,只能精确到行
 *            cheap-module-source-map  错误代码的准确信息,和源代码的错误的位置   (会将 loader 的 source-map 加入)
 *            nosources-source-map    错误代码的准确错误,但是没有任何的源代码信息
 *
 *  开发环境: 追求的是快和友好 : eval-source-map > eval-cheap-module-source-map
 *          速度快: eval-cheap-source-map
 *          提示更加友好: source-map
 *  生产环境: 源代码隐藏    source-map
 */

module.exports = {
  entry: ["./src/js/index.js", "./src/index.html"],
  devServer: {
    contentBase: resolve("__dirname", "build"),
    hot: true,
    open: true,
    port: 3000,
  },
  devtool: "source-map",
};
