/**
 *   下载的插件 : thread-loader 主要给 babel-loader 使用
 * 进程开启的时间为 600ms, 进程通讯也有开销  适用:  打包的时间消耗比较长,需要多进程打包, JS 代码非常多,效果很明显
 *  优点:
 *
 *  缺点:
 */
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "thread-loader", // 必须放在要优化的 loader 配置之前
            options: {
              workers: 2, // 2 个进程
            },
          },
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: {
                      version: 3,
                    },
                    targets: {
                      chrome: "60",
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
};
