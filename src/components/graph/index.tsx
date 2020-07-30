import React, { useState, useEffect } from 'react';
import css from './index.module.less';
import graphData from './data';
import * as d3 from 'd3';

interface IGraphProps {
  title?: string;
}

const Graph: React.FC<IGraphProps> = (props: IGraphProps) => {
  type INode = d3.SimulationNodeDatum & {
    id: string | number;
    code: string | number;
    name: string;
    type: string;
    level: number;
    colorIdx: number;
    keyword: string;
    layout?: {};
    layoutList?: {};
  };

  type ILink = d3.SimulationLinkDatum<INode> & {
    id: string | number;
    source: number;
    target: number;
    label: string;
  };

  const nodesData: INode[] = graphData.nodes;
  const linksData: ILink[] = graphData.relations;

  useEffect((): void => {
    initSvg();
    initForceSimulation();
  }, []);

  const initSvg = (): void => {
    const svgData = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
      svgW: 600,
      svgH: 600,
    };
    const svgContainer = d3
      .select('#graph-container')
      .append('svg')
      .attr('viewBox', '-100 -200 1300 1105')
      .attr('width', svgData.svgW)
      .attr('height', svgData.svgH)
      .append('g')
      .attr('transform', `translate(${svgData.top}, ${svgData.left})`);
  };

  const initForceSimulation = () => {
    // 声明一个力导向图
    const simulation = d3.forceSimulation<INode, ILink>(nodesData);
    // 手动调用 tick 使布局达到稳定状态
    for (
      let i = 0,
        n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()));
      i < n;
      ++i
    ) {
      simulation.tick();
    }
    //     .alpha(2) // 活力，渲染之后再自动动多久
    //     .force(
    //       'link',
    //       d3
    //         .forceLink()
    //         .id(data => {
    //           // return data.code;
    //           return '';
    //         })
    //         .distance(data => {
    //           // 无分支的节点
    //           console.log(data);
    //           // if (data.target.name === '荣誉' || data.target.name === '组织') {
    //           //   return 200;
    //           // } else {
    //           //   return data.target.level === 5 ? data.target.level * 22 : data.target.level * 3;
    //           // }
    //           return 200;
    //         }),
    //     ) // 映射id & 线的长度
    //     .force(
    //       'charge',
    //       d3
    //         .forceManyBody()
    //         // .strength(d => -(9 - d.level) * 30)
    //         .theta(0.01)
    //         .distanceMin(15)
    //         .distanceMax(20),
    //     )
    //     .force('x', d3.forceX())
    //     .force('y', d3.forceY())
    //     // .force('center', d3.forceCenter(data.svgW, data.svgH / 1.5))
    //     .force(
    //       'collide',
    //       d3
    //         .forceCollide(d => {
    //           // if (d.name === this.currentWord && d.level === 1) {
    //           //   d.fx = this.svgW / 1.1; // 设置特定节点固定x坐标
    //           //   d.fy = this.svgH / 1.5;
    //           // }
    //           // return 120 - d.level * 14;
    //           return 120;
    //         })
    //         .iterations(0.5)
    //         .strength(0.5),
    //     );

    //   console.log(simulation);
    console.log(data.nodes);
    const nodeData = data.nodes;
    simulation.nodes(nodeData).on('tick', (): void => {
      edges.attr('x1', data => {
        // console.log(data);
        return data.source.x;
      });
      //   .attr('y1', data => data.source.y)
      //   .attr('x2', data => data.target.x)
      //   .attr('y2', data => data.target.y);
      nodes.attr('transform', data => `translate(${data.x}, ${data.y})`);
      // linkTagsSelection.attr(
      //   'd',
      //   d => 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y,
      // );
    });
    // forceSimulation.force('link').links(data.links);

    // setNodesSelection(nodes);
    // 绘制实体节点
    const nodes = d3
      .select('svg g')
      .append('g')
      .attr('class', 'nodes')
      .selectAll('.node')
      .data(data.nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('name', data => {
        // console.log(data);
        return data.name;
      });
    // 绘制关系线
    const edges = d3
      .select('svg g')
      .append('g')
      .attr('class', 'edges')
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('class', 'edge')
      .attr('stroke', 'rgba(255,255,255,0.6)')
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
  //     });

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
