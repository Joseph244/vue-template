<style lang="less" module>
@import './equDiagnoseDetail.less';
</style>

<template>
    <div :class="$style.container">
        <ul :class="$style.top">
            <li>设备单位：</li>
            <li>变电站：</li>
            <li>间隔单元：</li>
            <li>设备电压等级：</li>
            <li>设备类型：</li>
            <li>厂家：</li>
            <li>设备名称：</li>
            <li>设备部件：</li>
        </ul>
        <ul :class="$style.tab">
            <li v-for="item in tabInfo" :key="item.id" :class="activeTab === item.id ? $style.active : ''" @click="activeTab = item.id">
                <a>{{ item.name }}</a>
            </li>
        </ul>
        <div :class="$style.content">
            <dataAtlas v-show="activeTab === 1" />
            <diagnoseCheck v-if="activeTab === 2" />
        </div>
    </div>
</template>

<script>
import dataAtlas from './detail/dataAtlas';
import diagnoseCheck from './detail/diagnoseCheck';

export default {
    components: { dataAtlas, diagnoseCheck },
    data() {
        return {
            tabInfo: [
                { id: 1, name: '数据图谱' },
                { id: 2, name: '诊断复核' }
            ],
            activeTab: 1
        };
    },
    methods: {}
};
</script>
