# vue2-template

## 介绍

vue+elementUI+axios+vuex+vuerouter 的自动注册的后端开发模板

## 功能清单

1. - [x] global.js // 应用内全局变量,便于各个页面共享，组件内无需定义可直接 this 方式访问

2. - [x] piublic/config/WENV.js // 打包后全局变量，方便现场部署修改而无需重新打包

3. - [x] bus 全局事件通信

4. - [x] 全局组件自动注册加载

5. - [x] 多个主题样式开发与独立打包，less 全局变量抽离

6. - [ ] axios 请求封装
   - [ ] 拦截器统一处理请求响应
   - [ ]  预防用户误触接口重复请求与请求取消
   - [ ]  接口数据缓存与重发机制

7. - [ ] vuex 数据的本地化存储

8. - [x] assset/svg 用于网络下载的 svg 图标直接使用

9. - [x] websocket.js // 用于 websocket 的页面使用

10. - [x] 图标打包雪碧图与 css 样式加载

11. - [ ] mixin 
    - [x] 实现表格高度随着窗口自适应
    - [ ] echarts resize 窗口自适应

12. - [ ] 权限控制 directive 自定义指令实现

13. 常用 js 工具组件
    - [x] 日期时间格式化
    - [x] url参数解析
    - [x] 对象数组中按照对象的某个属性进行排序方法
    - [x] 全屏切换方法
    - [x] 去除字符串特殊字符，返回去处置后的结果
    - [x] 过滤对象属性key，得到新对象
    - [x] 导出页面数据到excel
    - [x] excel解析为json数据
    - [ ] 对称加解密方法
    - [ ] echarts 地图组件集成
    - [ ] gis地图集成
    
14. - [ ] 外部字体引入方式

15. - [ ] 大屏开发动画效果demo总结

16. - [ ] fetch尝鲜替代axios请求方式集成
    - [ ] 前端单元测试集成方法可用性调研

17. - [ ] 字体大小统一规划，按照模块设置，减少组件内过多font-size,也可通过h1 h2 h3 h4 h5 和全局变量统一设置部分常用字体

- -------VUE2 框架工程模板（脚手架版本） -------
- [ ] 仿照 fes.js 通过脚手架实现框架的自动选择，如左侧菜单还是顶部菜单等功能
- [ ] webpack2 3 4 主要升级的点是什么，结合打包可视化包进行对比
- [ ] vue-cli  webpack  vite 三种打包方式优化对比（同一个工程采用多种打包方式实现）

------- VUE3 框架工程模板(该模板会放在另外的工程中实现) -------

- [ ] vite+vue3 + typescript  实现 （可以参考element-admin 等的ts版本）
-   [ ] typescript + vue3 工程重构实现



---- Node Script (fe-deploy) 工作项 ---

- [ ] 支持版本回退
- [ ] 支持问询是否执行build 指令

## 开发注意事项：

### 1.运行命令

"scripts": {  
"dev": "vue-cli-service serve --mode dev", // 开发运行命令，默认主题开发（对应根目录下.env.dev 的配置）

"dev-light": "vue-cli-service serve --mode devA", // 开发运行命令，浅色主题（对应根目录下.env.dev 的配置）

"prebuild": "echo '打包开始'", // 打包前命令

"postbuild": "echo '打包完毕'", // 打包后命令

"release:patch": "npm version patch", // 小版本升级（bug 优化）

"release:minor": "npm version minor", // 中版本升级 （需求稍大的变更）

"release:major": "npm version major", // 大半本变更（迭代整体升级）

"build-dark": "vue-cli-service build --mode prod", // 打包深色主题

"build-light": "vue-cli-service build --mode prodA", // 打包浅色主题

"build": "npm-run-all --parallel build:dark build:light", // 并行执行多个 script 脚本，串行写法是 npm run build-light & npm run build-dark",

"lint": "vue-cli-service lint" // 格式检查与处理 }

## 功能清单

### 全局变量的定义方式

global.js // 应用内全局变量,便于各个页面共享，组件内无需定义可直接 this 方式访问

piublic/config/WENV.js // 打包后全局变量，方便现场部署修改而无需重新打包



前端的全局配置是为了方便一些经常变更的配置项，单独提出来，可在打包部署之后进行修改；开发者使用时，在 vue 中直接获取 window.WENV.xxx 即可；放在 piublic/config/WENV.js 如下（采用闭包方式防止和其他全局变量发生污染）：

```
/**
 * 此处为前端配置文件，可在打包部署之后进行修改；
 * 开发者使用时，在vue中直接获取window.WENV.xxx 即可
 * */

window.WENV = (function() {
    return {
        // 批量导入传感器解析key-value配置：value为解析模板表头
        BATCH_ADD_SENSOR: {
            sensorNo: '传感器型号',
            sensorCode: '传感器标识（10进制）',
            sensorTypeName: '传感器类型名称',
            location: '安装位置',
            equId: '挂载电力设备ID',
            equName: '挂载电力设备名称',
            manufacturer: '生产厂家',
            phase: '相位',
            powerType: '取电方式（电池、感应）',
            interval: '采样间隔（秒）'
        }
    };
})();
```

 

### bus 全局事件通信

组件内

```javascript
this.$Bus.$emit('xxx', nnnn)
```

接收端

```javascript
this.$Bus.$on('xxxx', value => {
	// 处理逻辑,收到的value = 上面的 nnn
})
```





### 全局组件自动注册加载

### 多个主题样式开发与独立打包，less 全局变量抽离

### axios 请求约定与使用

#### 1.拦截器统一处理请求响应

#### 2.预防用户误触接口重复请求与请求取消

#### 3.接口数据缓存与重发机制

### vuex 数据的本地化存储

### svg 图标的引入与使用

assset/svg 用于网络下载的 

将要使用的 svg 图标或文件复制到工程 assets/svg/目录下，然后在代码中即可使用，如在阿里云图标网（https://www.iconfont.cn/）下载想用图标的svg文件； 如果需要修改 svg 的图标颜色，可以修改 svg 代码中的"fill="#4B5AA7"，或者删除该项，再使用 css 去设置样式代码如下：

```
<svgIcon name="backIcon-2" />    引用的是assets/svg/backIcon-2.svg

<svgIcon style="fill: red;" name="sensor" />
<svgIcon :class="$style.icon"  name="sensor" />      引用的是assets/svg/sensor.svg
此处写:class="$style.icon"，可以对图标颜色等样式重写
```



### png图标引入与使用（雪碧图优化）

将切图的xxx.png图标拷贝到/assets/spriteImgs/下，则可以通过< i class = 'icon icon-xxx'></i>实现使用；

如将alert.png拷贝到/assets/spriteImgs/下，代码中即可如下方式使用

```html
<i class="icon icon-alert"></i>
```

但是雪碧图的大小难以通过常规的width,height来控制其图片大小，建议只有在图片不做大小缩放的场景下使用



### websocket 的使用

websocket.js // 用于 websocket 的页面使用



### 表格高度随窗口自适应使用方式

### echarts resize 窗口自适应

### 权限控制 directive 自定义指令使用

### 常用 js 工具组件

1. 日期时间格式化

2. url参数解析

3. 对象数组中按照对象的某个属性进行排序方法
4. 全屏切换方法、
5. 去除字符串特殊字符，返回去处置后的结果
6. 过滤对象属性key，得到新对象
7. 导出页面数据到excel
8. excel解析为json数据

### 2.PUBLICPATH 与打包的注意事项：

放在 public 文件夹下引用的静态文件在引用时，要使用相对路径'./xxx'方式（而不是绝对路径'/xxx'）,这样在 publicPath 打包之后就可以避免路径引用不到的问题，即使采用 nginx 部署也可以根据页面的 baseUrl 相对路径获取请求结果；

如果是 template 下的 html 中要引用 public 下的静态资源的话，要采用模板字符串方式，写法如下：

```
 <img :src="`./topologyIcon/num3.png`" />
```

而不是

```
 <img src="./topologyIcon/num3.png" />
```

防止打包之后找不到资源或者直接把图片压缩了



### 字体引入

字体要放在public/fonts目录下，页面采用绝对路径加载

如下url 均为绝对路径：

```
@font-face {
    font-family: 'LEDD';
    src: url('/fonts/led.woff') format('woff'), url('/fonts/led.eot') format('truetype');
    font-weight: 400;
    font-display: 'auto';
    font-style: normal;
}
```



