<style lang='less' module>
.docx {
    height: 100%;
    overflow: auto;
}
</style>
<template>
    <div :class="$style.docx">
        docx 泰州公司物联网平台应用周报.docx
        <div id="wordView" v-html="vHtml"></div>
    </div>
</template>
<script>
import mammoth from 'mammoth'
export default {
    name:'Docx',
    data (){
    return {
         vHtml: "",
        // wordURL:'/泰州公司物联网平台应用周报.docx'
        wordURL:'/117西安金源风偏.docx'
    }
},
    computed: {  },
    watch: {  },
    created() {
        let vm=this;
        // vm.wordURL = this.$route.query.wordURL;

        const xhr = new XMLHttpRequest();
        xhr.open("get", this.wordURL, true);
        xhr.responseType = "arraybuffer";
        xhr.onload = function () {
        if (xhr.status == 200) {
            mammoth
            .convertToHtml({ arrayBuffer: new Uint8Array(xhr.response) })
            .then(function (resultObject) {
                debugger
                vm.$nextTick(() => {
                // document.querySelector("#wordView").innerHTML =
                //   resultObject.value;
                    vm.vHtml=resultObject.value;
                });
            });
        }
        };
        xhr.send();
  },
}
</script>