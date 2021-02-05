export default {
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
