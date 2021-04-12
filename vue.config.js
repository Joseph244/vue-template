const path = require('path');
const webpack = require('webpack');
const Spritesmith = require('webpack-spritesmith');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
process.env.VUE_APP_VERSION = require('./package.json').version;
const isProd = process.env.NODE_ENV === 'production';

console.log('主题', process.env.VUE_APP_THEME);
function resolve(dir) {
    return path.join(__dirname, dir);
}
const globalLessVars = () => {
    return {
        // 全局less变量预导入（全局最先导入的基础配置）
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [resolve(`src/styles/${process.env.VUE_APP_THEME}/index.less`)]
        }
    };
};

// 雪碧图class规则
const templateFunction = function(data) {
    var shared = '.icon { display: inline-block; vertical-align: middle; background-image: url(I) }'.replace('I', data.sprites[0].image);

    var perSprite = data.sprites
        .map(function(sprite) {
            return '.icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
                .replace('N', sprite.name)
                .replace('W', sprite.width)
                .replace('H', sprite.height)
                .replace('X', sprite.offset_x)
                .replace('Y', sprite.offset_y);
        })
        .join('\n');

    return shared + '\n' + perSprite;
};

module.exports = {
    // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/;这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径
    publicPath: process.env.VUE_APP_PUBLICPATH || '/',
    outputDir: `./dist/dist-${process.env.VUE_APP_THEME}`, // 输出文件目录
    devServer: {
        proxy: process.env.VUE_APP_SERVER,
        port: process.env.VUE_APP_PORT || 8080
    },
    pluginOptions: globalLessVars(),
    configureWebpack: config => {
        // 将小图标拼接成雪碧图
        config.plugins.push(
            new Spritesmith({
                src: {
                    cwd: './src/images/spriteImgs/',
                    glob: '*.png'
                },
                target: {
                    image: './src/styles/_sprite/_sprite.png',
                    css: [
                        [
                            path.resolve(__dirname, './src/styles/_sprite/_sprite.less'),
                            {
                                // 引用自己的模板
                                format: 'function_based_template'
                            }
                        ]
                    ]
                },
                apiOptions: {
                    cssImageRef: './_sprite.png'
                },
                customTemplates: {
                    function_based_template: templateFunction
                },
                spritesmithOptions: {
                    algorithm: 'binary-tree',
                    padding: 10
                }
            })
        );
        if (isProd) {
            // 配置webpack 压缩
            config.plugins.push(
                new CompressionWebpackPlugin({
                    test: /\.js$|\.html$|\.css$/,
                    // 超过4kb压缩
                    threshold: 4096
                })
            );
        }
    },
    chainWebpack: config => {
        // svg
        const svgRule = config.module.rule('svg');
        svgRule.uses.clear();
        svgRule.exclude.add(/node_modules/); // 正则匹配排除node_modules目录
        svgRule.include
            .add(resolve('src/assets/svg/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'jsc-[name]'
            })
            .end();
        // image exclude
        const imagesRule = config.module.rule('images');
        imagesRule
            .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
            .exclude.add(resolve('src/assets/svg/icons'))
            .end();
        // alias 目录映射
        config.resolve.alias
            .set('@', resolve('src'))
            .set('~', resolve('src/api'))
            .set('~THEME', resolve(`src/styles/${process.env.VUE_APP_THEME}/index.less`));
        // webpack配置第三发组件：如Jquery、Quill等
        config.plugin('provide').use(webpack.ProvidePlugin, [
            {
                'window.Quill': 'quill'
            }
        ]);
        // if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_SENTRY) {
        //     console.info('开启sentry监控...  ...');
        //     config.plugin('sentry').use(SentryPlugin, [
        //         {
        //             ignore: ['node_modules'],
        //             include: './dist/js', // 上传dist文件的js
        //             configFile: './.sentryclirc', // 配置文件地址
        //             release: process.env.VUE_APP_VERSION, // 版本号
        //             deleteAfterCompile: true,
        //             urlPrefix: process.env.VUE_APP_SENTRY // 线上 js的代码路径前缀
        //         }
        //     ]);
        // }
    }
};
