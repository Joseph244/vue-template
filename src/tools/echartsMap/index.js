import echarts from 'echarts';
// echarts 的node_module 里面各个省的地图数据，需要哪个可直接引入
import jiangsuMapJson from '../../../node_modules/echarts/map/json/province/jiangsu.json';
// 江苏地图信息注册，之后在页面使用
echarts.registerMap('jiangsu', jiangsuMapJson);
