// 全局注册自定义指令，用于判断当前图片是否能够加载成功，可以加载成功则赋值为img的src属性，否则使用img 标签的src值
/**
 * 检测图片是否存在
 * @param url
 */
let imageIsExist = function(url) {
    return new Promise(resolve => {
        var img = new Image();
        img.onload = function() {
            if (this.complete == true) {
                resolve(true);
                img = null;
            }
        };
        img.onerror = function() {
            resolve(false);
            img = null;
        };
        img.src = url;
    });
};

const install = async (el, binding) => {
    // 指令名称为：v-img-url
    let imgURL = binding.value; // 获取图片地址
    if (imgURL) {
        let exist = await imageIsExist(imgURL);
        if (exist) {
            el.setAttribute('src', imgURL);
        }
    }
};

export default {
    install: Vue => {
        Vue.directive('img-url', install);
    }
};

/* // 使用案例：src的值为加载不到时候的默认图片，v-img-url值为真实需要加载的图片
<img src="../../images/icon/appDefaultIcon.png" class="appIconImg" v-img-url="inapp.icon" @click="openApp(inapp)" /> */

// 解析：：：
// 我们都知道，img标签支持onerror 事件，在装载文档或图像的过程中如果发生了错误，就会触发onerror事件。可以使用一张提示错误的图片代替显示不了的图片。
// 例如这样使用：

// <img src="images/logo.png" onerror="javascript:this.src='images/logoError.png';">
// 当图片不存在时，将触发 onerror，而 onerror 中又为 img 指定一个logoError.png 图片。也就是说图片存在则显示logo.png，图片不存在将显示 logoError.png。

// 但是，注意哦，这里有个大坑哦，如果logoError.png 也不存在，则会继续触发 onerror，导致死循环，页面卡死。而且，就算图片存在，但网络很不通畅，也可能触发 onerror。
