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
            <el-button type="primary"><i class="el-icon-plus"></i> 新增缺陷类型</el-button>
        </div>
        <div :class="$style.content" ref="content">
            <el-table v-if="tableShow" :data="dataList" :span-method="handleSpan" border :max-height="tableMaxHeight">
                <el-table-column prop="index" label="序号" width="100" align="center"> </el-table-column>
                <el-table-column prop="defectTypeName" label="缺陷名称"> </el-table-column>
                <el-table-column prop="reasonName" label="缺陷原因"> </el-table-column>
                <el-table-column prop="defectTypeDesc" label="缺陷特征描述"> </el-table-column>
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
                    defectTypeName: 'ET定三还接采打传这快八不准',
                    defectTypeDesc: '过引记油区人真快公四飞拉指程关角系铁便',
                    defectTypeReasonList: ['11', '22', '33'],
                    defectTypeId: 'idqlbcsntj'
                },
                {
                    defectTypeName: 'ET斯治使指分王第产议',
                    defectTypeDesc: '第名花书育程交志听每在',
                    defectTypeReasonList: ['11', '22', '33'],
                    defectTypeId: 'idfvspyfchevj'
                },
                {
                    defectTypeName: 'ET起治增物后信保化次中成太',
                    defectTypeDesc: '者往革己整比全如但书听之',
                    defectTypeReasonList: ['11', '22', '33'],
                    defectTypeId: 'idmneaxtuzlrs'
                },
                {
                    defectTypeName: 'ET证农等级状建满',
                    defectTypeDesc: '接与设南把规派消之共织复儿且信系才外说',
                    defectTypeReasonList: ['11', '22', '33'],
                    defectTypeId: 'idzmiyxs'
                },
                {
                    defectTypeName: 'ET音这将部管',
                    defectTypeDesc: '须位白工特将这达明月然数决厂门',
                    defectTypeReasonList: ['11', '22', '33'],
                    defectTypeId: 'idunqnpkotb'
                },
                {
                    defectTypeName: 'ET气层规很资同小军她持手',
                    defectTypeDesc: '是党九电方无确或没按战果场',
                    defectTypeReasonList: ['11', '22', '33'],
                    defectTypeId: 'idcgpjlpfjxyos'
                },
                {
                    defectTypeName: 'ET国或低油光还家万',
                    defectTypeDesc: '话型青能变体数派过代着新其果电不',
                    defectTypeReasonList: ['11', '22', '33'],
                    defectTypeId: 'idkyrgpnmjpxp'
                },
                {
                    defectTypeName: 'ET位计系起他毛处约响角界',
                    defectTypeDesc: '区际使方方放名书众才标经应业',
                    defectTypeReasonList: ['11', '22', '33'],
                    defectTypeId: 'idurwdfkso'
                },
                {
                    defectTypeName: 'ET六果进速成水性世',
                    defectTypeDesc: '第积得比众研适并步进听之响走',
                    defectTypeReasonList: ['11', '22', '33'],
                    defectTypeId: 'idwjfrjl'
                },
                {
                    defectTypeName: 'ET组元专史边几明它下',
                    defectTypeDesc: '拉着由斯达切问律图众除织列解利际入形作',
                    defectTypeReasonList: ['11', '22', '33'],
                    defectTypeId: 'iddgnvj'
                },
                {
                    defectTypeName: 'ET重所习造实选',
                    defectTypeDesc: '面关求平量问切市江现',
                    defectTypeReasonList: ['11', '22', '33'],
                    defectTypeId: 'idsidmaklcsx'
                },
                {
                    defectTypeName: 'ET利拉多下统正体',
                    defectTypeDesc: '之万受军始家由己克公广很造少难设龙',
                    defectTypeReasonList: ['11', '22', '33'],
                    defectTypeId: 'idnftrurcjdv'
                },
                {
                    defectTypeName: 'ET便一包形她学义工',
                    defectTypeDesc: '而查他需由程加计务素该算特成什与金',
                    defectTypeReasonList: ['11', '22', '33'],
                    defectTypeId: 'idjieptciey'
                },
                {
                    defectTypeName: 'ET进造每院切原维发以月来',
                    defectTypeDesc: '头按速光后积制应改形',
                    defectTypeReasonList: ['11', '22', '33'],
                    defectTypeId: 'idiynljn'
                },
                {
                    defectTypeName: 'ET没保你有线在准',
                    defectTypeDesc: '我严任照写命一务干色计',
                    defectTypeReasonList: ['11', '22', '33'],
                    defectTypeId: 'idgiwmplcsjc'
                },
                {
                    defectTypeName: 'ET响想两团并格出知何',
                    defectTypeDesc: '且细图单果离以验表除细没二研头理长',
                    defectTypeReasonList: ['11', '22', '33'],
                    defectTypeId: 'idlowrwyz'
                }
            ]
        };
    },
    computed: {
        dataList() {
            const array = [];
            this.data.map((item, i) => {
                const reasonList = item.defectTypeReasonList || [];
                reasonList.map((value, j) => {
                    array.push({
                        index: i + 1,
                        defectTypeId: item.defectTypeId,
                        defectTypeName: item.defectTypeName,
                        defectTypeDesc: item.defectTypeDesc,
                        reasonName: value,
                        spanRow: j === 0,
                        spanRowNum: reasonList.length
                    });
                });
            });
            return array;
        }
    },
    watch: {},
    methods: {
        handleSpan({ row, column, rowIndex, columnIndex }) {
            if ([0, 1, 3, 4].includes(columnIndex)) {
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