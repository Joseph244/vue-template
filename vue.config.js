const path = require('path');
const webpack = require('webpack');
process.env.VUE_APP_VERSION = require('./package.json').version;

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/;这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径
    // publicPath: process.env.NODE_ENV === 'production' ? '/messageRouteApp' : '/',
    publicPath: process.env.PUBLICPATH || '/',
    devServer: {
        // proxy: 'http://192.168.78.106:8081/messageRouteApp/'
        proxy: process.env.VUE_APP_BASEURL
    },
    pluginOptions: {
        // 全局less变量预导入（县东港与全局最先导入的基础配置）
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [resolve('src/styles/index.less')]
        }
    },
    chainWebpack: config => {
        // alias 目录映射
        config.resolve.alias.set('@', resolve('src')).set('~', resolve('src/api'));
        // webpack配置第三发组件：如Jquery、Quill等
        config.plugin('provide').use(webpack.ProvidePlugin, [
            {
                'window.Quill': 'quill'
            }
        ]);
    }
};
