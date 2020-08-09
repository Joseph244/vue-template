import Vue from 'vue';
import confirm from './confirm';

// 直接将Vue组件作为Vue.extend的参数,在这里注意，高版本的vue-loader要添加.default
const ConfirmConstructor = Vue.extend(confirm);

let nId = 1;

export default options => {
    let id = 'confirm-' + nId++;
    options = options || {};

    const ConfirmInstance = new ConfirmConstructor({
        data: options
    });
    ConfirmInstance.id = id;
    ConfirmInstance.vm = ConfirmInstance.$mount(); // 挂载但是并未插入dom，是一个完整的Vue实例
    ConfirmInstance.vm.visible = true;
    ConfirmInstance.dom = ConfirmInstance.vm.$el; // 获取到本实例的dom元素
    document.body.appendChild(ConfirmInstance.dom); // 将dom插入body
    ConfirmInstance.dom.style.zIndex = nId + 1001; // 后插入的组件z-index加1，保证能盖在之前的上面
    return ConfirmInstance.vm;
};
