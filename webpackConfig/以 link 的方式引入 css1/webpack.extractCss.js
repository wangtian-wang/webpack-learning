var { resolve} = require('path'),
const MiniCssPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { module } = require('../webpack.config');
const optimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
// 设置 node.JS 的环境变量;
process.env.NODE_ENV = "development";
module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssPlugin.loader('提取 JS 中的 css 为单独的 css 文件, 通过 link 标签引入, 解决闪屏问题'), 'css-loader', {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: () => {
              require('postcss-preset-env')
            }
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      entry: {
        template: './src/index.html'
      }
    }),
    new MiniCssPlugin({
      filename: 'css/build.css'  // 对打包过后的 css 文件重新命名
    }),
    new optimizeCssPlugin({
      filename: 'css/compress.css'
    }),
    new OptimiseCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ['default', {discardComments: {removeAll: true}}]
      },
      canPrint: true
    })
  ]

}
/**
 *  css 的兼容性处理 postcss -> postcss-loader -> postcss-preset-env (能让兼容性精确到某一个浏览器的版本, 做法 : 帮助 postcss先去找package.json 中的 browerList 里面 的配置,通过配置加载指定的 css 兼容性的样式)
 */
/**
 * optimize-css-assets-webpack-plugin 压缩 css 文件 , 移除 css 文件中的注释
 */


关于switch语句的使用 ： 
在函数中可以使用return 代替break；
关于continue语句的使用
 continue + label 用于指定继续执行循环结构的起始位置 
只能用在循环语句中，for in / for / do while while
  ```
    for ( var i = 0; i < 10; i++){
    console.log(i);
    if( i === 3) continue;
    console.log(i)
}
 当条件成立的时候 相当于return；跳出循环 不执行当前的代码， 从下一个i开始，继续执行for循环
  ```
https://www.google.com.hk/search?q=vue+index.html+%E4%BD%BF%E7%94%A8ejs&rlz=1C1GCEU_zh-CNSG932SG932&oq=vue+index.html+%E4%BD%BF%E7%94%A8ejs&aqs=chrome..69i57.28960j0j7&sourceid=chrome&ie=UTF-8
