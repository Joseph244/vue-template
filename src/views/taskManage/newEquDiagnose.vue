<style lang="less" module>
.newEquDiagnose {
    height: 100%;
    width: 100%;
    padding: 20px;
    overflow: auto;
    .title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
        color: @color-primary;
        .tip {
            float: right;
            font-size: 14px;
            color: #fcc400;
        }
    }

    .upload {
        height: calc(100% - 220px);
    }
}
</style>
<template>
    <div :class="$style.newEquDiagnose">
        <div :class="$style.title">
            第一步：填写设备信息，然后[√确定]
            <span :class="$style.tip"><i class="el-icon-info"></i> 如不存在相应设备，可输入新建</span>
        </div>
        <EquInfoSearch :allowCreate="true" :searchBtn="false" btnType="add" @confirm="setEquInfo"></EquInfoSearch>
        <div :class="$style.title">第二步：选择局放文件，然后[√确认上传]</div>
        <UploadMutiFiles :disabled="step" :class="$style.upload" :dataInfo="dataInfo" @nextStep="nextStep"></UploadMutiFiles>
        <el-button style="float:right" type="primary" size="small" @click="goIntoTask" :disabled="!taskId">文件上传完毕，下一步</el-button>
    </div>
</template>
<script>
export default {
    name: 'newEquDiagnose',
    data() {
        return {
            dataInfo: {}, // 设备信息(equId+unitId)
            step: true,
            taskId: null
        };
    },
    mounted() {},
    methods: {
        setEquInfo(val) {
            this.dataInfo = val;
            this.step = false;
        },
        nextStep(val) {
            this.taskId = val;
        },
        goIntoTask() {
            this.$router.push({
                name: 'equDiagnoseDetail',
                params: {
                    taskId: this.taskId
                }
            });
        }
    }
};
</script>
