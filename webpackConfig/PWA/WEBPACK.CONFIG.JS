/**
 *   PWA: 渐进式网络开发应用程序 , 离线访问技术
  需要的插件: workbox-webpack-plugin
  eslint 不认识 window 变量, 需要在 package.json 中, 配置 eslintConfig 的配置
  原理: 先注册一个 service worker ,将有网络的时候访问的资源放在 service worker 里面, 然后等到没网的时候,从 service worker 里面加载资源

  启动 service worker 需要启动的配置
 1 : {
  "eslintConfig": {
    "extends": "aribnb-base",
    "env": {
      "browser": true, // 支持浏览器全局语句
      "node": true   // 也可以配置 node 环境
    }
  }
}

2: service worker 运行在服务器上面,必须将打包好的代码运行在服务器上

1  : node.js
    npm i serve -g
    终端运行命令: serve  -s    build 启动服务器,将 build 下面的资源作为静态资源暴露出去


 */

new workBoxWebpackPlugin.GenerateSW({
  /**
   * 帮助 service -work 快速启动
   * 删除旧的 service-work
   * 生成一个 serviceWorker 的配置文件
   */
  clientClaim: true,
  skipWaiting: true,
});
