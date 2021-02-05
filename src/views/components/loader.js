// 将components下面的全部vue文件注册为全局组件,组件引用统一按照文件名首字母大写引用

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
    const requireComponent = require.context('.', false, /\.vue$/);
    // console.log('requireComponent.keys():', requireComponent.keys()); // 打印加载到的文件名称
    requireComponent.keys().forEach(fileName => {
        const config = requireComponent(fileName); // 加载组件
        const componentName = changeStr(
            fileName.replace(/^\.\//, '').replace(/\.\w+$/, '') // ./child1.vue => Child1
        );
        // console.log('componentName:', componentName);
        Vue.component(componentName, config.default || config); // 动态注册该目录下的所有.vue文件
    });
}
