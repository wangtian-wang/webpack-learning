// https://github.com/neutrinojs/webpack-chain#getting-started
// https://tech.meituan.com/
// https://github.com/jerryOnlyZRJ 一个优秀作者的GitHub的地址
// https://hackernoon.com/async-await-generators-promises-51f1a6ceede2 async await = generators + promise
// https://developer.yahoo.com/performance/rules.html

/**@type{import('@vue/cli-service').ServicePlugin} */ // 引入不同类型的注释 在写代码的时候 能给与一定程度的提示
const webpackBundleAnlyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    configureWebpack: {
        plugins: [
            new webpackBundleAnlyzer({ analyserPort: 8081, generateStatsFile: false })
        ]
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].template = '/Users/username/proj/app/templates/index.html'
                return args
            })
            .plugin('clean')
            .use(CleanPlugin, [['dist'], { root: '/dir' }]);

        config.module
            .rule('lint')
            .test(/\.js$/)
            .pre()
            .include
            .add('src')
            .end()
            // Even create named uses (loaders)
            .use('eslint')
            .loader('eslint-loader')
            .options({
                rules: {
                    semi: 'off'
                }
            });
        config.resolve.modules
            .add(value)
            .prepend(value)
            .clear()
        config.optimization
            .minimizer('css')
            .use(OptimizeCSSAssetsPlugin, [{ cssProcessorOptions: { safe: true } }])
        config.optimization
            .minimizer(name)
            .tap(args => newArgs)

        // Example
        config.optimization
            .minimizer('css')
            .tap(args => [...args, { cssProcessorOptions: { safe: false } }])
        config
            .plugin('env')
            .use(require.resolve('webpack/lib/EnvironmentPlugin'), [{ 'VAR': false }]);
        // Config plugins: modify arguments
        config
            .plugin(name)
            .tap(args => newArgs)

        // Example
        config
            .plugin('env')
            .tap(args => [...args, 'SECRET_KEY']);
        // 这个方法是正确的 但是 配置的参数没有传递到webpack内部 
        config.optimization.splitChunks = {
            chunks: "all",
            cacheGroups: {
                vendors: {
                    name: 'vendor~oooo',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial',
                    minChunks: 2,
                    maxSize: 100
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        }
    }
}