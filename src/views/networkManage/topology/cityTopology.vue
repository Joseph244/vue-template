<style lang="less" module>
@import './cityTopology.less';
</style>

<template>
  <div :class="$style.container">
    <div
      id="cityTopology"
      ref="con"
      style="width: 100%; height: 100%"
    />
    <ul :class="$style.legend">
      <li><img src="/topologyIcon/num1.png"> 变电</li>
      <li><img src="/topologyIcon/num1.png"> 输电</li>
      <li><i :class="$style.greenCircle" /> 在线</li>
      <li><i :class="$style.greyCircle" /> 离线</li>
      <li><i :class="$style.redCircle" /> 告警</li>
    </ul>
  </div>
</template>

<script>
import cityData from './cityData';
import api from '@/api/topology';

export default {
    data() {
        return {
            // svg参数
            width: 1400,
            height: 800,
            offsetX: 700,
            nodeSize: [130, 240],
            // 变换参数
            translateX: 0,
            translateY: 0,
            scale: 1,
            // 拓扑数据
            data: JSON.parse(JSON.stringify(cityData)),
            nodes: [],
            links: [],
            lastOpen: null
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
            .separation(function(a, b) {
                return a.parent === b.parent ? 1 : 1;
            })
            .children(function(item) {
                return item.children;
            });

        const zoom = d3.behavior
            .zoom()
            .scaleExtent([0.5, 1])
            .on('zoom', () => {
                const [x, y] = d3.event.translate;
                this.translateX = x;
                this.translateY = y;
                this.scale = d3.event.scale;
                this.svg.attr('transform', 'translate(' + (x + this.offsetX) + ',' + (y + 40) + ') scale(' + d3.event.scale + ')');
            });

        this.svg = d3
            .select('#cityTopology')
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
            this.nodes = this.tree.nodes(this.data).reverse();
            this.links = this.tree.links(this.nodes);

            this.nodes.map((d, i) => (d.id = d.id || d.depth + '_' + ++i));
            this.drawNode(source);
            this.drawLink(source);
        },
        drawNode(source) {
            const node = this.svg.selectAll('g.item').data(this.nodes, (d, i) => {
                return d.id;
            });
            const nodeItem = node
                .enter()
                .append('g')
                .attr('class', 'item')
                .attr('transform', function(d) {
                    return source ? 'translate(' + source.x0 + ',' + (source.y0 + 100) + ')' : 'translate(0, 0)';
                });

            nodeItem
                .append('text')
                .attr('dx', 0)
                .attr('dy', d => (d.depth < 2 ? 90 : 65))
                .style('text-anchor', 'middle')
                .style('font-size', d => [22, 18, 16][d.depth])
                .style('fill', '#fff')
                .style('cursor', 'pointer')
                .text(d => d.name)
                .on('click', this.clickNode);

            nodeItem
                .append('image')
                .attr('width', d => (d.depth > 0 ? 40 : 56))
                .attr('height', d => (d.depth > 0 ? 40 : 56))
                .attr('xlink:href', d => (d.depth < 2 ? '/topologyIcon/' + d.name + '.png' : '/topologyIcon/station.png'))
                .attr('transform', d => ['translate(-62, 0)', 'translate(-45, 10)', 'translate(-20, 0)'][d.depth])
                .style('cursor', 'pointer')
                .on('click', this.clickNode);

            this.drawAreaNum(nodeItem); // 绘制区域数据节点
            this.drawStationNum(nodeItem); // 绘制站数据节点

            node.transition()
                .duration(800)
                .attr('transform', function(d) {
                    return 'translate(' + d.x + ',' + d.y + ')';
                });

            node.select('rect').style('fill', d => (d.isSelected ? 'rgba(7,98,96,0.76)' : '#053736'));
            node.selectAll('line').style('stroke', d => (d.isSelected ? '#18e5e1' : '#006160'));

            node.exit()
                .transition()
                .duration(800)
                .attr('transform', d => {
                    return 'translate(' + this.lastOpen.x + ',' + (this.lastOpen.y + 100) + ')';
                })
                .remove();
        },
        drawAreaNum(nodeItem) {
            const areaNumItem = nodeItem
                .append('g')
                .attr('transform', 'translate(0, 0)')
                .style('display', d => (d.depth < 2 ? 'block' : 'none'))
                .style('cursor', 'pointer')
                .on('click', this.clickNode);

            areaNumItem
                .append('rect')
                .style('fill', function(d) {
                    return d.isSelected ? 'rgba(7,98,96,0.76)' : '#053736';
                })
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', d => (d.depth > 0 ? 50 : 60))
                .attr('height', 60);

            areaNumItem
                .append('line')
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', d => (d.depth > 0 ? 0 : 60))
                .attr('y2', d => (d.depth > 0 ? 60 : 0))
                .style('stroke', d => (d.isSelected ? '#18e5e1' : '#006160'))
                .style('stroke-width', 2);

            areaNumItem
                .append('line')
                .attr('x1', d => (d.depth > 0 ? 50 : 0))
                .attr('y1', d => (d.depth > 0 ? 0 : 60))
                .attr('x2', d => (d.depth > 0 ? 50 : 60))
                .attr('y2', d => (d.depth > 0 ? 60 : 60))
                .style('stroke', d => (d.isSelected ? '#18e5e1' : '#006160'))
                .style('stroke-width', 2);

            const areaNum = areaNumItem
                .selectAll('g.areaNum')
                .data(d => [d.convertNum, d.transmissionNum])
                .enter()
                .append('g')
                .attr('transform', function(d, i) {
                    return 'translate(0,' + (30 * i + 20) + ')';
                });

            areaNum
                .append('a')
                .attr('xlink:title', (d, i) => ['变电', '输电'][i])
                .append('image')
                .attr('width', 15)
                .attr('height', 15)
                .attr('transform', 'translate(7, -12)')
                .attr('xlink:href', (d, i) => ['/topologyIcon/num1.png', '/topologyIcon/num2.png'][i]);

            areaNum
                .append('text')
                .attr('dx', 30)
                .attr('dy', 0)
                .style('font-size', 12)
                .style('fill', '#00fff6')
                .text(function(d) {
                    return d;
                });
        },
        drawStationNum(nodeItem) {
            const stationNumItem = nodeItem
                .append('g')
                .attr('transform', 'translate(-60, 80)')
                .style('display', d => (d.depth === 2 ? 'block' : 'none'));

            stationNumItem
                .append('rect')
                .style('fill', '#053736')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', 120)
                .attr('height', 30);

            stationNumItem
                .append('line')
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', 120)
                .attr('y2', 0)
                .style('stroke', '#006160')
                .style('stroke-width', 2);

            stationNumItem
                .append('line')
                .attr('x1', 0)
                .attr('y1', 30)
                .attr('x2', 120)
                .attr('y2', 30)
                .style('stroke', '#006160')
                .style('stroke-width', 2);

            const stationNum = stationNumItem
                .selectAll('g.stationNum')
                .data(d => [d.onlineNum, d.offlineNum, d.alarmNum])
                .enter()
                .append('g')
                .attr('transform', function(d, i) {
                    return 'translate(' + (i * 40 + 8) + ', 15)';
                });

            stationNum
                .append('circle')
                .attr('r', 4.5)
                .attr('fill', function(d, i) {
                    return ['#58f344', '#bababa', '#fb3232'][i];
                });

            stationNum
                .append('text')
                .attr('dx', 6)
                .attr('dy', 5)
                .style('font-size', 12)
                .style('fill', '#00fff6')
                .text(function(d) {
                    return d;
                });
        },
        drawLink(source) {
            const links = this.svg.selectAll('.link').data(this.links, function(d) {
                return d.target.id;
            });

            links
                .enter()
                .append('path')
                .attr('class', 'link')
                .attr(
                    'd',
                    d3.svg
                        .diagonal()
                        .source(function(d) {
                            return { x: source ? source.x0 : 0, y: source ? source.y0 + 100 : 0 };
                        })
                        .target(function(d) {
                            return { x: source ? source.x0 : 0, y: source ? source.y0 + 100 : 0 };
                        })
                        .projection(function(d, i) {
                            return [d.x, d.y];
                        })
                )
                .attr('fill', 'none')
                .attr('stroke', '#006a68')
                .attr('stroke-width', '2px');

            links
                .transition()
                .duration(800)
                .attr(
                    'd',
                    d3.svg
                        .diagonal()
                        .source(function(d) {
                            return { x: d.source.x, y: d.source.y + 100 };
                        })
                        .target(function(d) {
                            return { x: d.target.x, y: d.target.y };
                        })
                        .projection(function(d, i) {
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
                            return { x: this.lastOpen.x, y: this.lastOpen.y + 100 };
                        })
                        .target(d => {
                            return { x: this.lastOpen.x, y: this.lastOpen.y + 100 };
                        })
                        .projection(function(d, i) {
                            return [d.x, d.y];
                        })
                )
                .remove();
        },
        clickNode(d) {
            this.selectCity(1, d);
            this.$emit('onSelect', d);
        },
        selectCity(type, data) {
            let d = {};
            if (type === 1) d = data;
            if (type === 2) d = this.nodes.find(item => item.name === data);

            if (!d) return false;
            if (d.depth === 0) return false;
            if (d.depth === 2) return false;
            if (d.isSelected && type === 2) return false;

            if (d.isSelected) {
                d.children = null;
                d.isSelected = false;
            } else {
                const openItem = this.data.children.find(item => item.isSelected);
                if (openItem && openItem.children) {
                    openItem.children = null;
                    openItem.isSelected = false;
                }
                d.children = d.stationList || [];
                d.isSelected = true;
            }

            // 把旧位置存下来，用以过渡动画
            d.x0 = d.x;
            d.y0 = d.y;
            this.drawTree(d);

            // 记录上一次展开节点
            this.lastOpen = d;

            // 选择节点移动至中央位置
            const nodeWidth = this.nodeSize[0];
            const num = d.parent.children.findIndex(item => item.id === d.id);
            const halfNum = (d.parent.children.length - 1) / 2;
            const position = nodeWidth * (halfNum - num) * this.scale + this.width / 2;
            this.offsetX = position - this.translateX;
            this.svg
                .transition()
                .duration(800)
                .attr('transform', 'translate(' + position + ',' + (this.translateY + 40) + ') scale(' + this.scale + ')');
        },
        async getTreeData() {
            const res = await api.getCityTree({
                stationIdList: []
            });
        }
    }
};
</script>
