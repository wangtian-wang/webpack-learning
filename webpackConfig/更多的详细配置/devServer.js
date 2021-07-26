const resolve = require("./resolve");
const { modules } = require("./resolve");

module.exports = {
  mode: "development",
  devServer: {
    // 运行代码的目录, 一般是打包过后的代码来运行
    contentBase: resolve(__dirname, "build"),
    watchContentBase: true, // 监视 content 下面的所有文件, 一旦发生变化,就会 reload
    watchOptions: {
      // 监视的时候,忽略监视的文件
      ignored: "/node_modules",
    },
    overlay: false, // 出错误,不要进行全屏提示
    compress: true,
    open: true,
    hot: true,
    port: 3000,
    host: "localhost",
    clientLogLevel: "none", // 不需要显示启动服务器的日志信息
    quiet: true, // 除了基本的启动信息之外,其他的信息不要打印
    proxy: {
      "/api": {
        /*
         8080服务器接收到了来自'./api/request'请求,就会把请求转发到另外一个服务器, 另外一个服务器响应了之后,将数据返回
         */
        target: "http://www.baidu.com",
        pathRewrite: {
          "./api": "",
        },
      },
    },
  },
};
