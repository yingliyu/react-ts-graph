import React, { useEffect } from 'react';
import css from './index.module.less';
import './style-fore.less';
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
    svgW: 1200,
    svgH: 900,
    colorList: ['#967adc', '#8cc152', '#3bafda', '#f6bb42', '#37bc9b', '#ff7e90', '#ff7043'],
    rediusList: [100, 80, 60, 50, 40, 30],
    fontSizeList: [22, 20, 18, 16, 14, 12],
  };
  const initSvg = (): void => {
    d3.select('#graph-container')
      .append('svg')
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
        return data.code.toString();
      })
      .distance(({ target }) => {
        // 无分支的节点
        if ((target as INode).name === '荣誉' || (target as INode).name === '组织') {
          return 100;
        } else {
          return (target as INode).level === 5
            ? (target as INode).level * 20
            : (target as INode).level * 3;
        }
      });
    const nodeCollision = d3
      .forceCollide()
      .radius(node => svgData.rediusList[(node as INode).level] * 1.2)
      .iterations(0.5)
      .strength(0.5);

    const nodeCharge = d3
      .forceManyBody()
      .strength(node => -(9 - (node as INode).level) * 30)
      .theta(0.01)
      .distanceMin(15)
      .distanceMax(20);

    // 创建一个力导向图
    const simulation = d3
      .forceSimulation<INode, ILink>(nodesData)
      .alpha(2) // 活力，渲染之后再自动动多久
      .force('link', linkForce) // 映射id & 线的长度
      .force('x', d3.forceX())
      .force('y', d3.forceY())
      .force('center', d3.forceCenter(svgData.svgW / 2, svgData.svgH / 2))
      // 避免节点相互覆盖
      .force('collision', nodeCollision)
      // 节点间相互排斥的电磁力
      .force('charge', nodeCharge);

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

    // 手动调用 tick 使布局达到稳定状态
    // for (
    //   let i = 0,
    //     n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()));
    //   i < n;
    //   ++i
    // ) {
    //   simulation.tick();
    // }

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
      .attr('stroke', '#ccc')
      .attr('stroke-width', '2px')
      .style('display', 'none');

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
      .attr('style', data => {
        console.log(data);
        return `cursor: pointer;`;
      })
      .attr('name', data => {
        // console.log(data);
        return data.name;
      });
    // .call(d3.drag().on('start', started).on('drag', dragged).on('end', ended));
    // .on('click', d => {
    //   // this.clickNodeHandle(d);
    // });

    nodes
      .append('circle')
      .attr('class', 'circle-element')
      .attr('r', d => svgData.rediusList[d.level])
      .attr('fill', d => svgData.colorList[d.colorIdx])
      .attr('style', 'cursor: pointer;');

    nodes
      .append('foreignObject')
      .attr('class', 'foreign-text')
      .attr('width', ({ level }) => 2 * svgData.rediusList[level])
      .attr('height', ({ level }) => 2 * svgData.rediusList[level])
      .attr(
        'transform',
        ({ level }) => `translate(${-svgData.rediusList[level]}, ${-svgData.rediusList[level]})`,
      )
      .append('xhtml:div')
      .attr('class', 'text-wrapper')
      .append('span')
      .attr('style', ({ level }) => {
        return `display:inline-block;height:${2 * svgData.rediusList[level]}px;line-height:${
          2 * svgData.rediusList[level]
        }px`;
      })
      .text(data => {
        return data.name;
      });

    nodes
      .insert('foreignObject')
      .attr('class', 'foreign-tip')
      .attr('width', ({ level }) => 3 * svgData.rediusList[level])
      .attr('height', ({ level }) => 3 * svgData.rediusList[level])
      .attr(
        'transform',
        ({ level }) =>
          `translate(${-1.5 * svgData.rediusList[level]}, ${-1.5 * svgData.rediusList[level]})`,
      )
      .insert('xhtml:div')
      .attr('style', ({ colorIdx }) => {
        return `width:100%;height:100%;background:${svgData.colorList[colorIdx]}`;
      })
      .attr('class', 'fulltext')
      .append('span')
      .attr('style', ({ level }) => {
        return `display:inline-block;width:${2 * svgData.rediusList[level]}px;`;
      })
      .text((data: INode) => {
        return data.name;
      });
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
  const started = (d: INode) => {
    // if (!d3.event.active) {
    //   simulation.alphaTarget(0.3).restart();
    // }
    d3.event.sourceEvent.stopPropagation();
    d.fx = d.x;
    d.fy = d.y;
  };

  const dragged = (d: INode) => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  };

  const ended = (d: INode) => {
    // if (!d3.event.active) {
    //   simulation.alphaTarget(0);
    // }
    d.fx = null;
    d.fy = null;
  };
  return (
    <div className={css['graph-wrapper']}>
      <section id="graph-container"></section>
    </div>
  );
};

export default Graph;
