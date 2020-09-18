// 标签文字超出父元素宽度之后自动左右滑动显示
const index = {
    inserted(el, binding, vnode) {
        let { value } = binding; // value为动画时长
        if (el.parentNode) {
            !el.parentNode.style.width ? (el.parentNode.style["width"] = "100%") : "";
            !el.parentNode.style.maxWidth ? (el.parentNode.style.maxWidth = "100%") : "";
            el.parentNode.style["white-space"] = "nowrap";
            el.parentNode.style.overflow = "hidden";
            const parentWidth = el.parentNode.offsetWidth;
            const elWidth = el.offsetWidth;
            if (elWidth > parentWidth) {
                el.style.overflow = "hidden";
                el.style.position = "relative";
                el.style.display = "inline-block";
                el.style.animation = value ? `labelMove ${value}s infinite alternate linear` : "labelMove 2s infinite alternate linear";
            }
        } else {
            throw new Error(`The node need parentNode`);
        }
    }
};

// js创建@keyframes，ball从定位在(10,10)的位置运动到(100,100) 的位置
const runkeyframes = ` @keyframes labelMove {
    0% {
        left: 0px;
        transform: translate(0, 0);
    }
    100% {
        left: 100%;
        transform: translate(-100%, 0);
    }
}`;
// 创建style标签
const style = document.createElement("style");
// 设置style属性
style.type = "text/css";
// 将 keyframes样式写入style内
style.innerHTML = runkeyframes;
// 将style样式存放到head标签
document.getElementsByTagName("head")[0].appendChild(style);

export default index;

// 使用案例
// v-label-shake="5"  表示动画周期是5s
/* <style lang='less' module>
.test {
    width: 200px;
}
</style>
<template>
    <div :class="$style.test">
        <span v-label-shake>开发建设的方法绝地反击副教授副教授就</span>
        <span v-label-shake="5">开发建设的方法绝地反击副教授副教授就</span>
    </div>
</template> */
