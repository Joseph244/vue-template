// mixin 实现表格高度随着窗口自适应
export default {
    data() {
        return {
            tableHeight: 400
        };
    },
    created() {},
    mounted() {
        window.addEventListener('resize', this.resizeHeight);
    },
    destroyed() {
        window.removeEventListener('resize', this.$chartMixinResize);
    },
    methods: {
        resizeHeight() {
            if (this.$refs.tableContent) {
                this.$nextTick(() => (this.tableHeight = this.$refs.tableContent.offsetHeight));
            }
        }
    }
};

// 使用方式
// 1.el-table 上层需要div 定义 ref="tableContent"

// 页面使用案例

//     <div>
//         <div v-loading="loading" ref="tableContent">
//             <el-table :data="dataList" stripe ref="elTable" :height="tableHeight">
//                 <el-table-column type="index" width="55">
//                     <template slot="header">
//                         序号
//                     </template>
//                 </el-table-column>
//                 <el-table-column prop="id" label="ID"> </el-table-column>
//                 <el-table-column prop="equType" label="设备类型"> </el-table-column>
//             </el-table>
//         </div>
//     </div>

// import equApi from '@/api/equ';
// import tableHeightMixin from '@/plugins/mixin/tableHeightResize';
// export default {
//     name: 'equTypeDict',
//     mixins: [tableHeightMixin],
//     data() {
//         return {
//             dataList: [],
//             loading: false,
//         };
//     },
//     async created() {
//         this.loading = true;
//         this.dataList = await equApi.equTypeList();
//         this.tableHeight = this.$refs.tableContent.offsetHeight;
//         this.loading = false;
//     }
// };
