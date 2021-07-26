// npm i bootstrap@3.4.5 -D 字体文件
import 'bootstrap/dist/css/bootstrap.css'
// npm install jquery -D 
// 第一种引入 methods1 直接下载库,引入
// 第二种引入方式参见 webpack config 文件 methods2
import $ from 'jquery ' 
// 依赖全局变量$或者 this 作为 window对象的第三方模块 
// npm i imports-loader -D 配置 config
imports-loader 

// eslint 语法检查模块
// npm i eslint eslint-loader eslint-plugin-html eslint-plugin-node
// eslint-plugin-promise eslint-config-standard eslint-plugin-standard 
// eslint-plugin-import -D
JS-tree shaking
uglify-webpack-plugin //压缩js文件
CSS tree shaking //清理压缩过后多余的文件
purifycss-webpack
purify-css
glob-all //帮助 purifycss 做路劲处理,定位要做 tree shaking 的路劲文件
//压缩 css 的插件
optimize-css-assets-webpack-plugin cssnano

// 不同的分割文件的方法,将原本的大文件分割成为几个小文件,加快加载的 速度
import(/*webpackChunkName:'name'*/'./filename').then(function(name){
  console.log(name);
})
import(/*webpackChunkName:'name'*/'./filename').then(function(name){
  console.log(name);
})




// 将 module 文件单独打包
require.include('./module')
//将这两个模块的内容分割单独放入一个'page'文件 里面
require.ensure(['./modulesA','./modulesB'],function(){
  // 需要手动加上文件的路劲
  var modulesA = require('./subPageA')
  var modulesB = require('./subPageA')
},'SubPage')

// 不同的方式分割 jquery
import(/*webpackChunkName:'jquery'*/'jquery').then(function($){
console.log($)
})

require.ensure(['jquery'],function(){
  var $ = require('jquery')
},'jquery') // 打包后的文件名称