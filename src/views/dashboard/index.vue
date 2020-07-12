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
        <mutiBar
            style="height:45%"
            title="各电站设备类型缺陷数量"
            :legend="legend"
            :xAxisData="stations"
            :data="seriesData"
        ></mutiBar>
        <mutiBar
            style="height:45%"
            title="各电站设备类型缺陷修复数量"
            :legend="legend"
            :xAxisData="stations"
            :data="seriesData2"
        ></mutiBar>
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
      legend: [],
      seriesData: [],
      seriesData2: [],
      stations: []
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
      res = [
        {
          "station": "先锋边",
          "department": "台州市公司",
          "equTypeList": [
            {
              "equTypeName": "温度传感器",
              "defectCount": 16,
              "repairCount": 37,
              "equTypeId": "BfcebCAf-1bAF-FBCD-786e-a669c385aBf3"
            },
            {
              "equTypeName": "湿度传感器",
              "defectCount": 57,
              "repairCount": 4,
              "equTypeId": "fd785f6e-6f16-f2fa-9Ff8-2F9BD4c82B7A"
            }
          ]
        },
        {
          "station": "刚阳变",
          "department": "台州市公司",
          "equTypeList": [
            {
              "equTypeName": "温度传感器",
              "defectCount": 73,
              "repairCount": 75,
              "equTypeId": "1fA8BC62-91a0-695A-1ecc-Ee3F317ed1Fa"
            },
            {
              "equTypeName": "电压互感器",
              "defectCount": 29,
              "repairCount": 77,
              "equTypeId": "3c8BCC4d-469F-f3eb-B26a-C19CB69c11Ef"
            }
          ]
        },

        {
          "station": "浦口边",
          "department": "南京市公司",
          "equTypeList": [
            {
              "equTypeName": "温度传感器",
              "defectCount": 16,
              "repairCount": 37,
              "equTypeId": "BfcebCAf-1bAF-FBCD-786e-a669c385aBf3"
            },
            {
              "equTypeName": "电压传感器",
              "defectCount": 57,
              "repairCount": 4,
              "equTypeId": "fd785f6e-6f16-f2fa-9Ff8-2F9BD4c82B7A"
            }
          ]
        },
        {
          "station": "仙林变",
          "department": "南京市公司",
          "equTypeList": [
            {
              "equTypeName": "温度传感器",
              "defectCount": 73,
              "repairCount": 75,
              "equTypeId": "1fA8BC62-91a0-695A-1ecc-Ee3F317ed1Fa"
            },
            {
              "equTypeName": "电压互感器",
              "defectCount": 29,
              "repairCount": 77,
              "equTypeId": "3c8BCC4d-469F-f3eb-B26a-C19CB69c11Ef"
            }
          ]
        }
      ]
      this.stations = [];  // x-data
      this.seriesData = [];
      this.legend = [];
      let _legend = new Set()
      let _seriesData = new Map();
      for (let j of res) {
        this.stations.push(j.station);
        for (let k of j.equTypeList) {
          _legend.add(k.equTypeName)
          let key = `${k.equTypeName}`
          if (_seriesData.has(key)) {
            let val = _seriesData.get(key)
            val.defectData.push([j.station, k.defectCount])
            val.repairData.push([j.station, k.repairCount])
            _seriesData.set(key, val)
          } else {
            _seriesData.set(key, {
              name: k.equTypeName,
              type: 'bar',
              stack: '总数',
              defectData: [[j.station, k.defectCount]],
              repairData: [[j.station, k.repairCount]]
            });
          }

        }
      }
      // 格式类型转换
      this.legend = Array.from(_legend);
      for (let l of _seriesData.keys()) {
        let item = _seriesData.get(l)
        let item1 = JSON.parse(JSON.stringify(item))
        let item2 = JSON.parse(JSON.stringify(item))
        item1.data = item1.defectData
        item2.data = item2.repairData
        this.seriesData.push(item1)
        this.seriesData2.push(item2)
      }

    });
  }
};
</script>
