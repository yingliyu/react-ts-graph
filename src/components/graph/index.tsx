import React, { useEffect, useState, useRef } from 'react';
import css from './index.module.less';
import * as d3 from 'd3';
import { INode, ILink, IGraphProps } from '../../utils/constant';
import { message } from 'antd';
const Graph: React.FC<IGraphProps> = (props, {}) => {
    const {
        expertId: centerId,
        entities: nodesData,
        relations: linksData,
        svgWidth = 1100,
        svgHeight = 900
    } = props;

    const simulationRef = useRef<d3.Simulation<INode, ILink>>();
    const edgeText = useRef();

    const svgData = {
        top: 20,
        left: 20,
        // colorList: ['#967adc', '#8cc152', '#3bafda', '#f6bb42', '#37bc9b', '#ff7e90', '#ff7043'],
        colorList: ['#2f83e4', '#ff7e90', '#23cbff', '#00e5c1'],
        rediusList: [150, 80, 60, 50, 40, 30],
        fontSizeList: [22, 18, 16, 14, 13, 12]
    };
    const [graphTypes, setGraphTypes] = useState<string[]>([]);
    const [clickedNodeId, setClickedNodeId] = useState<string>();

    useEffect((): void => {
        d3.selectAll('section svg').remove();
        if (linksData && linksData.length) {
            initSvg();
            initForceSimulation();
            getGraphTypes();
        }
    }, [linksData]);

    useEffect(() => {
        setEdgeTextBg();
    }, [clickedNodeId]);
    const setEdgeTextBg = () => {};
    // init SVG
    const initSvg = () => {
        d3.select('#graph-container')
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .append('g')
            .attr('transform', `translate(${svgData.top}, ${svgData.left})`);
    };

    const getGraphTypes = () => {
        let types = new Set();
        nodesData.forEach((item: any) => {
            types.add(item.type);
        });
        const typesArr = Array.from(types) as string[];
        setGraphTypes(typesArr);
    };

    // drag start event
    const started = (d: INode) => {
        !d3.event.active &&
            simulationRef &&
            simulationRef.current &&
            simulationRef.current.alphaTarget(0.3).restart();
        d3.event.sourceEvent.stopPropagation();
        d.fx = d.x;
        d.fy = d.y;
    };

    // drag event
    const dragged = (d: INode) => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    };

    // drag end event
    const ended = (d: INode) => {
        !d3.event.active &&
            simulationRef &&
            simulationRef.current &&
            simulationRef.current.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    };

    //  set color
    const dynamicColor = (type: any) => {
        switch (type) {
            case 'EXPERT':
                return svgData.colorList[0];
            case 'JOURNAL':
                return svgData.colorList[1];
            case 'ORG':
                return svgData.colorList[2];
            case 'PROJECT':
                return svgData.colorList[3];
            default:
                return svgData.colorList[3];
        }
    };

    // set text position Y
    const setNodeTextPosition = (name: string, i: number, nodes: any) => {
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
            switch (i) {
                case 0:
                    return '-0.8em';
                case 1:
                    return '0.3em';
                case 2:
                    return '1.2em';
                default:
                    return '-99999em';
            }
        }
        return '';
    };

    // draw relation lines
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
            .attr('stroke', (d: any) => dynamicColor(d.target.type))
            .attr('stroke-width', '2px')
            .style('display', 'none');
        // edges.append('title').text((data) => data.label);
        return edges;
    };

    // draw nodes (circle & text)
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
            .attr('name', (data) => data.name)
            .call(
                d3
                    .drag<SVGGElement, INode>()
                    .on('start', started)
                    .on('end', ended)
                    .on('drag', dragged)
                    .on('end', ended)
            )
            .on('click', (d) => clickNodeHandle(d));

        nodes.append('title').text((data) => data.name);

        nodes
            .append('circle')
            .attr('class', 'circle-element')
            .attr('r', (d: INode) => (d.id === centerId ? 80 : 40))
            .attr('fill', (d: INode) => dynamicColor(d.type))
            .attr('style', 'cursor: pointer;');

        nodes
            .append('text')
            .attr('class', 'node-text')
            .attr('width', '300px')
            .attr('fill', '#fff')
            .attr(
                'style',
                (d) =>
                    `cursor: pointer;text-anchor: middle;dominant-baseline: middle;font-size:${
                        d.id === centerId ? '24px' : '14px'
                    }`
            )
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
            .attr('y', (name, i, nodes) => setNodeTextPosition(name, i, nodes))
            .text((name) => {
                const reg = /[A-Za-z]/i;
                const isEnglishName = reg.test(name);
                if (isEnglishName) {
                    return name.length > 8 ? `${name.slice(0, 8)}...` : name;
                } else {
                    return name.length > 2 ? `${name.slice(0, 2)}${name.slice(2, 5)}` : name;
                }
            });
        return nodes;
    };

    // draw relation labels
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
            .attr('name', (d: any) => d.relType || '')
            .attr('fill-opacity', 0)
            .attr('stroke-opacity', 0)
            .attr('id', (d, i) => d && 'edgepath' + i)
            .style('pointer-events', 'none');

        const edgelabels = d3
            .select('svg g')
            .append('g')
            .attr('class', 'tagLabels')
            .selectAll('.edgelabel')
            .data(linksData)
            .enter()
            .append('g')
            .attr('name', (d: any) => d.relType || '')
            .attr('class', 'edgeslabel-group')
            .attr('style', 'cursor: pointer;')
            .on('click', (d) => message.warning(d.relType + '关系'));

        edgelabels.append('title').text((data) => data.relType);

        // 文字背景
        // const edgeTextFilter = edgelabels
        //     .append('filter')
        //     .attr('name', (d: any) => d.relType || '')
        //     .attr('width', '1')
        //     .attr('height', '1')
        //     .attr('x', '0')
        //     .attr('y', '0')
        //     .attr('style', 'cursor: pointer;')
        //     .attr('class', 'filter')
        //     .attr('id', (d, i) => d && 'edgefilter_' + i)
        //     .on('click', (d) => console.log(d.relType + '关系'));

        // edgeTextFilter.append('feFlood').attr('flood-color', 'orange').attr('flood-opacity', '1');

        // edgeTextFilter
        //     .append('feComposite')
        //     .attr('in', 'SourceGraphic')
        //     .attr('operator', 'lighter');

        const edgeText = edgelabels
            .append('text')
            .attr('style', `font-size:18px;`)
            .attr('class', 'edgelabel')
            .attr('id', (d, i) => d && 'edgelabel' + i)
            .attr('fill', (d: any) => dynamicColor(d.target.type))
            .attr('style', 'cursor: pointer;display:none');

        const textPath = edgeText
            .append('textPath') // To render text along the shape of a <path>, enclose the text in a <textPath> element that has an href attribute with a reference to the <path> element.
            .attr('xlink:href', (d, i) => d && '#edgepath' + i)
            .style('text-anchor', 'middle')
            .style('pointer-events', 'none')
            .attr('startOffset', '50%')
            // .attr('filter', (d, i) => d && 'url(#edgefilter_' + i + ')')
            .attr('style', 'cursor: pointer;font-size:18px;font-weight:bold')
            .text(({ relType }) => relType || '');

        return edgepaths;
    };

    // 专家关系图谱实体点击事件
    const clickNodeHandle = (data: INode) => {
        setClickedNodeId(data.id);
        // 中心词只显示浮层信息
        if (data.id === centerId) return;
        // 和中心词的关系
        const nodeList = d3.selectAll('.node');
        nodeList.style('opacity', 0.2);
        const edgeList = d3.selectAll('.edge');
        const relationLabels = d3.selectAll('.edgelabel');
        // const relationLabelsBg = d3.selectAll('feFlood');

        edgeList.style('display', 'none');
        relationLabels.style('display', 'none');
        // relationLabelsBg.attr('flood-opacity', '0');

        const currentEdges = linksData.filter(({ target }) => (target as INode).id === data.id);
        const centerRelationName = currentEdges ? currentEdges[0].relType : ''; // 点击实体和中心词之间的关系

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

        // 关系标签背景色
        // const labelBgFilter = relationLabelsBg.filter((item: any) => {
        //     return (item.target as INode).id === data.id;
        // });

        nodesFilter.style('opacity', 1);
        edgeFilter.style('display', '');
        labelFilter.style('display', '');
        // labelBgFilter.attr('flood-opacity', 1);
    };

    // create a force simulation
    const initForceSimulation = () => {
        // 创建一个弹簧力，根据 link 的 strength 值决定强度
        const linkForce = d3
            .forceLink<INode, ILink>(linksData)
            .id((data: INode) => data.id)
            .distance(220);
        const nodeCollision = d3
            .forceCollide()
            .radius((d) => {
                if ((d as INode).id === centerId) {
                    return 70;
                } else {
                    return 52;
                }
            })
            .iterations(0.5)
            .strength(0.5);

        const nodeCharge = d3.forceManyBody().strength(-300).theta(0.01);

        simulationRef.current = d3
            .forceSimulation<INode, ILink>(nodesData)
            .alpha(0.3) // 活力，渲染之后再自动动多久到达目标位置
            .force('link', linkForce) // 映射id & 线的长度
            .force('x', d3.forceX())
            .force('y', d3.forceY())
            .force('center', d3.forceCenter(svgWidth / 2, svgHeight / 2))
            // 避免节点相互覆盖
            .force('collision', nodeCollision)
            // 节点间相互排斥的电磁力
            .force('charge', nodeCharge);

        simulationRef.current.nodes(nodesData).on('tick', () => {
            edges
                .attr('x1', ({ source }) => (source as INode).x || 0)
                .attr('y1', ({ source }) => (source as INode).y || 0)
                .attr('x2', ({ target }) => (target as INode).x || 0)
                .attr('y2', ({ target }) => (target as INode).y || 0);
            nodes.attr('transform', (data: any) => `translate(${data.x}, ${data.y})`);
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

        const edges = drewLines();
        const nodes = drawNodes();
        const edgepaths = drawEdgeLabel();
    };

    const getLegendByType = (type: string) => {
        switch (type) {
            case 'EXPERT':
                return '专家';
            case 'ORG':
                return '机构';
            case 'JOURNAL':
                return '期刊';
            case 'SUBJECT':
                return '学科词';
            case 'PAPER':
                return '论文';
            case 'PATENT':
                return '专利';
                dafault: return '项目';
        }
    };
    return (
        <div className={css['graph-wrapper']}>
            {/* 图谱容器 */}
            <section id="graph-container" />
            {/* 图谱小示例 */}
            <ul className={css['legend-wrapper']}>
                {graphTypes &&
                    graphTypes.length &&
                    graphTypes.map((item: any) => (
                        <li key={item}>
                            <i style={{ background: dynamicColor(item) }} />
                            {getLegendByType(item)}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Graph;
