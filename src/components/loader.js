// 将components下面的全部组件注册为全局组件,如果包含文件夹会注册其下的index.vue或者index.js,组件引用统一按照文件名首字母大写引用

// 将首字母大写 confirmModal 转为  ConfirmModal
function changeStr(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function ComponentsLoader(Vue) {
    /*    
    webpack的核心Api，建议大家掌握，大有用处
    require.context(arg1,arg2,arg3)
        arg1 - 读取文件的路径
        arg2 - 是否遍历文件夹子目录
        arg3 - 匹配文件名的正则
*/
    const requireComponent = require.context('.', true, /\.vue|index.js$/);
    // console.info('requireComponent.keys():', requireComponent.keys()); // 打印加载到的文件名称
    requireComponent.keys().forEach(fileName => {
        // ./collapse/collapse.vue 这种多级目录会自动筛选，只加载index.vue和index.js
        // const compName = fileName.substring(fileName.lastIndexOf('/') + 1, fileName.length);
        const arr = fileName.split('/');
        const compFileName = arr[arr.length - 1];
        if (arr.length > 2 && compFileName != 'index.vue' && compFileName != 'index.js') {
            // console.log('del', compFileName, fileName);
            return;
        }
        const config = requireComponent(fileName); // 加载组件
        let componentName = changeStr(
            fileName.replace(/^\.\//, '').replace(/\.\w+$/, '') // 转换大小写./child1.vue => Child1
        );
        if (arr.length > 2) {
            componentName = arr[1]; // 取第一级文件夹名称作为组件名
        }

        console.info('componentName:', componentName);
        Vue.component(componentName, config.default || config); // 动态注册该目录下的所有.vue文件
    });
}
