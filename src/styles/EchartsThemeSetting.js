// 此处为echarts 主题相关的配置项
const darkTheme = {
    colorsSeries: ['#30ce9b', '#24a8d4', '#e4c937', '#338cfb', '#fb7a33', '#9133fb', '#e74976'],
    axisColor: '#18a7a5',
    gridLine: '#12918c',
    dataZoom: {
        backgroundColor: 'rgba(9,99,97,0)',
        borderColor: '#08b4ae',
        fillerColor: 'rgba(9,99,97,0.5)',
        handleStyle: {
            color: '#18a7a5',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
        }
    }
};
const lightTheme = {
    colorsSeries: ['#30ce9b', '#24a8d4', '#e4c937', '#42f4bb', '#338cfb', '#fb7a33'],
    axisColor: 'grey',
    gridLine: '#f4f4f4',
    dataZoom: {}
};

const echrtsTheme = () => {
    return process.env.VUE_APP_THEME === 'light' ? lightTheme : darkTheme;
};
console.log(echrtsTheme());
export default echrtsTheme();
