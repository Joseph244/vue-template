import preventReClick from './preventReClick';
import permission from './permission';
import imgUrl from './imgUrl.js';
import labelShake from './labelShake.js';

const install = function(Vue) {
    Vue.directive('preventReClick', preventReClick);
    Vue.directive('permission', permission);
    Vue.directive('img-url', imgUrl);
    Vue.directive('label-shake', labelShake);
};

if (window.Vue) {
    window['preventReClick'] = preventReClick;
    window['permission'] = permission;
    window['img-url'] = imgUrl;
    window['label-shake'] = labelShake;
    Vue.use(install); // eslint-disable-line
}

export default install;
