const { resolve } = require("path");
/**
 oneOf 以下的文件只会匹配一个loader : 防止文件被多个 loader 执行, 但是某个文件需要2 个 loader, 可以写在oneof 外面的 []里面
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
        exclude: /node_module/,
        loader: "eslint-loader",
        //  优先执行
        enforce: "pre",
        options: {
          fix: true,
        },
      },
      {
        oneOf: [
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

          {
            test: /.\(js | css | less | html| png| jpg| jpeg)/,
            loader: "file-loader",
            options: {
              outputPath: "otherFiles",
            },
          },
        ],
      },
    ],
  },
};
