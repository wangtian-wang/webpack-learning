const { modules } = require("./resolve");
const TerserWebpackPlugin = require("terser-webpack-plugin");
modules.exports = {
  optimization: {
    mode: "production",
    splitChunks: {
      chunks: all,
      minSize: 30 * 1024, // 分割的 chunk 大于 30kb 才去分割
      maxSize: 0, // 最大没有限制
      minChunks: 1, // 要分割的 chunk 最少被引用了 1 次
      maxAsyncRequest: 5, //  按需加载的时候,并行加载的文件的最大数量
      maxInitialRequests: 3, // 入口 JS 文件,最大并行请求数量
      name: true, // 可以使用命名规则
      automaticNameDelimiter: "~", // 文件名称连接符
      cacheGroups: {
        /*
          分割 chunk 的组
          node_module 文件会被打包到 vendor 组 的 chunk 中, 文件名为  vendors~xxx.js
          这些打包的文件,必须满足上面配置的公共规则
         */
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true, // 如果当前要打包的模块,和之前已经被提取过的模块是同一个,就会复用这个模块, 不是重新打包
        },
      },
    },
    /*
     before

            index.js                                add.js

            import ('./js/add.js')         const add = {}

          打包后, index.js中, 引入了 add.JS文件 的哈希值
    after                                           change
            index.js                                add.js

            import ('./js/add.js')         const add = {a:123}

            add.js 发生了变化,那么打包的时候,就会重新生成 hash 值, index.JS 里面需要引入这个改变了的 add.JS 的 hash 值, 所以 index.JS 之前的 hash 值也会被改变
            就会导致缓存失效
    解决方案
            将 index.JS 中引入的 其他文件的    hash 单独打包, 当 add.JS 文件发生变化的时候, 只有 add.JS 文件和对应的 runtime 文件发生改变, 入口文件一直不变
     */
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
    minimizer: [
      // 4.20 之后, webpack 压缩 JS 和 css 的插件 在生产环境中使用
      new TerserWebpackPlugin({
        cache: true,
        parallel: true, //  多进程打包
        sourceMap: true,
      }),
    ],
  },
};
