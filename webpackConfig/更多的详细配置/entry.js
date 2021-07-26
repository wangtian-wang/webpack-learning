/*
entry: 入口起点
单入口:
      1: string : './src/index.js'
                  打包形成一个 chunk, 输出一个 bundle
                  此时如果是 entry:  './src/index.js' 则默认的 chunk 名称是 main
多入口
      2: array : ['./src/index.js','./src/user.js' ]
                  所有入口文件最终会被打包到一个 bundle.js 文件里面
                  只有在 HMR功能中,让 HTML 热更新生效
      3: object: {
        name: path
      }
                  有几个属性,就有几个入口文件,会打包输出几个 bundle.js 文件
                  此时 chunk 的名字是 name

 特殊用法
 {
  index: ['./src/index.js','./src/user.js'], // 只输出一个打包好的 bundle.js 文件
  add: './src/add.js
 }

*/
