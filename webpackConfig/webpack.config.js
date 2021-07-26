var path = require("path");
var ExtractWebpackPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var ExtractCss = require("extract-text-webpack-plugin");
var ExtractLess = require("extract-text-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var UglifyJs = require("uglify-webpack-plugin");
// 配置 jquery
var Webpack = require("webpack");
var OptimizeCss = require("optimize-css-assets-webpack-plugin");
var purifyCss = require("purifycss-webpack");
var Glob = require("glob-all");
// 可视化的提取公共代码的插件
var BundleAnalyzerPlugin = require("bundle-analyzer-plugin")
  .BundleAnalyzerPlugin;

module.exports = {
  mode: production,
  // 压缩文件的配置 webpack4 的新增项,优化配置
  optimization: {
    //能够按需加载压缩需要的文件
    //  minimize: true 单独使用,
    // 用 uglify ,但是只有在 mode 为生产版本时候才能使用
    minimizer: [
      new UglifyJs({
        uglifyOptions: {
          ecma: 6,
        },
      }),
    ],
  },
  optimization: {
    // 提取公共模块内容的设置
    splitChunks: {
      cacheGroups: {
        // common 自己写的模块,以及所有引入的包的公共模块
        common: {
          name: "common",
          chunks: "all",
          miniSize: 1,
          priority: 0,
        },
        thirdLibrary: {
          name: vendor,
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 1,
        },
      },
    },
  },
  entry: {
    main: "./src/main.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[hash:5].js",
    chunkFilename: "[name].chunk.js",
  },
  module: {
    rules: [
      {
        //使用 imports-loader 解析 (导入)自己的本地文件 methods4 但是必须在 main 中 import
        test: path.resolve(__dirname, "jquery/jquery.mini.js"),
        use: {
          loader: "imports-loader",
          options: {
            $: "jquery",
          },
        },
      },
      {
        test: /\.css$/,
        use: ExtractWebpackPlugin.extract({
          fallback: {
            loader: "style-loader",
          },
          use: {
            loader: "css-loader",
          },
        }),
      },
      {
        // 当使用 less 和 less-loader 的时候配合 css-loader 一起文件的配置
        test: /\.css$/,
        use: ExtractCss.extract({
          fallback: {
            loader: "style-loader",
          },
          use: {
            loader: "css-loader",
          },
        }),
      },
      {
        test: /\.less$/,
        use: ExtractLess.extract({
          fallback: {
            loader: "style-loader",
          },
          use: [
            {
              loader: "css-loader",
            },
            {
              loader: "less-loader",
            },
          ],
        }),
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: ["img:src"],
          },
        },
      },
      {
        test: /\.png|jpg|jpeg$/,
        use: {
          loader: " file-loader",
          options: {
            name: "[name]-[hash:5].[ext]-one.css",
          },
        },
      },
      // 使用 MINI extract plugin
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          { loader: "less-loader" },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        // 使用 Bootstrap 的配置
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: "/.(eot|svg|ttf|woff|woff2)$/",
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: {
          loader: "eslint-loader",
        },
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new purifyCss({
      paths: global.sync([
        path.join(__dirname, "./index.html"), // 找到出现在 HTML 中的元素的类名,清理多余的
        path.join(__dirname, "./src/index.js"), // 找到出现在 JS 中的元素的类名,清理多余的
      ]),
    }),
    // 先提取文件,在压缩文件
    new OptimizeCss({
      cssProcessor: require("cssnano"),
    }),
    new UglifyJs({
      uglifyOptions: {
        ecma: 6,
      },
    }),
    new ExtractWebpackPlugin({
      filename: "[name]-[hash:5]",
    }),
    new CleanWebpackPlugin(["dist"]),
    // 当使用 less 和 less-loader 的时候配合 css-loader 一起文件的配置
    new ExtractCss({
      filename: "[name]-[hash:5]-one.css",
    }),
    new ExtractLess({
      filename: "[name]-[hash:5]-one.css",
    }),
    // use  MiniCss
    new MiniCssExtractPlugin({
      filename: "[name]-[hash:5]-one.css",
    }),
    new HtmlWebpackPlugin({
      template: "index.html", // 注意路径
      filename: "index.html",
    }),
    // // ,使用内置文件 ,先npm i jquery ,然后导入 webpack,然后 配置 jquery  methods 2
    new Webpack.ProvidePlugin({
      $: "jquery",
    }),
    new Webpack.HotModuleReplacementPlugin(),
  ],
  // methods3
  resolve: {
    alias: {
      // 自己手动在根路径下面创建一个 jquery 文件夹 ,引入这个文件__dirname 代表根路径, 注意文件的路劲
      jquery$: path.resolve(__dirname, "jquery/jquery.js"),
    },
  },
  devServer: {
    port: 8080,
    open: true,
    inline: true,
    hot: true,
    host: "127.0.0.1",
    // 如果 index.HTML 打不开,可以设置一个页面
    openPage: "index2.html",
    // 将错误如何显示
    overlay: true,
    historyApiFallBack: {
      // 当只写一个的时候,默认为 true,不论输入啥,保持当前页面不变
      //下面的这种设置,类似于路由,输入 from 地址,跳转 to 的页面
      rewrites: [
        {
          from: "/a",
          to: "/a.html",
        },
      ],
    },
    proxy: {
      // 使用源端口号,加上路径,代理 target端口, 获得数据 请求数据的路径
      "/requestDataPath": {
        target: "http://api.com",
        changeOrigin: true,
        logLevel: "debug",
      },
      // 在使用这个请求的 JS 文件里面写 判断模块是否热更新,不刷新页面,跟新数据
      // if(module.hot){
      //   module.hot.accept()
      // }
    },
  },
};
