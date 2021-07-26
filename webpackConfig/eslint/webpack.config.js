const { module } = require("../webpack.config");

/**
 * need download npm package
 * standards airbnb : npm package : eslint, eslint-config-airbnb-base ,eslint-plugin-import, eslint-loader;
 * set eslintConfig in package.json
 *  console.log(111) if you want to test but something error or warning happened , you can do that
 * // eslint-disable-next-line
 *   console.log(111)   the eslint rule will ignore this line
 */
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_module/,
        options: {
          // 自动修复错误
          fix: true,
        },
      },
    ],
  },
};
