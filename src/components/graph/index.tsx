import React, { useEffect } from 'react';
import css from './index.module.less';
import graphData from './data';
import * as d3 from 'd3';

type abc = string | number | boolean | null | 'true';

interface IGraphProps {
  title?: string;
}

const Graph: React.FC<IGraphProps> = (props: IGraphProps) => {
  type INode = d3.SimulationNodeDatum & {
    id: number;
    code: number;
    name: string;
    type: string;
    level: number;
    colorIdx: number;
    keyword: string;
    // layout?: {};
    // layoutList?: {};
  };

  type ILink = d3.SimulationLinkDatum<INode> & {
    label?: string;
  };

  const nodesData: INode[] = graphData.nodes;
  const linksData: ILink[] = graphData.relations;

  useEffect((): void => {
    initSvg();
    initForceSimulation();
  }, []);
  const svgData = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
    svgW: 800,
    svgH: 800,
    colorList: ['#967adc', '#8cc152', '#3bafda', '#f6bb42', '#37bc9b', '#ff7e90', '#ff7043'],
    rediusList: [100, 70, 60, 40, 25],
    fontSizeList: [26, 24, 20, 20, 20, 15],
  };
  const initSvg = (): void => {
    d3.select('#graph-container')
      .append('svg')
      .attr('viewBox', '-100 -200 1300 1105')
      .attr('width', svgData.svgW)
      .attr('height', svgData.svgH)
      .append('g')
      .attr('transform', `translate(${svgData.top}, ${svgData.left})`);
  };

  const initForceSimulation = () => {
    // 创建一个弹簧力，根据 link 的 strength 值决定强度
    const linkForce = d3
      .forceLink<INode, ILink>(linksData)
      .id(data => {
        // return "'" + data.code + "'";
        return data.code.toString();
      })
      .distance(({ target }) => {
        // 无分支的节点
        // console.log(data)
        if ((target as INode).name === '荣誉' || (target as INode).name === '组织') {
          return 200;
        } else {
          return (target as INode).level === 5
            ? (target as INode).level * 22
            : (target as INode).level * 3;
        }
      });

    // 资源节点与信息节点间的 strength 小一点，信息节点间的 strength 大一点
    // .strength(link => link.strength);

    // 创建一个力导向图
    const simulation = d3
      .forceSimulation<INode, ILink>(nodesData)
      .alpha(2) // 活力，渲染之后再自动动多久
      .force('link', linkForce) // 映射id & 线的长度
      .force(
        'collide',
        d3
          .forceCollide(data => {
            const d = data as INode;
            if (d.name === '吴恩达' && d.level === 1) {
              d.fx = svgData.svgW / 1.1; // 设置特定节点固定x坐标
              d.fy = svgData.svgH / 1.5;
            }
            return 120 - d.level * 14;
          })
          .iterations(0.5)
          .strength(0.5),
      )
      .force(
        'charge',
        d3
          .forceManyBody()
          // .strength(d => -(9 - d.level) * 30)
          .theta(0.01)
          .distanceMin(15)
          .distanceMax(20),
      );
    simulation.nodes(nodesData).on('tick', () => {
      edges
        .attr('x1', ({ source }) => (source as INode).x || 0)
        .attr('y1', ({ source }) => (source as INode).y || 0)
        .attr('x2', ({ target }) => (target as INode).x || 0)
        .attr('y2', ({ target }) => (target as INode).y || 0);
      nodes.attr('transform', data => `translate(${data.x}, ${data.y})`);
      // linkTagsSelection.attr(
      //   'd',
      //   d => 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y,
      // );
    });
    // simulation.force('link').links(linksData);

    // 绘制实体节点
    const nodes = d3
      .select('svg g')
      .append('g')
      .attr('class', 'nodes')
      .selectAll('.node')
      .data(nodesData)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('name', data => {
        // console.log(data);
        return data.name;
      });

    // .call(d3.drag().on('start', this.started).on('drag', this.dragged).on('end', this.ended))
    // .on('click', d => {
    //   // this.clickNodeHandle(d);
    // });

    nodes
      .append('circle')
      .attr('class', 'circle-node')
      // .attr('nodes', d => d)
      .attr('r', d => svgData.rediusList[d.level])
      .attr('fill', d => svgData.colorList[d.colorIdx])
      .attr('stroke', '#fff')
      .attr('stroke-width', '4px')
      .attr('style', 'cursor: pointer;')
      .attr('nodeTest', d => JSON.stringify(d))
      .attr('transform', data => `translate(${data.x}, ${data.y})`);

    nodes
      // .filter(d => {
      //   if (d.level && d.level < 4) {
      //     return this;
      //   }
      // })
      .append('text')
      .attr('style', d => {
        return `cursor: pointer; text-anchor: middle;font-size:${
          svgData.fontSizeList[d.level - 1]
        }px`;
      })
      .selectAll('tspan')
      .data((d: INode): any => {
        if (d.name) {
          if (d.name.includes('.')) {
            return d.name.split('.') || '';
          } else {
            return d.name.split(' ') || '';
          }
        }
      })

      .join('tspan')
      .attr('fill', '#f1f1f1')
      .attr('x', 0)
      .attr('y', (d, i, nodes) => {
        if (nodes) {
          return `${i - nodes.length / 2 + 1.8}em`;
        } else {
          return `0em`;
        }
      })
      .text(name => name as string);

    // 绘制关系线
    const edges = d3
      .select('svg g')
      .append('g')
      .attr('class', 'edges')
      .selectAll('line')
      .data(linksData)
      .enter()
      .append('line')
      .attr('class', 'edge')
      .attr('stroke', 'red')
      .attr('stroke-width', '2px');
    // .style('display', 'none');
  };

  // 绘制关系标签
  // const renderRelationTag = () => {
  //   console.log('关系标签');
  // };
  // const renderNodes = () => {
  //   // 绘制实体节点
  //   const nodes = d3
  //     .select('svg g')
  //     .append('g')
  //     .selectAll('.node')
  //     .data(data.nodes)
  //     .enter()
  //     .append('g')
  //     .attr('class', 'node')
  //     .attr('name', data => {
  //       console.log(data);
  //       return data.name;
  //     })

  // .attr('transform', data => `translate(${data.x}, ${data.y})`)
  // .call(d3.drag().on('start', this.started).on('drag', this.dragged).on('end', this.ended))
  // .on('click', d => {
  //   // this.clickNodeHandle(d);
  // });
  // };
  return (
    <div className={css['graph-wrapper']}>
      <section id="graph-container"></section>
    </div>
  );
};

export default Graph;
