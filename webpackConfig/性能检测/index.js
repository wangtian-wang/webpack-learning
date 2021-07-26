/**
 * 1: stats 分析与可视化图
 *    webpack --profile --json > stats.json
 *    打开网站 webpack chart,上传 json 文件
 * 2: webpack-bundle-analyzer 体积分析
 *    1 在 package.json 的 script 中添加脚本命令
 *                  analyze: "source-map-explorer 'build/*.js'"
 *    2 config 文件中 devtools: 'source-map', 开启
 *    3 必须要在打包完成之后,才能执行这个命令, 会打开网页,显示测试的结果
 * 3: 官方推荐的 bundle-analyzer
 * 4:  speedMeasurePlugin  检测 webpack 打包的速度
 *  usage :
 *    1 : npm i
 *    2 : importSpeedMeasureWebpackPlugin from 'speed-measure-webpack-plugin
 *        const  smwp = new SpeedMeasureWebpackPlugin()'
 *        module.export =smwp({
 *            mode: ',
 *        })
 *    3 : 运行 npm run build
 *
 *
 *
 * speed-measure-webpack-plugin 速度分析
 */
