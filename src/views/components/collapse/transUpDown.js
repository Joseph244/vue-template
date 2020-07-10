const elTransition = '0.4s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out';
const Transition = {
    'before-enter'(el) {
        el.style.transition = elTransition;
        if (!el.dataset) el.dataset = {};

        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;

        el.style.height = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
    },

    enter(el) {
        el.dataset.oldOverflow = el.style.overflow;

        if (el.scrollHeight !== 0) {
            setTimeout(() => {
                el.style.height = el.scrollHeight + 'px';
            }, 100);

            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
        } else {
            el.style.height = '';
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
        }

        el.style.overflow = 'hidden';
    },

    'after-enter'(el) {
        el.style.transition = '';
        el.style.height = '';
        el.style.overflow = el.dataset.oldOverflow;
    },

    'before-leave'(el) {
        if (!el.dataset) el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.dataset.oldOverflow = el.style.overflow;

        el.style.height = el.scrollHeight + 'px';
        el.style.overflow = 'hidden';
    },

    leave(el) {
        if (el.scrollHeight !== 0) {
            el.style.transition = elTransition;
            el.style.height = 0;
            el.style.paddingTop = 0;
            el.style.paddingBottom = 0;
        }
    },

    'after-leave'(el) {
        el.style.transition = '';
        el.style.height = '';
        el.style.overflow = el.dataset.oldOverflow;
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }
};

// GOOD
export default {
    // functional   :  函数式组件
    // 没有管理任何状态，也没有监听任何传递给它的状态，也没有生命周期方法。实际上，它只是一个接受一些 prop 的函数。在这样的场景下，我们可以将组件标记为 functional，这意味它无状态 (没有响应式数据)，也没有实例 (没有 this 上下文)。
    // https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6
    functional: true,
    // render
    // 该渲染函数接收一个 createElement 方法作为第一个参数用来创建 VNode。
    // 如果组件是一个函数组件，渲染函数还会接收一个额外的 context 参数，为没有实例的函数组件提供上下文信息。
    // https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0
    render(createElement, context) {
        const data = {
            on: Transition
        };
        return createElement('transition', data, context.children);
    }
};
