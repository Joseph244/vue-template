import preventReClick from './preventReClick';
import permission from './permission';

const install = function(Vue) {
    Vue.directive('preventReClick', preventReClick);
    Vue.directive('permission', permission);
};

if (window.Vue) {
    window['preventReClick'] = preventReClick;
    window['permission'] = permission;
    Vue.use(install); // eslint-disable-line
}

export default install;
