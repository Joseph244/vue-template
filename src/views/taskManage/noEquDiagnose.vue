<style lang="less" module>
.noEquDiagnose {
    height: 100%;
    width: 100%;
    padding: 20px;
    .tips {
        margin: 20px 0;
        font-size: 16px;
        color: #fcc400;
        text-align: center;
    }
    .content {
        height: calc(100% - 50px);
    }
}
</style>
<template>
    <div :class="$style.noEquDiagnose">
        <p :class="$style.tips">
            无设备诊断只作为临时诊断，不会关联设备； 如需关联设备可在诊断结果中转为设备诊断
        </p>
        <UploadMutiFiles :class="$style.content"></UploadMutiFiles>
    </div>
</template>
<script>
export default {
    name: 'noEquDiagnose',
    props: {
        equInfo: {
            type: Object,
            default: () => {
                return null;
            }
        }
    },
    data() {
        return {};
    },
    computed: {},
    methods: {}
};
</script>
