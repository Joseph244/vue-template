<style lang='less' module>
.container {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 15px 20px 20px;

    .top {
        text-align: right;
        margin-bottom: 15px;
    }

    .content {
        flex: 1;
        overflow: hidden;
    }
}
</style>

<template>
    <div :class="$style.container">
        <div :class="$style.top">
            <el-button type="primary"><i class="el-icon-plus"></i> 新增电力设备类型</el-button>
        </div>
        <div :class="$style.content" ref="content">
            <el-table v-if="tableShow" :data="dataList" :span-method="handleSpan" border :max-height="tableMaxHeight">
                <el-table-column prop="index" label="序号" width="100" align="center"> </el-table-column>
                <el-table-column prop="equTypeName" label="电力设备类型"> </el-table-column>
                <el-table-column prop="unitName" label="部件名称"> </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'equUnit',
    data() {
        return {
            tableMaxHeight: 0,
            tableShow: false,
            data: [
                {
                    equTypeId: 'idlmjyvgutjtl',
                    equTypeName: 'ET角层资经在平通又',
                    unitList: [
                        {
                            unitId: 'UImwfonmxpkq',
                            unitName: 'UN江相交支世真学'
                        },
                        {
                            unitId: 'UIpteubxdvm',
                            unitName: 'UN期龙看往林改把形机'
                        },
                        {
                            unitId: 'UIwlrtch',
                            unitName: 'UN人即全连于确思复化'
                        }
                    ]
                },
                {
                    equTypeId: 'idqrbomjbku',
                    equTypeName: 'ET并象过区制政',
                    unitList: [
                        {
                            unitId: 'UIxtndhnn',
                            unitName: 'UN二难两龙者'
                        },
                        {
                            unitId: 'UIccrbrlwojl',
                            unitName: 'UN期世越会完'
                        }
                    ]
                },
                {
                    equTypeId: 'iddetngzem',
                    equTypeName: 'ET认称他被美队层',
                    unitList: [
                        {
                            unitId: 'UIcbyuybjpjg',
                            unitName: 'UN飞带系广生去他边论断儿'
                        },
                        {
                            unitId: 'UIafilgqisgy',
                            unitName: 'UN好里此问场来'
                        }
                    ]
                },
                {
                    equTypeId: 'idthfbomiowph',
                    equTypeName: 'ET行商动么适步果矿求队',
                    unitList: [
                        {
                            unitId: 'UIhbuxfwe',
                            unitName: 'UN由集农王亲八术到条团'
                        },
                        {
                            unitId: 'UIterwmgfmcgm',
                            unitName: 'UN存电率约确江论解候程'
                        }
                    ]
                },
                {
                    equTypeId: 'idsveqzrr',
                    equTypeName: 'ET路标局车百北',
                    unitList: [
                        {
                            unitId: 'UIlxqkomgnfv',
                            unitName: 'UN广资内建更采'
                        },
                        {
                            unitId: 'UIrbybywwux',
                            unitName: 'UN九声报种众历技并市如无压'
                        }
                    ]
                },
                {
                    equTypeId: 'idymelhod',
                    equTypeName: 'ET准况老出料合加交消政院',
                    unitList: [
                        {
                            unitId: 'UIaflxbkydlcqk',
                            unitName: 'UN切整信色后采光六政只'
                        }
                    ]
                },
                {
                    equTypeId: 'idwwnusbubpv',
                    equTypeName: 'ET三积部济果真儿组总温调打',
                    unitList: [
                        {
                            unitId: 'UIieuceodfd',
                            unitName: 'UN科给上农低称么点看'
                        },
                        {
                            unitId: 'UIkjdsobkokgs',
                            unitName: 'UN结商而己林年约能分信'
                        }
                    ]
                },
                {
                    equTypeId: 'idzwdbbxrkjr',
                    equTypeName: 'ET月理联产到养回正完',
                    unitList: [
                        {
                            unitId: 'UIkkbkr',
                            unitName: 'UN时人新国几列'
                        }
                    ]
                },
                {
                    equTypeId: 'idyeoay',
                    equTypeName: 'ET导切或流命目千名还天必',
                    unitList: [
                        {
                            unitId: 'UIzaclkevjs',
                            unitName: 'UN用作育道较支'
                        },
                        {
                            unitId: 'UIuommksehsih',
                            unitName: 'UN往件被三安海中际公列快往'
                        }
                    ]
                },
                {
                    equTypeId: 'idcfyxtbg',
                    equTypeName: 'ET叫非类战得情信',
                    unitList: [
                        {
                            unitId: 'UIdbhbtymvgrxv',
                            unitName: 'UN当与建干活很小调好会'
                        },
                        {
                            unitId: 'UIoppscm',
                            unitName: 'UN利选不越即表属不'
                        }
                    ]
                },
                {
                    equTypeId: 'idnywxdsl',
                    equTypeName: 'ET效见证产容指带',
                    unitList: [
                        {
                            unitId: 'UItplnxeeyq',
                            unitName: 'UN易段团反验风前次'
                        }
                    ]
                },
                {
                    equTypeId: 'idgirgpkerz',
                    equTypeName: 'ET教道决该几到位',
                    unitList: [
                        {
                            unitId: 'UIhbrwfxnklpno',
                            unitName: 'UN须深口海给去式因度直'
                        }
                    ]
                },
                {
                    equTypeId: 'idobvhaljy',
                    equTypeName: 'ET热矿指类温前江属间',
                    unitList: [
                        {
                            unitId: 'UIssgtjlv',
                            unitName: 'UN压住格而声可该被记'
                        },
                        {
                            unitId: 'UIgqssvogqwv',
                            unitName: 'UN包点自响张战满较如住酸术'
                        },
                        {
                            unitId: 'UIlrdougorkd',
                            unitName: 'UN查看号东教米'
                        }
                    ]
                },
                {
                    equTypeId: 'idjuctmxxi',
                    equTypeName: 'ET石设委经看布京',
                    unitList: [
                        {
                            unitId: 'UItjjwito',
                            unitName: 'UN取权万作亲确马里'
                        },
                        {
                            unitId: 'UInrpbtadqsu',
                            unitName: 'UN约具工家记酸做放低信'
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        dataList() {
            const array = [];
            this.data.map((item, i) => {
                const unitList = item.unitList || [];
                unitList.map((value, j) => {
                    array.push({
                        index: i + 1,
                        equTypeId: item.equTypeId,
                        equTypeName: item.equTypeName,
                        unitId: value.unitId,
                        unitName: value.unitName,
                        spanRow: j === 0,
                        spanRowNum: unitList.length
                    });
                });
            });
            return array;
        }
    },
    watch: {},
    methods: {
        handleSpan({ row, column, rowIndex, columnIndex }) {
            if ([0, 1, 3].includes(columnIndex)) {
                return row.spanRow ? [row.spanRowNum, 1] : [0, 0];
            }
        }
    },
    mounted() {
        this.tableMaxHeight = this.$refs.content.offsetHeight;
        this.tableShow = true;
    }
};
</script>