const { module } = require("../eslint/webpack.config");

/**
 * 优势 : 将一个文件分割为多个文件,可以在请求的时候, 1: 进行并行请求, 提升请求速度
 *                                            2: 按需加载 按照路由文件进行分割代码成单独的JS 文件,实现按需加载
 */
// 方法一 : 配置多入口文件
module.exports = {
  // 配置多入口文件
  entry: {
    index: "./src/index.js",
    test: "./src/test.js",
  },
  output: {
    filename: "[name].[ext]",
    path: resolve(__dirname, "build"),
  },
};
// 方法二 : 配置多入口文件
// 配置 webpack 自带的 split-chunk-plugin
module.exports = {
  entry: "./src/index.js",

  output: {
    filename: "[name].[ext]",
    path: resolve(__dirname, "build"), //
  },
  optimization: {
    // splitChunks  可以将 node-modules 中的包单独打包成 chunk文件
    // 自动分析多入口文件中,有无公共代码, 如果有,只会打包一次,不会重复打包.
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          minSize: 0,
          minChunks: 1, // 最少打包成一个
          priority: 10, //  提高优先级
          chunks: "initial",
        },
        common: {
          name: "common",
          test: /[\\/]src[\\/]/,
          chunks: "all", // 同步的和异步的都进行拆分
        },
      },
    },
  },
};
 splitChunks: {
-     chunks: "async",
-     minSize: 30000,
-     maxSize: 0,
-     minChunks: 1,
-     maxAsyncRequests: 5,
-     maxInitialRequests: 3,
-     automaticNameDelimiter: "~",
-     automaticNameMaxLength: 30,
-     name: true,
      cacheGroups: {
+       common: {
+         test: /[\\/]node_modules[\\/]/,
+         name: 'vendors-common',
+         minSize: 0,
+         minChunks: 2, // 最少被2个chunk引用
+         chunks: 'initial',
+         priority: 1 // 优先级，默认是0，可以为负数
+       },
+       other: {
+         test: /[\\/]node_modules[\\/]/,
+         name: 'vendors-other',
+         chunks: 'initial',
+         priority: -10
+       },
-       defaultVendors: {
-         test: /[\\/]node_modules[\\/]/,
-         priority: -10
-       },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }

// 方法三  单入口文件, 让某个文件单独打包成一个文件  方法 : 通过 JS 代码,动态的导入

// 在入口文件中, 通过 import 加载
import(/* webpackChunkName: 'test'*/ "./test.js")
  .then((res) => {
    console.log(res); // res 为整个 es6 module 导出的模块, 需要使用解构的方法,取出想要的结果
  })
  .catch(() => {});
