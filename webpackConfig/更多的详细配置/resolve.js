module.exports = {
  // 解析模块的规则
  resolve: {
    alias: {
      "@": resolve(__dirname, "/src"),
    },
    // 配置省略文件路径的后缀名  平时写的时候,都是 Import add from './src/index   自动补全 index.js的
    extensions: ["js", "css", "less"],
  },
  // 告诉 webpack,解析模块(第三方的包)去找那个目录, 提高加载第三方模块的速度
  modules: [resolve(__dirname, "../node_modules"), "node_modules"],
};
