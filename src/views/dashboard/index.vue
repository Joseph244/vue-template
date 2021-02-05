<style lang="less" module>
.firstPage {
}
</style>
<template>
    <div :class="$style.firstPage">
        <el-button @click="clickButton">
            自动解锁按钮
        </el-button>
        <el-button @click="clickButtonManual">
            手动解锁按钮
        </el-button>
    </div>
</template>
<script>
import networkConfig from '@/api/networkConfig.js'
function ignoreMultiClick(func, manual = false) {
    let lock = false
    return function (...args) {
        if (lock) return
        lock = true
        let done = () => {
            console.log('解锁')
            lock = false
        }
        if (manual) return func.call(this, ...args, done)
        let promise = func.call(this, ...args)
        Promise.resolve(promise).finally(done)
        return promise
    }
}
export default {
    name: 'FirstPage',
    methods: {
        clickButton: ignoreMultiClick(function () {
            // if (!checkForm()) return // 假设有一些检测表单的操作，检查不通过则直接返回
            // 返回promise
            return networkConfig.jrNode_query().then(data => {
                // 表单提交成功
                console.log(data)
            }).catch(error => {
                // 表单提交出错
                console.log(error)
            })
        }),
        clickButtonManual:ignoreMultiClick(function (postParams, done) {
            //   if (!checkForm()) return done() // 表单验证不通过解锁
            networkConfig.jrNode_query().then(data => {
                // 表单提交成功
                console.log(data)
            }).catch(error => {
                // 表单提交出错
                console.log(error)
            }).finally(() => {
                done()  // 手动解锁，若不解锁则下次函数调用就无法发生
            }) 
        }, true)
    }
};
</script>
