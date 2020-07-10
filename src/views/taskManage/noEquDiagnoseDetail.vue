<style lang="less" module>
@import './noEquDiagnoseDetail.less';
</style>

<template>
    <div :class="$style.container">
        <ul :class="$style.tab">
            <li v-for="item in tabInfo" :key="item.id" :class="activeTab === item.id ? $style.active : ''" @click="activeTab = item.id">
                <a>{{ item.name }}</a>
            </li>
        </ul>
        <div :class="$style.content">
            <dataAtlas :taskId="taskId" v-show="activeTab === 1" />
            <diagnoseResult v-if="activeTab === 2" />
        </div>
    </div>
</template>

<script>
import dataAtlas from './detail/dataAtlas';
import diagnoseResult from './detail/diagnoseResult';

export default {
    components: { dataAtlas, diagnoseResult },
    data() {
        return {
            tabInfo: [
                { id: 1, name: '数据图谱' },
                { id: 2, name: '诊断结果' }
            ],
            activeTab: 1,
            taskId: -1
        };
    },
    mounted() {
        this.taskId = this.$route.params.taskId;
    }
};
</script>
