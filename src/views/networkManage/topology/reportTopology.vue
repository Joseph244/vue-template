<style lang="less" module>
@import './reportTopology.less';
</style>

<template>
  <div :class="$style.container">
    <div id="stationTopology" ref="con" style="width: 100%; height: 100%"></div>
    <ul :class="$style.legend">
      <li>
        <img :src="`./topologyIcon/num3.png`" /> 接入节点
      </li>
      <li>
        <img :src="`./topologyIcon/4mnu.png`" /> 汇聚节点
      </li>
      <li>
        <img :src="`./topologyIcon/5mnu.png`" /> 传感器
      </li>
      <li>
        <i :class="$style.greenCircle"></i> 在线
      </li>
      <li>
        <i :class="$style.greyCircle"></i> 离线
      </li>
      <li>
        <i :class="$style.redCircle"></i> 告警
      </li>
    </ul>
  </div>
</template>

<script>
import stationData from './stationData';
import api from '@/api/topology';

export default {
  props: {
    stationId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // svg参数
      width: 1400,
      height: 800,
      offsetX: 700,
      nodeSize: [240, 150],
      // 拓扑数据
      data: JSON.parse(JSON.stringify(stationData)),
      nodes: [],
      links: []
    };
  },
  mounted() {
    this.width = this.$refs['con'].offsetWidth;
    this.height = this.$refs['con'].offsetHeight;
    this.offsetX = this.width / 2;

    this.tree = d3.layout
      .tree()
      .nodeSize(this.nodeSize)
      // .size([this.width, this.height - 80])
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
        const [x, y] = d3.event.translate;
        this.svg.attr('transform', 'translate(' + (x + this.offsetX) + ',' + (y + 40) + ') scale(' + d3.event.scale + ')');
      });

    this.svg = d3
      .select('#stationTopology')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .call(zoom)
      .append('g')
      .attr('class', 'content')
      .attr('transform', 'translate(' + this.offsetX + ', 40)');

    this.drawTree();
  },
  methods: {
    drawTree(source) {
      this.nodes = this.tree.nodes(this.data);
      this.links = this.tree.links(this.nodes);

      // this.nodes.map(item => (item.x = item.x - 80 * item.type));
      this.nodes.map((d, i) => (d.id = d.id || ++i));
      this.drawLink(source);
      this.drawNode(source);
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

      // 绘制节点
      this.drawNodeDetail(nodeItem);

      node.transition()
        .duration(800)
        .attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });

      node.exit()
        .transition()
        .duration(800)
        .attr('transform', function (d) {
          return 'translate(' + source.x + ',' + source.y + ')';
        })
        .remove();
    },
    drawNodeDetail(nodeItem) {
      nodeItem
        .append('image')
        .attr('width', d => [80, 60, 60, 40][d.type])
        .attr('height', d => [80, 60, 60, 40][d.type])
        .attr('transform', d => {
          const x = [40, 30, 30, 20][d.type];
          return 'translate(-' + x + ', 0)';
        })
        .attr(
          'xlink:href',
          d =>
            [
              `./topologyIcon/stationBig.png`,
              `./topologyIcon/access.png`,
              `./topologyIcon/convergence.png`,
              `./topologyIcon/sensorType.png`
            ][d.type]
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
        });

      const nodeItem2 = nodeItem.append('g').attr('transform', function (d) {
        return ['translate(-200, -5)', 'translate(-185, -5)', 'translate(-185, 5)', 'translate(-75, 60)'][d.type];
      });

      nodeItem2
        .append('text')
        .attr('dx', 0)
        .attr('dy', 0)
        .style('text-anchor', 'start')
        .style('fill', '#fff')
        .style('font-size', d => [18, 16, 16, 14][d.type])
        .style('font-weight', 'bold')
        .text(function (d) {
          return d.name;
        });

      const nodeHeight = d => (d.type === 0 ? 70 : d.type === 1 ? 50 : 30);

      nodeItem2
        .append('text')
        .attr('dx', 150)
        .attr('dy', 0)
        .style('text-anchor', 'end')
        .attr('font-family', 'FontAwesome')
        .style('font-size', 12)
        .style('fill', '#01d0c9')
        .style('cursor', 'pointer')
        .text('\uf013 配置');

      nodeItem2
        .append('rect')
        .style('fill', '#053736')
        .attr('x', 0)
        .attr('y', 10)
        .attr('width', 150)
        .attr('height', nodeHeight);

      nodeItem2
        .append('line')
        .attr('x1', 0)
        .attr('y1', 10)
        .attr('x2', 150)
        .attr('y2', 10)
        .style('stroke', '#006160')
        .style('stroke-width', 4);

      nodeItem2
        .append('line')
        .attr('x1', 0)
        .attr('y1', d => nodeHeight(d) + 10)
        .attr('x2', 150)
        .attr('y2', d => nodeHeight(d) + 10)
        .style('stroke', '#006160')
        .style('stroke-width', 3);

      // 行（接入，汇聚，传感器）
      const detailLine = nodeItem2
        .selectAll('g.line')
        .data(function (d, i) {
          if (d.type === 0)
            return [
              { icon: `./topologyIcon/num3.png`, data: d.accessInfo, title: '接入节点' },
              { icon: `./topologyIcon/num4.png`, data: d.convergenceInfo, title: '汇聚节点' },
              { icon: `./topologyIcon/num5.png`, data: d.sensorInfo, title: '传感器' }
            ];
          if (d.type === 1)
            return [
              { icon: `./topologyIcon/num4.png`, data: d.convergenceInfo, title: '汇聚节点' },
              { icon: `./topologyIcon/num5.png`, data: d.sensorInfo, title: '传感器' }
            ];
          return [{ icon: `./topologyIcon/num5.png`, data: d.sensorInfo, title: '传感器' }];
        })
        .enter()
        .append('g')
        .attr('class', 'line')
        .attr('transform', function (d, i) {
          return 'translate(0,' + (20 * (i + 1) + 5) + ')';
        });

      detailLine
        .append('a')
        .attr('xlink:title', d => d.title)
        .append('image')
        .attr('width', 16)
        .attr('height', 16)
        .attr('transform', 'translate(3, -8)')
        .attr('xlink:href', d => d.icon);

      // 数量
      const detailLineNode = detailLine
        .selectAll('g.lineNode')
        .data(function (d, i) {
          return d.data;
        })
        .enter()
        .append('g')
        .attr('class', 'lineNode')
        .attr('transform', function (d, i) {
          return 'translate(' + (i * 43 + 28) + ', 0)';
        });

      detailLineNode
        .append('circle')
        .attr('r', 4.5)
        .attr('fill', function (d, i) {
          return ['#50f632', '#b9bbb8', '#fe2f29'][i];
        });

      detailLineNode
        .append('text')
        .attr('dx', 10)
        .attr('dy', 5)
        .style('font-size', 12)
        .style('fill', '#00fff6')
        .text(function (d) {
          return d;
        });
    },
    drawLink(source) {
      const links = this.svg.selectAll('.link').data(this.links, function (d) {
        return d.target.id;
      });
      links
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('fill', 'none')
        .attr('stroke', '#006a68')
        .attr('stroke-width', '2px')
        .attr(
          'd',
          d3.svg
            .diagonal()
            .source(function (d) {
              const y = [80, 60, 60, 40][d.source.type];
              return { x: source ? source.x0 : 0, y: source ? source.y0 + y : 0 };
            })
            .target(function (d) {
              const y = [80, 60, 60, 40][d.source.type];
              return { x: source ? source.x0 : 0, y: source ? source.y0 + y : 0 };
            })
            .projection(function (d, i) {
              return [d.x, d.y];
            })
        );

      links
        .transition()
        .duration(800)
        .attr(
          'd',
          d3.svg
            .diagonal()
            .source(function (d) {
              const y = [80, 60, 60, 40][d.source.type];
              return { x: d.source.x, y: d.source.y + y };
            })
            .target(function (d) {
              return { x: d.target.x, y: d.target.y };
            })
            .projection(function (d, i) {
              return [d.x, d.y];
            })
        );

      links
        .exit()
        .transition()
        .duration(800)
        .attr(
          'd',
          d3.svg
            .diagonal()
            .source(d => {
              const y = [80, 60, 60, 40][source.type];
              return { x: source.x, y: source.y + y };
            })
            .target(d => {
              const y = [80, 60, 60, 40][source.type];
              return { x: source.x, y: source.y + y };
            })
            .projection(function (d, i) {
              return [d.x, d.y];
            })
        )
        .remove();
    },
    drawLink2(source = { x0: 0, y0: 0 }) {
      // 直线
      const elbow = (sourceX, sourceY, targetX, targetY) =>
        'M' + sourceX + ',' + sourceY + 'V' + ((targetY - sourceY) / 2 + sourceY) + 'H' + targetX + 'V' + targetY;
      // 折线
      const elbow2 = (sourceX, sourceY, targetX, targetY) =>
        'M' +
        sourceX +
        ',' +
        sourceY +
        'L' +
        (sourceX - 40) +
        ',' +
        ((targetY - sourceY) / 2 + sourceY) +
        'H' +
        (targetX + 40) +
        'L' +
        targetX +
        ',' +
        targetY;

      const links = this.svg.selectAll('.link').data(this.links, function (d) {
        return d.target.id;
      });
      links
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', () => {
          const sourceX = source.x0;
          const sourceY = source.y0 + 40;
          const targetX = source.x0;
          const targetY = source.y0 + 40;
          return elbow2(sourceX, sourceY, targetX, targetY);
        })
        .attr('fill', 'none')
        .attr('stroke', '#006a68')
        .attr('stroke-width', '2px');

      links
        .transition()
        .duration(800)
        .attr('d', d => {
          const sourceX = d.source.x;
          const sourceY = d.source.y + 40;
          const targetX = d.target.x;
          const targetY = d.target.y;
          return elbow2(sourceX, sourceY, targetX, targetY);
        });

      links
        .exit()
        .transition()
        .duration(800)
        .attr('d', () => {
          const sourceX = source.x;
          const sourceY = source.y + 40;
          const targetX = source.x;
          const targetY = source.y + 40;
          return elbow2(sourceX, sourceY, targetX, targetY);
        })
        .remove();
    },
    async getTreeData() {
      await api.getStationTree({ stationId: this.stationId });
    }
  }
};
</script>
