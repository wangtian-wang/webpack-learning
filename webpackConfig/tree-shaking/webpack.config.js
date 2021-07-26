/*

 tree-shaking : 去掉没有用的代码
 开启的条件: mode : production 2: 写的代码必须使用 es6 import 方式导入

 在 package.json 中配置:
 "sideEffects" : false  会将所有的文件都进行 tree-shaking,可能会导致 css, babel 文件被干掉
 "sideEffects" : ['*.css', ' *.less']     这些文件不能进行 tree-shaking 操作


*/
// 异步导入的代码，只要是在入口文件里面这样引入 都会被webpack 进行分包；
// 魔法注释 import 用于懒加载
import(/* webpackChunkName: 'file name'*/"./需要引入文件的路径").then(res => {
    console.log('file has been loaded')
});
// 同步导入 不是懒加载 import file from './file.js';
// 懒加载
import(/* webpackChunkName: 'file' */
    /* webpackPrefetch: true */  // 会在父亲chunk加载结束后开始 加载 在浏览器空闲时 下载 在未来的某个时刻
    /* webpackPreload: true */   //  和父亲chunk以并行的方式加载  中等优先级，并立即下载 在父亲chunk中立即请求，用于当下时刻

    './file').then(({ default: VueFile }) => {
        // 回调函数的默认参数是一个对象， default是默认导出的组件文件；
        document.body.appendChild(VueFile);
    })
// runtimeChunk： 是否将配置runtime相关的代码抽取到一个单独的chunk文件里面
// runtime相关的代码指的是，在运行环境中，对模块进行解析parse，加载 import，模块信息相关的代码、如果不做单独配置 会加载到主模块里面
// cdn 的配置
output: {
    publicPath: 'http://wangtiancdn.com/cdn/' // 自己的cdn地址   引用第三方文件去下载的地址
}
/** css 的 多与代码的优化
 *  npm i purgecss-webpack-plugin
 *    glob 找到文件夹的一个库 可以传入正则表达式等  webpack 的内置库
 *    add-asset-webpack-plugin  向打包后Index.html里面注入一些以script形式引用的文件
 *
 *
 *
*/
plugins: [
    new webpackPurgeCssPlugin({
        path: glob.sync(`${resolve(__dirname, './src')}`, { nodir: true }), // 检查哪里的源代码 进行优化
        safeList: () => {
            return {
                standard: ['body']
            }
        }
    })
]
/**
 * HTML 文件中 代码的 压缩
 */
plugin: [
    new HtmlWebpackPlugin({
        inject: 'head', // body false true
        template: './index.html',
        cache: true,  // 两次打包的文件一样的时候 使用之前的缓存  
        minify: isProduction ? {
            removeComments: true    //移除html文件里面的注释
        } : false,// 决定html 的压缩
        removeRedundantAttributes: true,   // 移除HTML 标签元素上面多余的属性
        removeEmptyAttributes: true,
        collapseWhiteSpace: true,
        removeStyleLinkTypeAttributes: true,
        minifyCss: true,
        minifyJs: {
            mangle: {
                topLevel: true          // 这个插件 使用的是terser 里面关于压缩html的插件 所以 可以写一些关于 压缩js的配置
            }
        } //     true  || false ||  {}, // 对于HTML里面的css js 代码进行压缩

    })
]
/**
 * inlineChunkHtmlPlugin 将代码注入到HTML里面
 */
plugin: [
    new inlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime.*\.js$/,])   // 正则表示要将哪些文件注入到HTML里面 以内联的形式注入
]
/**
 * webpack 打包库
 * npm init package.json 文件
 * npm login
 * npm publish
 * npm search
 * 库封装的环境 决定了 能在哪些环境里面使用
 * 将当前的库使用 webpack  webpack-cli 打包
 * 
 * 
 */
module.exports = {
    mode: 'development',  // 不要做tree shaking
    entry: './index.js',
    output: {
        path: './lib',
        failename: '[name].js'
    },
    libraryTarget: 'umd',
    library: 'selfLib', // 库的名称
    globalObject: 'this'  // 库的环境上下文

}

/**
 *  打包的时间分析 
 */
// package.json
scripts: {
    status: 'webpack --config ./config/webpack.common.js --env production --profile --json=status.json'

}
// 可以将生成的文件 上传到github.io / analyse | assets

eslintrc.js
module.exports = {
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module' // 配置了 环境为common.js 情况下 开启这个选项 可以支持 esmodule 语法

    }
}

// command + options + k   打标签


/*

# loaderName-schema.json           当前option的字段约束表
                         {
                             "type": "object",
                             "properties": {
                                 "name" : {
                                    "type" : "string",
                                    "description": "please input your name"
                                 }
                             }
                         }

 */


// const { getOption } = require('loader-utils');
// const { validate } = require('schema-utils');
// const schema = require('./loaderName-schema.json');
// module.exports = function (content) {
//     const contentHtmlOrigin = marked(content);
//     const innerContentHtml = '`' + contentHtmlOrigin + '`';
//     const moduleCode = `var code = ${innerContentHtml};export default code`;
//     return moduleCode;
// }

/**
    自定义插件

 */
class selfDefinePlugin {
    apply (compiler) {
        // afterEmit webpack compiler的生命周期钩子函数， 想要在生命周期的 那个阶段 实现啥功能
        compiler.hooks.afterEmit.tapAsync('selfDefinePlugin', (compilation, callback) => {
            callback()
        })
    }
}