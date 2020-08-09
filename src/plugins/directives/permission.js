import store from '@/store';
// 自定义指令要用到store等异步数据的时候不建议使用（此处就是由于这个原因暂且不用）
const permission = {
    inserted(el, binding, vnode) {
        const { value } = binding;
        const powerVal = store.state.global.powers[value];
        if (value) {
            console.error(value, powerVal, store.state.global.powers);
            if (!powerVal) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        } else {
            throw new Error(`need power! Like v-permission="'edgeBoxEditPower'"`);
        }
    }
};

// const install = function(Vue) {
//     Vue.directive('permission', permission);
// };

// if (window.Vue) {
//     window['permission'] = permission;
//     Vue.use(install); // eslint-disable-line
// }

// permission.install = install;
export default permission;
