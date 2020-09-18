<style lang="less" module>
@import './customTopology.less';
</style>

<template>
    <div ref="con" :class="$style.container">
        <div id="customTopology"></div>

        <div :class="$style.btns">
            <UploadParseExcel @excelData="getUploadSensor">
                <el-button type="primary" icon="el-icon-upload">
上传传感器
</el-button>
            </UploadParseExcel>
            <el-button
                type="primary"
                icon="el-icon-delete"
                style="margin-left: 10px"
                @click="emptyStation"
                    >
清空拓扑
</el-button>
            <el-button
                type="primary"
                icon="el-icon-document-checked"
                style="margin-left: 10px"
                @click="submit"
                    >
保存拓扑
</el-button>
        </div>

        <transition name="el-fade-in-linear">
            <ul v-show="menuVisible" id="menu" :class="$style.menu">
                <el-popover
                    v-if="curMenuItem.type === 3"
                    v-model="sensorTypeMenuVisible"
                    trigger="click"
                    placement="right-start"
                    @hide="hideSensorMenu"
                        >
                    <li slot="reference" :class="$style.menuItem">
                        <i class="el-icon-connection"></i> 挂载传感器
                    </li>
                    <ul v-if="getSensorMenu().length > 0" :class="$style.menu2">
                        <li v-for="(item, index) in getSensorMenu()" :key="index">
                            <el-popover
                                :value="curShowSensorType === item.sensorType"
                                placement="right-start"
                                @show="curShowSensorType = item.sensorType"
                                    >
                                <a slot="reference" :class="$style.title">{{ item.sensorType }}</a>
                                <div :class="$style.sensorContent">
                                    <div :class="$style.top">
                                        <el-checkbox
                                            :value="isSelectAll(item.sensorList)"
                                            @change="v => selectAllSensor(v, item.sensorList)"
                                                >
全选
</el-checkbox>
                                    </div>
                                    <ul :class="$style.menu3">
                                        <li v-for="(val, i) in item.sensorList" :key="i">
                                            <el-checkbox
                                                :value="isSelect(val.sensorId)"
                                                @change="v => selectSensor(v, val)"
                                                    >
ID_{{ val.sensorId }}
</el-checkbox>
                                        </li>
                                    </ul>
                                </div>
                            </el-popover>
                        </li>
                        <li :class="$style.btn">
                            <el-button type="primary" size="mini" @click="saveSensor">
确定
</el-button>
                        </li>
                    </ul>
                    <p v-else :class="$style.tip">
暂无传感器
</p>
                </el-popover>
                <li v-if="curMenuItem.type < 3" :class="$style.menuItem" @click="addNode">
                    <i class="el-icon-circle-plus-outline"></i> 新建节点
                </li>
                <li v-if="curMenuItem.type === 3" :class="$style.menuItem" @click="emptySensor">
                    <i class="el-icon-delete"></i> 清空传感器
                </li>
                <li
                    v-if="[2, 3].includes(curMenuItem.type)"
                    :class="$style.menuItem"
                    @click="delNode"
                        >
                    <i class="el-icon-remove-outline"></i> 删除节点
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
import _ from 'lodash';
import api from '@/api/topology';

export default {
  data() {
    return {
      // svg参数
      width: 1400,
      height: 800,
      nodeSize: [100, 130],
      offsetX: 700,
      // 拓扑数据
      data: {
        id: '1',
        name: '变电站',
        type: 1,
        children: [
          {
            id: '1-1',
            name: '接入节点1',
            type: 2,
            index: 1,
            children: [
              { id: '1-1-1', name: '汇聚节点1-1', type: 3, sensorList: [] },
              { id: '1-1-2', name: '汇聚节点1-2', type: 3, sensorList: [] }
            ]
          },
          {
            id: '1-2',
            name: '接入节点2',
            type: 2,
            index: 2,
            children: [
              { id: '1-2-1', name: '汇聚节点2-1', type: 3, sensorList: [] },
              {
                id: '1-2-2',
                name: '汇聚节点2-2',
                type: 3,
                sensorList: [
                  { sensorId: 1, sensorType: '低功耗传感器' },
                  { sensorId: 2, sensorType: '高功耗传感器' }
                ]
              }
            ]
          }
        ]
      },
      curMenuItem: {},
      nodes: [],
      links: [],
      // 所有挂载的传感器
      allSensorList: [],
      // 上传的传感器
      uploadSensorList: [],
      // 右键菜单
      menuVisible: false,
      sensorTypeMenuVisible: false,
      curShowSensorType: ''
    };
  },
  mounted() {
    this.width = this.$refs['con'].offsetWidth;
    this.height = this.$refs['con'].offsetHeight;
    this.offsetX = this.width / 2;

    // 重置全部已挂载传感器，根节点创建完整的树
    this.allSensorList = [];
    this.collapse(this.data);

    this.tree = d3.layout
      .tree()
      .nodeSize(this.nodeSize)
      // .size([width, height - 80])
      .separation(function (a, b) {
        return a.parent === b.parent ? 1 : 1;
      })
      .children(function (item) {
        return item.children;
      });

    const zoom = d3.behavior
      .zoom()
      .scaleExtent([0.5, 1])
      .on('zoom', () => {
        this.menuVisible && this.hideMenu();
        const [x, y] = d3.event.translate;
        this.svg.attr('transform', 'translate(' + (x + this.offsetX) + ',' + (y + 40) + ') scale(' + d3.event.scale + ')');
      });

    this.svg = d3
      .select('#customTopology')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .call(zoom)
      .on('contextmenu', d => d3.event.preventDefault())
      .append('g')
      .attr('class', 'content')
      .attr('transform', 'translate(' + this.offsetX + ', 40)');

    this.drawTree();
  },

  methods: {
    getSensorMenu() {
      // 汇聚节点可选择所有传感器 = 初始已添加传感器 + 上传传感器（根据sensorId去重）
      const allSensorList = _.uniqBy([...(this.curMenuItem.originSensorList || []), ...this.uploadSensorList], 'sensorId');
      // 传感器类型
      const sensorTypeList = _.uniq(allSensorList.map(item => item.sensorType));
      // 封装的传感器树
      const menuArray = [];
      sensorTypeList.map(item =>
        menuArray.push({
          sensorType: item,
          sensorList: allSensorList.filter(val => val.sensorType === item),
          visible: false
        })
      );
      return menuArray;
    },
    isSelect(sensorId) {
      return !!this.curMenuItem.sensorList.find(v => v.sensorId === sensorId);
    },
    isSelectAll(sensorList) {
      const dList = _.differenceBy(sensorList, this.curMenuItem.sensorList, 'sensorId');
      return dList.length === 0;
    },
    selectSensor(val, sensorInfo) {
      if (val) {
        this.curMenuItem.sensorList.push(sensorInfo);
      } else {
        _.remove(this.curMenuItem.sensorList, item => item.sensorId === sensorInfo.sensorId);
      }
      this.curMenuItem.sensorList = _.uniqBy(this.curMenuItem.sensorList, 'sensorId');
    },
    selectAllSensor(val, sensorList) {
      const sensorIdArray = sensorList.map(item => item.sensorId);
      if (val) {
        this.curMenuItem.sensorList.push(...sensorList);
      } else {
        _.remove(this.curMenuItem.sensorList, item => sensorIdArray.includes(item.sensorId));
      }
      this.curMenuItem.sensorList = _.uniqBy(this.curMenuItem.sensorList, 'sensorId');
    },
    // 确定添加传感器
    saveSensor() {
      this.curMenuItem.sensorListCopy = [...this.curMenuItem.sensorList];
      // 重置全部已挂载传感器，根节点创建完整的树
      this.allSensorList = [];
      this.collapse(this.curMenuItem);
      // 绘制拓扑
      this.drawTree(this.curMenuItem);
      this.hideMenu();
    },
    // 清空传感器
    emptySensor() {
      this.curMenuItem.sensorList = [];
      this.saveSensor();
    },
    // 添加节点
    addNode() {
      this.curMenuItem.children = this.curMenuItem.children || [];
      const index = this.curMenuItem.children.length + 1;
      const nodeObj = {
        id: this.curMenuItem.id + '-' + index,
        name: (this.curMenuItem.type === 1 ? '接入节点' : '汇聚节点' + this.curMenuItem.index + '-') + index,
        type: this.curMenuItem.type + 1,
        index
      };
      this.curMenuItem.type === 2 && (nodeObj.sensorList = []);
      this.curMenuItem.children.push(nodeObj);
      this.drawTree(this.curMenuItem);
      this.hideMenu();
    },
    // 删除节点
    delNode() {
      const parent = this.curMenuItem.parent;
      _.remove(parent.children, item => item.id === this.curMenuItem.id);
      // 删除后节点名称重置
      parent.children.map((item, index) => {
        item.name = (parent.type === 1 ? '接入节点' : '汇聚节点' + parent.index + '-') + (index + 1);
        item.index = index + 1;
        if (item.type === 2 && item.children) {
          item.children.map((value, i) => {
            value.name = '汇聚节点' + item.index + '-' + (i + 1);
            value.index = i + 1;
          });
        }
      });
      this.drawTree(parent);
      // tree画完后，节点id重置
      parent.children &&
        parent.children.map((item, index) => {
          item.id = parent.id + '-' + (index + 1);
          if (item.type === 2 && item.children) {
            item.children.map((value, i) => (value.id = item.id + '-' + (i + 1)));
          }
        });
      this.hideMenu();
    },
    hideSensorMenu() {
      this.curShowSensorType = '';
      if (this.curMenuItem.type === 3) this.curMenuItem.sensorList = [...this.curMenuItem.sensorListCopy];
    },
    // 节点右键菜单
    showMenu(e, d) {
      if (d.type > 3) return false;
      this.curMenuItem = d;
      this.menuVisible = true;
      this.sensorTypeMenuVisible = false;
      this.curShowSensorType = '';
      // sensorList拷贝一份
      if (this.curMenuItem.type === 3) this.curMenuItem.sensorListCopy = [...this.curMenuItem.sensorList];
      // 菜单位置定位
      const menu = document.querySelector('#menu');
      menu.style.display = 'block';
      menu.style.left = e.clientX - 0 + 'px';
      menu.style.top = e.clientY - 0 + 'px';
      // 给整个document添加监听鼠标事件，点击任何位置关闭菜单
      document.addEventListener('click', this.hideMenu);
      // 点击菜单本身，阻止向上冒泡
      menu && menu.addEventListener('click', e => e.stopPropagation());
    },
    hideMenu() {
      this.hideSensorMenu();
      this.curMenuItem = {};
      this.menuVisible = false;
      // 关掉监听
      const menu = document.querySelector('#menu');
      menu && menu.removeEventListener('click', e => e.stopPropagation());
      document.removeEventListener('click', this.hideMenu);
    },
    // 汇聚节点根据sensorList自动生成children树
    collapse(d) {
      if (d.type < 3 && d.children) {
        d.children.forEach(this.collapse);
      }
      if (d.type === 3) {
        const sensorList = d.sensorList || [];
        // 注册所有已经挂载的传感器
        this.allSensorList = _.uniqBy([...this.allSensorList, ...sensorList], 'sensorId');
        // 解析传感器类型
        const sensorTypeList = _.uniq(sensorList.map(item => item.sensorType));
        d.children = [];
        sensorTypeList.map((item, i) => {
          const typeId = d.id + '-' + (i + 1);
          const sensorInType = sensorList.filter(v => v.sensorType === item);
          d.children.push({
            id: typeId,
            name: item,
            type: 4,
            children: sensorInType.map((val, j) => ({
              id: typeId + '-' + (j + 1),
              name: 'ID_' + val.sensorId,
              type: 5
            }))
          });
        });
        // 拷贝最初的sensorList，用于和上传的文件，生成传感器选择列表
        d.originSensorList = d.originSensorList || [...sensorList];
      }
    },
    async submit() {
      const treeData = _.cloneDeep(this.data);
      function loop(d) {
        delete d.x;
        delete d.y;
        delete d.x0;
        delete d.y0;
        delete d.depth;
        delete d.parent;
        delete d.originSensorList;
        delete d.sensorListCopy;
        if (d.type === 3) {
          delete d.children;
        }
        if (d.children) {
          d.children.forEach(loop);
        }
      }
      loop(treeData);
      console.log(treeData);

      await api.saveMyTree({
        stationId: this.stationId,
        data: JSON.stringify(treeData)
      });
      this.$message({ message: '手动拓扑保存成功！', type: 'success' });
    },
    async emptyStation() {
      this.data.children = null;
      this.drawTree(this.data);
    },
    getUploadSensor(data) {
      const array = [];
      data.map(item => {
        array.push({
          sensorId: item['传感器ID'],
          sensorType: item['传感器类型']
        });
      });
      this.uploadSensorList = array;
    },
    drawTree(source) {
      this.nodes = this.tree.nodes(this.data);
      this.links = this.tree.links(this.nodes);

      this.drawNode(source);
      this.drawLink(source);
    },
    drawNode(source) {
      const node = this.svg.selectAll('g.item').data(this.nodes, d => d.id);
      const nodeItem = node
        .enter()
        .append('g')
        .attr('class', 'item')
        .attr('transform', function (d) {
          return source ? 'translate(' + source.x0 + ',' + source.y0 + ')' : 'translate(0, 0)';
        });

      nodeItem
        .append('text')
        .attr('dx', 0)
        .attr('dy', d => [80, 60, 60, 60, 60][d.depth])
        .style('text-anchor', 'middle')
        .style('fill', '#fff')
        .text(function (d) {
          return d.name;
        });

      nodeItem
        .append('image')
        .attr('width', d => [60, 40, 40, 40, 40][d.depth])
        .attr('height', d => [60, 40, 40, 40, 40][d.depth])
        .attr('transform', d => (d.depth === 0 ? 'translate(-30, 0)' : 'translate(-20, 0)'))
        .attr(
          'xlink:href',
          d =>
            [
              `./topologyIcon/stationBig.png`,
              `./topologyIcon/access.png`,
              `./topologyIcon/convergence.png`,
              `./topologyIcon/sensorType.png`,
              `./topologyIcon/sensor.png`
            ][d.depth]
        )
        .style('cursor', 'pointer')
        .on('click', (d, i) => {
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else if (d._children) {
            d.children = d._children;
            d._children = null;
          } else {
            return false;
          }
          // 把旧位置存下来，用以过渡
          d.x0 = d.x;
          d.y0 = d.y;
          this.drawTree(d);
        })
        .on('contextmenu', d => {
          // 把旧位置存下来，用以过渡
          d.x0 = d.x;
          d.y0 = d.y;
          d3.event.preventDefault();
          this.showMenu(d3.event, d);
        });

      const nodeEnter = node
        .transition()
        .duration(800)
        .attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });

      nodeEnter.select('text').text(function (d) {
        return d.name;
      });

      node.exit()
        .transition()
        .duration(800)
        .attr('transform', function (d) {
          return 'translate(' + source.x + ',' + source.y + ')';
        })
        .remove();
    },
    drawLink(source) {
      // 贝塞尔曲线
      const diagonal = d3.svg.diagonal().projection(function (d, i) {
        return [d.x, d.y];
      });

      const links = this.svg.selectAll('.link').data(this.links, function (d) {
        return d.target.id;
      });

      links
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', function (d) {
          const y = source ? (source.depth === 0 ? 85 : 65) : 0;
          var o = { x: source ? source.x0 : 0, y: source ? source.y0 + y : 0 };
          return diagonal({ source: o, target: o });
        })
        .attr('fill', 'none')
        .attr('stroke', '#006a68')
        .attr('stroke-width', '2px');

      links
        .transition()
        .duration(800)
        .attr('d', function (d) {
          const y = d.source.depth === 0 ? 85 : 65;
          return diagonal({ source: { x: d.source.x, y: d.source.y + y }, target: { x: d.target.x, y: d.target.y } });
        });

      links
        .exit()
        .transition()
        .duration(800)
        .attr('d', function (d) {
          const y = source.depth === 0 ? 85 : 65;
          var o = { x: source.x, y: source.y + y };
          return diagonal({ source: o, target: o });
        })
        .remove();
    },
    async getTreeData() {
      const res = await api.getMyTree({ stationId: this.stationId });
    }
  }
};
</script>
