# vue-template

## 介绍

vue+elementUI+axios+vuex+vuerouter 的自动注册的后端开发模板

## 开发注意事项：

### 1.PUBLICPATH 与打包的注意事项：

放在 public 文件夹下引用的静态文件在引用时，要使用'./xxx'方式（而不是'/xxx'）,这样在 publicPath 打包之后就可以避免路径引用不到的问题；如果是 template 下的 html 中的话要如下写法：

```
 <img :src="`./topologyIcon/num3.png`" />
```

而不是

```
 <img src="./topologyIcon/num3.png" />
```

防止打包之后直接把图片压缩了
