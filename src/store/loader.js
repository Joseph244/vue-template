/**
 * 将/store/modules/下的js 文件全部导入vuex中，而无需手动增加，模块名称以文件名命名
 */

const files = require.context('./modules', false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});

console.log('vuex-modules:', modules);
export default modules;
