const { module } = require("../多进程打包/webpack.config");
/**
 * 适合引入第三方的 CDN 包
 */
module.exports = {
  externals: {
    // 打包的时候,忽略打包的选项
    // 如果忽略这个选项,那么就得手动的在 模板 HTML 文件中引入这个 CDN
    // 忽略库名  --- npm 包名
    jquery: "jQuery",
  },
};
