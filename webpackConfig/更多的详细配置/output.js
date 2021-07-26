/*





 */

module.exports = {
  output: {
    // 文件名称: 指定目录/文件名
    filename: "js/[name].js",
    // 输出文件目录
    path: resolve(__dirname, "build"),
    // 在生产环境下, HTML 引入资源的时候的公共路径前缀
    publicPath: "/", // 生产环境下生效
    chunkFilename: "js/[name]_chunk.js", // 非入口 chunk 的名字
    /*
     library: '[name]', // 整个打包后的文件向外暴露的变量名称
     libraryTarget: 'window',//  变量名添加到那个属性上面
     libraryTarget: 'global'   node 中,设置的全局变量
     libraryTarget: 'commonJS'
     */
  },
};
