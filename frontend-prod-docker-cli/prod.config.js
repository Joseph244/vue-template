module.exports = {
    projectName: '局方智能诊断系统', // 项目名称
    // 前端打包脚本（注释掉即不执行该命令，直接执行后续更新）
    script: 'npm run build',

    // （1）单纯前端更新dist静态资源配置案例（无docker）
    104: {
        name: '104环境', // 环境名称
        host: '192.168.78.104', // 服务器ip地址
        port: 22, // ssh连接端口（一般默认22）
        username: 'root', // ssh登录服务器用户名
        password: '123456', // ssh登录服务器密码
        distPath: 'html', // 当前工程下该文件夹下所有文件上传服务器（前不加斜杠表示当前工程目录下相对路径，如前加斜杠就是本机绝对路径)
        webDir: '/opt/nginx/resources/axure/3996' // 文件上传服务器绝对路径
    }
};
