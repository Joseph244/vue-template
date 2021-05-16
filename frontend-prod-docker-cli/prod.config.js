module.exports = {
    projectName: 'vue-client', // 项目名称
    // 前端打包脚本（注释掉即不执行该命令，直接执行后续更新）
    script: 'npm run build:dark', // 国网绿版本
    // script: 'npm run build', // 浅色版本打包

    // （1）单纯前端更新dist静态资源配置案例（无docker）
    106: {
        name: '106docker环境', // 环境名称
        host: '192.168.78.106', // 服务器ip地址
        port: 22, // ssh连接端口（一般默认22）
        username: 'root', // ssh登录服务器用户名
        password: '', // ssh登录服务器密码
        distPath: 'dist', // 当前工程下该文件夹下所有文件上传服务器（前不加斜杠表示当前工程目录下相对路径，如前加斜杠就是本机绝对路径)
        webDir: '/opt/nginx/dist', // 文件上传服务器绝对路径
        dockerName: 'vue-client-docker', // docker名称
        dockerWebDir: '/app' // 容器中文件存放位置
        // lastCmd: 'pm2 restart app' // 所有动作执行完之后在服务器上执行的自定义命令(不配置即不执行)
    }
};
