/*
 * @Descripttion:
 * @version:
 * @Author: ZZF
 * @Date: 2020-06-08 16:32:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-08 16:59:20
 */

import Vue from 'vue';
/**
 * @name: 点击之后当前按钮一定时间内（例如：setTimeout 1000ms）不可以再次被点击，相当于节流；
 * @param {}
 * @return:
 */
const preventReClick = Vue.directive('preventReClick', {
    inserted: function(el, binding) {
        el.addEventListener('click', () => {
            if (!el.disabled) {
                el.disabled = true;
                el.loading = true;
                setTimeout(() => {
                    el.disabled = false;
                }, binding.value || 3000); // 传入绑定值就使用，默认3000毫秒内不可重复触发
            }
        });
    }
});

export { preventReClick };
