import React, { useState, useEffect } from 'react';
import css from './index.module.less';
// import graphData from './data';
import * as d3 from 'd3';
import { INode, ILink } from '../../utils/constant';
interface IGraphProps {
    title?: string;
    entities: INode[];
    relations: ILink[];
    expertId: string;
}
// type INode = d3.SimulationNodeDatum & {
//   id: string,
//   name: string,
//   type: string,
//   level: number,
// };

// type ILink = d3.SimulationLinkDatum<INode> & {
//   label?: string,
//   relType: string,
// };

const Graph: React.FC<IGraphProps> = (props: IGraphProps) => {
    console.log(props);
    const centerId = props.expertId ? props.expertId : '';
    // const nodesData: INode[] = graphData.nodes;
    // const linksData: ILink[] = graphData.relations;
    const nodesData: INode[] = props.entities ? props.entities : [];
    const linksData: ILink[] = props.relations ? props.relations : [];
    // console.log(nodesData, linksData)

    const svgData = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
        svgW: 900,
        svgH: 900,
        colorList: ['#967adc', '#8cc152', '#3bafda', '#f6bb42', '#37bc9b', '#ff7e90', '#ff7043'],
        rediusList: [120, 80, 60, 50, 40, 30],
        fontSizeList: [22, 18, 16, 14, 13, 12]
    };
    const [forceSimulation, setSimulation] = useState<d3.Simulation<INode, ILink>>();
    useEffect((): void => {
        if (linksData.length) {
            initSvg();
            initForceSimulation();
        }
    }, [linksData]);

    // 初始化SVG
    const initSvg = (): void => {
        d3.select('#graph-container')
            .append('svg')
            .attr('width', svgData.svgW)
            .attr('height', svgData.svgH)
            .append('g')
            .attr('transform', `translate(${svgData.top}, ${svgData.left})`);
    };

    // 创建一个力导向图
    const initForceSimulation = () => {
        // 创建一个弹簧力，根据 link 的 strength 值决定强度
        const linkForce = d3
            .forceLink<INode, ILink>(linksData)
            .id((data: INode) => {
                return data.id;
            })
            .distance(() => {
                // .distance(({ target }) => {
                // 无分支的节点
                // if ((target as INode).name === '荣誉' || (target as INode).name === '组织') {
                return 100;
                // } else {
                //   return (target as INode).level === 5
                //     ? (target as INode).level * 20
                //     : (target as INode).level * 3;
                // }
            });
        const nodeCollision = d3
            .forceCollide()
            .radius((d) => {
                if ((d as INode).id === centerId) {
                    return 70;
                } else {
                    return 48;
                }
            })
            .iterations(0.5)
            .strength(0.5);

        const nodeCharge = d3
            .forceManyBody()
            .strength(-300)
            .theta(0.01)
            .distanceMin(15)
            .distanceMax(20);

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
            nodes.attr('transform', (data) => `translate(${data.x}, ${data.y})`);
            edgepaths.attr(
                'd',
                ({ target, source }) =>
                    'M ' +
                    (source as INode).x +
                    ' ' +
                    (source as INode).y +
                    ' L ' +
                    (target as INode).x +
                    ' ' +
                    (target as INode).y
            );
        });

        // simulation.force('link').links(linksData);
        // 手动调用 tick 使布局达到稳定状态
        for (
            let i = 0,
                n = Math.ceil(
                    Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())
                );
            i < n;
            ++i
        ) {
            simulation.tick();
        }
        setSimulation(simulation);

        const edges = drewLines();
        const nodes = drawNodes();
        const edgepaths = drawEdgeLabel();
    };
    // 绘制关系线
    const drewLines = () => {
        // 绘制关系线
        const edges = d3
            .select('svg g')
            .append('g')
            .attr('class', 'lines')
            .selectAll('line')
            .data(linksData)
            .enter()
            .append('line')
            .attr('class', 'edge')
            .attr('stroke', '#ccc')
            .attr('stroke-width', '1px')
            .style('display', 'none');
        // edges.append('title').text(data => data.label);

        return edges;
    };

    // 绘制实体节点
    const drawNodes = () => {
        const nodes = d3
            .select('svg g')
            .append('g')
            .attr('class', 'nodes')
            .selectAll('.node')
            .data(nodesData)
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('name', (data) => {
                return data.name;
            })
            .call(
                d3.drag()
                // .on('start', started).on('end', ended).on('drag', dragged).on('end', ended)
                // d3.drag().on('start', (node:INode,i:number.nodes:INode[])=>{
                //     console.log(i,nodes,node)
                // })
            )
            .on('start', (d) => {
                clickNodeHandle(d);
            })
            .on('click', (d) => {
                clickNodeHandle(d);
            });
        nodes
            .append('title')
            .attr('style', 'fill: red; stroke: cadetblue;')
            .text((data) => {
                return data.name;
            });

        nodes
            .append('circle')
            .attr('class', 'circle-element')
            .attr('r', (d: INode) => {
                if (d.id === centerId) {
                    return 60;
                } else {
                    return 40;
                }
            })
            .attr('fill', (d: INode) => {
                switch (d.type) {
                    case 'talent':
                        return svgData.colorList[0];
                    case 'journal':
                        return svgData.colorList[1];
                    case 'organization':
                        return svgData.colorList[2];
                    default:
                        return svgData.colorList[3];
                }
            })
            .attr('style', 'cursor: pointer;');

        nodes
            .append('text')
            .attr('class', 'node-text')
            .attr('width', '300px')
            .attr('fill', '#fff')
            .attr('style', () => {
                return `cursor: pointer;text-anchor: middle;dominant-baseline: middle;`;
            })

            .append('tspan')
            .selectAll('tspan')
            .data(({ name }) => {
                if (name) {
                    if (name.includes('.')) {
                        return name.split('.');
                    } else if (name.includes('-')) {
                        return name.split('-');
                    } else {
                        return name.split(' ');
                    }
                }
                return [];
            })
            .join('tspan')
            .attr('fill', '#f1f1f1')
            .attr('x', 0)
            .attr('y', (name, i, nodes) => {
                if (name) {
                }
                if (nodes.length === 1) {
                    return 0;
                } else if (nodes.length === 2) {
                    if (i === 0) {
                        return '-0.5em';
                    } else if (i === 1) {
                        return '0.5em';
                    }
                } else if (nodes.length >= 3) {
                    if (i === 0) {
                        return '-0.8em';
                    } else if (i === 1) {
                        return '0.3em';
                    } else if (i === 2) {
                        return '1.2em';
                    } else {
                        return '-999em';
                    }
                }
                return '';
            })
            .text((name) => {
                const reg = /[A-Za-z]/i;
                const isEnglishName = reg.test(name);
                if (isEnglishName) {
                    if (name.length > 8) {
                        return `${name.slice(0, 8)}...`;
                    } else {
                        return name;
                    }
                } else {
                    if (name.length > 2) {
                        return `${name.slice(0, 2)}${name.slice(2, 5)}`;
                    } else {
                        return name;
                    }
                }
            });
        return nodes;
    };

    // 绘制关系标签
    const drawEdgeLabel = () => {
        const edgepaths = d3
            .select('svg g')
            .append('g')
            .attr('class', 'paths')
            .selectAll('path') // make path go along with the link provide position for link labels
            .data(linksData)
            .enter()
            .append('path')
            .attr('class', 'edgepath')
            .attr('fill-opacity', 0)
            .attr('stroke-opacity', 0)
            .attr('id', function (d, i) {
                if (d && i) {
                    return 'edgepath' + i;
                }
                return '';
            })
            .style('pointer-events', 'none');

        const edgelabels = d3
            .select('svg g')
            .append('g')
            .attr('class', 'tagLabels')
            .selectAll('.edgelabel')
            .data(linksData)
            .enter()
            .append('text')
            .attr('style', `pointer-events: none;font-size:12px;`)
            .attr('class', 'edgelabel')
            .attr('id', function (d, i) {
                if (d && i) {
                    return 'edgelabel' + i;
                }
                return '';
            })
            .attr('font-size', '24px')
            .attr('fill', '#ff7043')
            .style('display', 'none');

        edgelabels
            .append('textPath') // To render text along the shape of a <path>, enclose the text in a <textPath> element that has an href attribute with a reference to the <path> element.
            .attr('xlink:href', function (d, i) {
                if (d && i) {
                    return '#edgepath' + i;
                }
                return '';
            })
            .style('text-anchor', 'middle')
            .style('pointer-events', 'none')
            .attr('startOffset', '50%')
            .text(({ relType }) => relType || '');

        return edgepaths;
    };

    // 专家关系图谱实体点击事件
    const clickNodeHandle = (data: INode) => {
        // 中心词只显示浮层信息
        if (data.id === centerId) return;
        // 和中心词的关系
        const nodeList = d3.selectAll('.node');
        nodeList.style('opacity', 0.2);
        const edgeList = d3.selectAll('.edge');
        const relationLabels = d3.selectAll('.edgelabel');
        const currentEdges = linksData.filter(({ target }) => (target as INode).id === data.id);
        const centerRelationName = currentEdges ? currentEdges[0].relType : ''; // 点击实体和中心词之间的关系
        edgeList.style('display', 'none');
        relationLabels.style('display', 'none');

        const selectNodeIds: string[] = [centerId];
        // let temp: any = {};
        linksData.forEach(({ target, relType }) => {
            // temp[relType] ? temp[relType]++ : (temp[relType] = 1);
            if (relType === centerRelationName) {
                selectNodeIds.push((target as INode).id);
            }
        });
        // console.log(temp);

        const nodesFilter = nodeList.filter((item) => {
            return selectNodeIds.includes((item as INode).id);
        });
        const edgeFilter = edgeList.filter((item) => {
            return (item as ILink).relType === centerRelationName;
        });
        // 关系标签
        const labelFilter = relationLabels.filter((item) => {
            return (item as ILink).relType === centerRelationName;
        });

        nodesFilter.style('opacity', 1);
        edgeFilter.style('display', '');
        labelFilter.style('display', '');
    };

    const started = (d: INode): void => {
        if (d) {
            if (!d3.event.active) {
                (forceSimulation as d3.Simulation<INode, ILink>).alphaTarget(0.3).restart();
            }
            d3.event.sourceEvent.stopPropagation();
            d.fx = d.x;
            d.fy = d.y;
        }
    };

    // const dragged: (d: any) => void = (d: any) => {
    //     if (d) {
    //         d.fx = d3.event.x;
    //         d.fy = d3.event.y;
    //     }
    // };

    // const ended: (d: any) => void = (d: INode) => {
    //     if (d) {
    //         if (!d3.event.active) {
    //             (forceSimulation as d3.Simulation<INode, ILink>).alphaTarget(0);
    //         }
    //         d.fx = null;
    //         d.fy = null;
    //     }
    // };

    return (
        <div className={css['graph-wrapper']}>
            <section id="graph-container" />
        </div>
    );
};

export default Graph;
