<style lang='less' module>
.test {
    width: 100%;
    padding: 20px;
}
</style>
<template>
    <div :class="$style.test">
        <h1>测试的</h1>
        <pdf :src="fileUrl" :page="currentPage" style="width:500px" @num-pages="pageCount=$event" />
        <!-- 分页根据需求使用 -->
        <div v-if="pageCount > 1" class="page-view">
            <span class="turn" :class="{grey: currentPage==1}" @click="currentPage > 1 ? currentPage-- : 1">Preview</span>
            {{ currentPage }} / {{ pageCount }}
            <span class="turn" :class="{grey: currentPage==pageCount}" @click="currentPage < pageCount ? currentPage++ : 1">Next</span>
        </div>
    </div>
</template>
<script>
 import pdf from 'vue-pdf'
export default {
  name: 'Test',
     components: {
      pdf
    },
  data() {
    return {
      pageCount: 0,
        currentPage: 1,
        fileUrl: '/vue01_核心.pdf'
    };
  },
  computed: {
   
  },
  watch: {},
  created() { },
  methods: {
  
  }
};
</script>