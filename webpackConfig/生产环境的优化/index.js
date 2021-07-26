/**
  生产环境的优化 :
  优化打包构建速度 :
      oneOf : 一个文件只被一个 loader 处理
      babel 缓存
      多进程打包
      externals   CDN 手动引入
      dll   将某个库打包好,后面直接引入,不需要再单独打包, 需要两个配置文件
  优化代码运行的性能
       强制缓存期间, 资源不能撤销 , 哈希值如果发生改变, 则重新发送请求
       1 : 缓存(hash-chunkHash-contenthash)
                hash : 打包的时候,无论文件是否发生变化, webpack 打包的时候,hash 值都会发生变化
                chunkHash:  来自于同一个入口文件里面的 import 的资源, 共享一个(入口文件的 hash 值) hash 值,一旦入口文件的 hash 值变化, css 的 hash 值也会发生变化
                contentHash : 根据文件内容生成 hash 值, 便于缓存
      2 : tree-shaking 开启 es6module, 开启生产模式
      3 : code-split
      4 : PWA
      5 : 懒加载预加载








 */
