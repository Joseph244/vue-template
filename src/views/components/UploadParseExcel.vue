<style lang='less' module>
.UploadParseExcel {
    display: inline-block;
    h4 {
        color: @color-warning;
    }
}
</style>
<template>
  <div :class="$style.UploadParseExcel">
    <el-upload
      action=""
      :multiple="false"
      :show-file-list="false"
      accept="csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      :http-request="httpRequest"
    >
      <slot></slot>
      <!-- <el-button size="small" type="primary">上传</el-button> -->
    </el-upload>
    <el-dialog
      :visible.sync="show"
      title="excel数据内容"
      :close-on-click-modal="false"
      @on-cancel="cancel()"
    >
      <h4><i class="el-icon-warning"></i> 字段缺失或填写错误的数据会自动过滤</h4>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
      >
        <el-table-column
          v-for="item in columns"
          :key="item"
          :prop="item"
          :label="item"
        />
      </el-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancel">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="confirm"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import XLSX from 'xlsx';
export default {
  name: 'UploadParseExcel',
  data() {
    return {
      show: false,
      columns: [],
      tableData: []
    };
  },
  created() { },
  methods: {
    confirm() {
      this.$emit('excelData', this.tableData);
      this.cancel();
    },
    cancel() {
      this.show = false;
      this.tableData = [];
    },
    httpRequest(e) {
      let file = e.file; // 文件信息
      if (!file) {
        // 没有文件
        return false;
      } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        // 格式根据自己需求定义
        this.$message.error('上传格式不正确，请上传xls或者xlsx格式');
        return false;
      }

      const fileReader = new FileReader();
      fileReader.onload = ev => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: 'binary' // 以字符编码的方式解析
          });
          const exlname = workbook.SheetNames[0]; // 取第一张表
          const exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname]); // 生成json表格内容
          this.show = true;
          if (exl.length > 0) {
            this.columns = Object.keys(exl[0]);
            this.tableData = exl;
          }
          // document.getElementsByName('file')[0].value = '' // 根据自己需求，可重置上传value为空，允许重复上传同一文件
        } catch (e) {
          return false;
        }
      };
      fileReader.readAsBinaryString(file);
    }
  }
};
</script>