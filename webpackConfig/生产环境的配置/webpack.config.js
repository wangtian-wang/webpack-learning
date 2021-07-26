const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiNiCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

/**
 *  browserList : 默认使用的是生产环境, 配置 loader 的时候需要设置成开发环境
 */

process.env.NODE_ENV = "development";

// 复用 loader
const commonLoader = [
  MiNiCssExtractPlugin.loader,
  "css-loader",
  {
    // 需要定义那个环境的浏览器版本, 在 package.json 中 browserList
    loader: "postcss-loader",
    options: {
      ident: "postcss",
      plugins: () => {
        require("postcss-preset-env");
      },
    },
  },
];
module.exports = {
  mode: "production",
  entry: "./src/index.js",

  output: {
    filename: "[hash:8].[ext]",
    path: resolve(__dirname, "dist"),
  },
  module: {
    /** 被忽略的库不能有 import require define 的模块化的方式 */
    noParse: /lodash/,
    rules: [
      {
        test: /\.css$/,
        use: [...commonLoader],
      },
      {
        test: /\.less$/,
        use: [...commonLoader, "less-loader"],
      },
      {
        test: /.\(png | jpg| gif)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          name: "[hash:10].[ext]",
          outputPath: "imgs",
          esModule: false,
        },
      },
      // 处理 HTML 中的图片问题 关闭 esModule
      {
        test: /.html$/,
        loader: "html-loader",
      },
      /**
       *  通常来说,一个文件只能被一个 loader 执行, 当被多个 loader 执行的时候,需要注意先后顺序,
       * 先执行eslint, 再执行 coreJS
       */
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
        test: /\.js$/,
        exclude: /node_module/,
        loader: "babel-loader",
        options: {
          // babel7的优化 配置
          presets: [
            [
              "@preset/preset-env",
              {
                useBuiltIns: "usage", // 只给当前浏览器用到的语法做兼容 是对 @babel/polyfily的兼容配置
                corejs: {
                  version: 3,
                },
                targets: {
                  // 需要兼容的浏览器的版本
                  chrome: "60",
                  firefox: "50",
                },
                // 辅助函数的按需引入 在 plugin 里面的配置
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
  plugins: [
    "@babel/plugin-transform-runtime", // 辅助函数的按需引入
    new MiNiCssExtractPlugin(),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
};
