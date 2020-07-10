<style lang="less" module>
.firstPage {
    height: 100%;
    width: 100%;
    padding: 10px;
    overflow: auto;
    .titleRow {
        margin: 10px 0;
        span {
            margin: 0 10px;
            color: cyan;
            font-weight: bold;
        }
    }
    .row {
        display: flex;
        height: 45%;
    }
}
</style>
<template>
    <div :class="$style.firstPage">
        <div :class="$style.titleRow">
            <span>缺陷总数： {{ defectTotalData.defectTotal }}</span>
            <span>已修复： {{ defectTotalData.repairCount }}</span>
            <span>未修复： {{ defectTotalData.unrepairCount }}</span>
        </div>
        <div :class="$style.row">
            <equTypeDefects title="各设备类型缺陷数量" :data="equTypeDefectsData"></equTypeDefects>
            <equTypeDefects title="各厂商缺陷数量" :data="companyDefectsData"></equTypeDefects>
        </div>
        <mutiBar style="height:45%" title="地市公司设备类型缺陷数量" :departments="departments" :data="departmentStationDefectsData"></mutiBar>
    </div>
</template>
<script>
import statsApi from '@/api/stats.js';
import equTypeDefects from './baseBar';
import mutiBar from './mutiBar';
export default {
    name: 'firstPage',
    components: {
        equTypeDefects,
        mutiBar
    },
    data() {
        return {
            equTypeDefectsData: [],
            companyDefectsData: [],
            defectTotalData: [],
            departmentStationDefectsData: [],
            departments: []
        };
    },
    computed: {},
    watch: {},
    methods: {},
    created() {
        statsApi.equTypeDefects().then(res => {
            this.equTypeDefectsData = [];
            for (let i of res) {
                this.equTypeDefectsData.push([i.equTypeName, i.defectCount]);
            }
        });
        statsApi.companyDefects().then(res => {
            this.companyDefectsData = [];
            for (let i of res) {
                this.companyDefectsData.push([i.company, i.defectCount]);
            }
        });
        statsApi.defectTotal().then(res => {
            this.defectTotalData = res;
        });
        statsApi.departmentStationDefects().then(res => {
            this.departments = [];
            this.departmentStationDefectsData = [];
            for (let i of res) {
                this.departments.push(i.department);
                for (let j of i.stationList) {
                    for (let k of j.equTypeList) {
                        let val = [i.department, k.defectCount];
                        let item = {
                            name: k.equTypeName,
                            type: 'bar',
                            stack: j.station,
                            data: []
                        };

                        this.departmentStationDefectsData.push(item);
                    }
                }
            }
        });
    }
};
</script>
