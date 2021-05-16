// 输入只能为数字的自定义指令
const index = {
    update(el, binding) {
        let { value } = el;
        // modifiers为修饰符对象，传入了float，则其float属性为true
        if (binding.modifiers.float) {
            // 支持float
            let tmp = parseFloat(value);
            el.value = nanCheck(tmp);
        } else if (binding.modifiers.int) {
            // 支持负数
            let tmp = parseInt(value);
            el.value = nanCheck(tmp);
        } else {
            // 默认为正整数
            el.value = value.replace(/[^\d]/g, '');
        }
    }
};
function nanCheck(tmp) {
    if (isNaN(tmp)) {
        return '';
    } else {
        return tmp;
    }
}
export default index;

// 使用案例
/* <input v-model="input1" v-input-number />
<input v-model="input2" v-input-number.float />
<input v-model="input3" v-input-number.int />

// 如果结合elementUI使用则为：
 <div class="el-input el-input--mini">
    <input class="el-input__inner" v-model="scope.row.interval" v-input-number />
</div>
*/
