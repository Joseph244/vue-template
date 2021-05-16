import echarts from 'echarts';

// 主题配置
import darkTheme from './darkTheme';
import lightTheme from './lightTheme';
if (!echarts) {
    console.error('ECharts is not Loaded');
}

const echrtsTheme = () => {
    return process.env.VUE_APP_THEME === 'light' ? lightTheme : darkTheme;
};
// 注册echarts Theme 主题(官网配置地址： https://echarts.apache.org/zh/theme-builder.html)
echarts.registerTheme('customed', echrtsTheme());
