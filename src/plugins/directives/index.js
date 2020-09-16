import preventReClick from './preventReClick';
import permission from './permission';
import imgUrl from './imgUrl.js';

const install = function(Vue) {
    Vue.directive('preventReClick', preventReClick);
    Vue.directive('permission', permission);
    Vue.directive('img-url', imgUrl);
};

if (window.Vue) {
    window['preventReClick'] = preventReClick;
    window['permission'] = permission;
    window['img-url'] = imgUrl;
    Vue.use(install); // eslint-disable-line
}

export default install;
