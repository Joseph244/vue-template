<style lang="less" module>
.test {
    width: 200px;
}
</style>
<template>
    <div :class="$style.test">
        <span v-label-shake>开发建设的方法绝地反击副教授副教授就</span>
        <div>
            <!-- <el-input v-model="input1" placeholder="请输入内容" /> -->
            <!-- <input :value="oldNum" @input="change" @change="change" /> -->

            <input v-model="input1" v-input-number />
            <input v-model="input2" v-input-number.float />
            <input v-model="input3" v-input-number.int />
            <input ref="file" type="file" name="file" webkitdirectory @change.stop="changesData" />
        </div>
    </div>
</template>
<script>
// import {} from '@/api'
export default {
    name: 'Test',
    data() {
        return {
            input1: null,
            input2: null,
            input3: null,
            input4: null,
            oldNum: null
        };
    },
    computed: {
        input() {
            return this.oldNum;
        }
    },
    watch: {},
    created() {
        
    },
    methods: {
        changesData(val) {
            console.log(this.$refs.file.files);
        },
        change(event) {
            let val = event.target.value.trim();
            if (/^[1-9]\d*$|^$/.test(val)) {
                this.oldNum = val;
            } else {
                event.target.value = this.oldNum;
            }
        }
    }
};
</script>
