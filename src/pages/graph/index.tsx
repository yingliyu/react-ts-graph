import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import css from './index.module.less';
import { Select, Radio, Button, Spin, Icon, message } from 'antd';
import Title from './components/title';
import ExpertInfo from './components/expert-info';
import WordCloud from '../../components/word-cloud';
import ExpertResume from './components/expert-resume';
import ContainerItem from './components/container-item';
import Graph from '../../components/graph';
import EchartsGraph from '../../components/charts/graph/index';
import Pie from '../../components/charts/pie';
import Bar from '../../components/charts/bar';
import debounce from 'lodash.debounce';
import { baseApi, expertApi, subjectApi } from '../../services';

import { IGraphComponentProps } from '../../models/graph';
import { ICommonProps } from '../../models/global';
import { LiteratureType, IExampleData } from '../../models/search';
import useSize from '../../hooks/size';
import { ALL_NODE_TYPES, COLOR_OBJ, RADIUS_LIST, FONTSIZE_LIST } from '../../utils/constant';
const nodeAttribute = {
    color: COLOR_OBJ,
    radius: RADIUS_LIST,
    fontSize: FONTSIZE_LIST
};
const { Option } = Select;
let examplePage = 1;

const literatureFieldList: LiteratureType[] = [
    {
        name: '使用中资源量使用中资源量使用中资源量',
        value: 1000
    },
    {
        name: '维修中资源量',
        value: 611
    },
    {
        name: '保养中资源量',
        value: 300
    },
    {
        name: '已损坏资源量',
        value: 100
    }
];

const journalDistributionList: LiteratureType[] = [
    {
        name: 'name1',
        value: 12
    },
    {
        name: 'name2',
        value: 20
    },
    {
        name: 'name3dsfsdfsfsfsd',
        value: 3
    },
    {
        name: 'name4',
        value: 12
    },
    {
        name: 'name5',
        value: 123
    }
];

const hightCitedList: LiteratureType[] = [
    {
        name: '使用中资源量已损坏资源量',
        value: 0.57
    },
    {
        name: '已损坏资源量',
        value: 0.43
    }
];

interface IGraphProps {
    history: {
        push: any;
    };
    location: {
        search: string;
    };
}
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const GraphPage: React.FC<IGraphProps> = (props) => {
    // console.log(props);
    const {
        inputWidth,
        inputHeight,
        kgWidth,
        kgHeight,
        commonW,
        commonH,
        subjectDistH,
        hotWordsH,
        highCitedH
    } = useSize();
    const exampleDefault: IExampleData[] = [];
    const [exampleList, setExampleList] = useState(exampleDefault);
    const [activeExampleId, setActiveExampleId] = useState('0');
    const [showExample, setShowExample] = useState(false);
    const [search, setSearch] = useState([]);

    const [suggestInfo, setSuggestInfo] = useState({
        list: [],
        loading: false
    });
    const refSelect = useRef<any>();
    const [graphData, setGraphData] = useState<IGraphComponentProps>();
    const [activeGraph, setActiveGraph] = useState(0);
    const [screenWidth, setScreenWidth] = useState(1920);
    /*{
        entityId: 'f7c1fd353bb04c949ef1747e96ca76ed',
        entityName: '李飞飞',
        orgId: '12'
    }*/
    const [queryValue, setQueryValue] = useState({
        entityId: '',
        entityName: '',
        orgId: ''
    });
    const [graphTypes, setGraphTypes] = useState<string[]>([]);

    const queryStr = useQuery();
    const selectValue = queryStr.get('q');
    const selectedId = queryStr.get('id');
    const selectedOrgId = queryStr.get('gid');

    useEffect(() => {
        // window.addEventListener('click', function (event: any) {
        //     console.log(event);
        //     let e = event || window.event;
        //     // if (e.cancelBubble) {
        //     //     e.cancelBubble = true; //ie 阻止事件冒泡
        //     // } else {
        //     //     e.stopPropagation(); // 其余浏览器 阻止事件冒泡
        //     // }
        //     if (
        //         event.target.id !== 'examples-words' &&
        //         !event.target.className.indexOf('example-footer') &&
        //         event.target.innerText !== '换一组'
        //     ) {
        //         setShowExample(false);
        //     }
        // });

        setScreenWidth(window.screen.width);
        selectedId &&
            selectValue &&
            setQueryValue({
                entityId: selectedId,
                entityName: selectValue,
                orgId: selectedOrgId || ''
            });
        refSelect && refSelect.current && refSelect.current.focus();
        inputSearchHandle(selectValue);
    }, []);

    useEffect(() => {
        queryValue.entityId && getGraphData();
    }, [queryValue, activeGraph]);

    // 获取示例数据
    const getExamplesData = async () => {
        try {
            const params = { page: examplePage };
            const res = await baseApi.getExamples(params);
            setExampleList(res);
            setShowExample(true);
        } catch (error) {
            console.log(error);
        }
    };

    // 获取图谱数据-例如:人工智能
    const getGraphData = async () => {
        let res: any;

        props.history.push(
            `/graph?q=${queryValue.entityName}&id=${queryValue.entityId}&type=${activeGraph}&gid=${queryValue.orgId}`
        );
        if (!queryValue.orgId) {
            message.warn('当前版本仅支持搜索专家，换一个专家试试吧！');
            return;
        }
        try {
            if (queryValue.orgId) {
                // 专家图谱
                if (activeGraph === 0) {
                    res = await expertApi.getExpertGraph(queryValue);
                } else {
                    // 资源图谱
                }
            } else {
                // 学科词图谱
                if (activeGraph === 0) {
                    // 关系图谱
                    res = await subjectApi.getSubjectGraph(queryValue);
                } else {
                    // 资源图谱
                }
            }

            // const res = await expertApi.getExpertGraph(queryValue);
            setGraphData(res);

            let types = new Set();
            res.entities.forEach((item: any) => {
                types.add(item.type);
            });
            const typesArr = Array.from(types) as string[];
            setGraphTypes(typesArr);
        } catch (error) {
            console.log(error);
        }
    };

    // 关联监听输入框值change handle(获取关联下拉list)
    const inputSearchHandle = (value: any): void => {
        // console.log(value);
        setSuggestInfo({
            ...suggestInfo,
            loading: true
        });
        fetchSuggest(value);
    };

    // 获取关联list数据
    const getSuggestWords = async (val: string) => {
        if (!val) return;
        try {
            const res = await baseApi.getSuggestWords({ word: val });
            setSuggestInfo({
                list: res,
                loading: false
            });
        } catch (error) {
            setSuggestInfo({
                ...suggestInfo,
                loading: false
            });
        }
    };

    // 防抖、节流
    const fetchSuggest = debounce(getSuggestWords, 800);

    // 选中（学科词/专家）后触发的查询事件
    const selectSuggestWordHandle = (value: any) => {
        const params: any = JSON.parse(value);
        console.log(params);
        if (!params.orgId) {
            message.warn('当前版本仅支持搜索专家，换一个专家试试吧！');
            return;
        }
        setQueryValue(params);
    };

    // 显示示例modal
    const showExampleHandle = () => {
        if (!showExample) {
            // examplePage = 1;
            getExamplesData();
        } else {
            setShowExample(false);
        }
    };

    // 示例点击
    const exampleClickHandle = (item: IExampleData, event: any): void => {
        setActiveExampleId(item.entityId);
        const params = {
            entityId: item.entityId,
            entityName: item.entityName,
            orgId: item.orgId
        };
        setShowExample(false);
        if (!params.orgId) {
            message.warn('当前版本仅支持搜索专家，换一个专家试试吧！');
            return;
        }
        setQueryValue(params);
    };

    // 示例分页
    const examplePageHandle = () => {
        examplePage = examplePage === 5 ? 1 : examplePage + 1;
        getExamplesData();
    };

    // 切换图谱类型
    const toggleGraphHandle = () => {
        if (activeGraph === 0) {
            message.info('当前版本仅支持搜索关系图谱');
            return;
        }
        // console.log(activeGraph);

        setActiveGraph(activeGraph === 0 ? 1 : 0);
    };

    // 词云mock数据
    const wordCloudList: ICommonProps[] = [
        {
            name: '群个华',
            value: 629
        },
        {
            name: '上度压议情示',
            value: 122
        },
        {
            name: '后素长证两引群',
            value: 19
        },
        {
            name: '二导',
            value: 810
        },
        {
            name: '军当算管光存',
            value: 1284
        },
        {
            name: '人工智能',
            value: 9999
        },
        {
            name: '当县深家多',
            value: 698
        },
        {
            name: '重工',
            value: 3850
        },
        {
            name: '合积影构候',
            value: 778
        },
        {
            name: '对动片划办天',
            value: 449
        },
        {
            name: '温月光部质',
            value: 1821
        },
        {
            name: '深度学习',
            value: 8460
        },
        {
            name: '汽车',
            value: 3790
        },
        {
            name: '人工染色体与细胞器的设计与合成',
            value: 5760
        },
        {
            name: '新冠肺炎',
            value: 705
        },
        {
            name: '环保材料',
            value: 1681
        },
        {
            name: '人工神经元网络',
            value: 5110
        },
        {
            name: '种音院如造',
            value: 6690
        },
        {
            name: '人工器官与模拟组织三维构建',
            value: 455
        },
        {
            name: '人工智能专家系统',
            value: 1983
        }
    ];

    return (
        <div className={css['graph-page-wrapper']}>
            <h2>上海人工智能研发资源图谱</h2>
            <div className={css['container']}>
                {/* left aside */}
                <div
                    className={[`${css['aside-left-wrapper']}`, `${css['aside-wrapper']}`].join(
                        ' '
                    )}
                >
                    <div className={css['statistics-wrapper']}>
                        <span>实体{(graphData && graphData.entityTotal) || 0}个</span>
                        <span>关系{(graphData && graphData.relationTotal) || 0}个</span>
                    </div>
                    {/* 专家基本信息 */}
                    <ExpertInfo />

                    <ContainerItem
                        width={commonW}
                        height={subjectDistH}
                        title="学科分布"
                        backgroundColor="#fff"
                        borderRadius={5}
                        marginTop={10}
                    >
                        {/* <WordCloud list={wordCloudList} /> */}
                    </ContainerItem>

                    <ContainerItem
                        width={commonW}
                        height={hotWordsH}
                        title="热词分布"
                        backgroundColor="#fff"
                        borderRadius={5}
                        marginTop={10}
                    >
                        {/* <EchartsGraph /> */}
                    </ContainerItem>
                </div>
                <div className={css['main-wrapper']}>
                    {/* 搜索模块 start */}
                    <div className={css['search-wrapper']}>
                        <Select
                            ref={refSelect}
                            showSearch
                            autoFocus={true}
                            value={queryValue.entityName}
                            placeholder="请输入搜索词并在下拉菜单选择知识图谱"
                            notFoundContent={
                                suggestInfo.loading ? (
                                    <Spin size="small" />
                                ) : (
                                    '无关联知识图谱，请重新输入'
                                )
                            }
                            filterOption={false}
                            onSearch={(value) => fetchSuggest(value)}
                            onChange={(value: any) => selectSuggestWordHandle(value)}
                            // style={{ width: 480, height: 48 }}
                            style={{ width: inputWidth, height: inputHeight }}
                            showArrow={false}
                            defaultActiveFirstOption={true}
                        >
                            {suggestInfo.list.length &&
                                suggestInfo.list.map((item: any, index) => (
                                    <Option
                                        key={item.entityId}
                                        value={JSON.stringify({
                                            entityName: item.entityName,
                                            entityId: item.entityId,
                                            orgId: item.orgId ? item.orgId : ''
                                        })}
                                    >
                                        {item.entityName + (item.orgName ? ' ' + item.orgName : '')}
                                    </Option>
                                ))}
                        </Select>
                        <span className={css['example-btn']} onClick={showExampleHandle}>
                            示例
                            <Icon key="search_icon" className={css['search-icon']} type="search" />
                        </span>
                        {/* 展示所有示例 */}
                        <div
                            className={[
                                `${css['examples-wrapper']}`,
                                `${showExample ? css['show-example'] : ''}`
                            ].join(' ')}
                        >
                            <section id="examples-words" className={css['expert-words']}>
                                {exampleList.map((item, index) => {
                                    return (
                                        <Button
                                            className={
                                                item.entityId === activeExampleId
                                                    ? css['active']
                                                    : ''
                                            }
                                            key={item.entityName + '_' + index}
                                            onClick={(e) => exampleClickHandle(item, e)}
                                        >
                                            {item.entityName}
                                        </Button>
                                    );
                                })}
                            </section>
                            <div className={css['example-footer']}>
                                <Button type="primary" onClick={examplePageHandle}>
                                    换一组
                                </Button>
                                <Button id="close-btn" onClick={() => setShowExample(false)}>
                                    关闭
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* 搜索模块 end */}

                    <div className={css['toggle-btn-group']}>
                        <Radio.Group value={activeGraph} onChange={toggleGraphHandle}>
                            <Radio.Button value={0}>关系图谱</Radio.Button>
                            <Radio.Button value={1}>资源图谱</Radio.Button>
                        </Radio.Group>
                    </div>
                    {/* 知识图谱 */}
                    {graphData && graphData.relations.length ? (
                        <Graph
                            svgWidth={kgWidth}
                            svgHeight={kgHeight}
                            {...props}
                            {...graphData}
                            allNodeTypes={ALL_NODE_TYPES}
                            nodeAttribute={nodeAttribute}
                            graphType={activeGraph}
                        />
                    ) : (
                        <p className={css['no-graph-desc']}>
                            未搜索到与<i>{queryValue.entityName}</i>
                            相关的{activeGraph ? '资源' : '关系'}图谱，换一个词试试吧！
                        </p>
                    )}
                </div>
                <div
                    className={[`${css['aside-right-wrapper']}`, `${css['aside-wrapper']}`].join(
                        ' '
                    )}
                >
                    <div className={css['statistics-wrapper']}>
                        <span>文献134xx篇</span>
                        <span>科研项目134xx个</span>
                    </div>
                    {/* 专家履历 */}
                    <ExpertResume />
                    <ContainerItem
                        width={commonW}
                        height={commonH}
                        title="文献领域分布"
                        backgroundColor="#fff"
                        borderRadius={5}
                        marginTop={10}
                    >
                        {/* <Pie
                            data={literatureFieldList}
                            canvasContainer="pieContainer"
                            type="ring"
                        /> */}
                    </ContainerItem>

                    <ContainerItem
                        width={commonW}
                        height={commonH}
                        title="发文期刊分布"
                        backgroundColor="#fff"
                        borderRadius={5}
                        marginTop={10}
                    >
                        {/* <Bar
                            width={commonW}
                            height={145}
                            data={journalDistributionList}
                            canvasContainer="barContainer"
                        /> */}
                    </ContainerItem>
                    <ContainerItem
                        width={commonW}
                        height={commonH}
                        title="重点学科匹配度"
                        backgroundColor="#fff"
                        borderRadius={5}
                        marginTop={10}
                    >
                        {/* <Pie data={literatureFieldList} canvasContainer="simplePieContainer" /> */}
                    </ContainerItem>

                    <ContainerItem
                        width={commonW}
                        height={highCitedH}
                        title="高被引占比"
                        backgroundColor="#fff"
                        borderRadius={5}
                        marginTop={10}
                    >
                        {/* <Bar
                            width={commonW}
                            height={100}
                            data={hightCitedList}
                            canvasContainer="verticalBarContainer"
                            showYAxis={true}
                            showLegend={false}
                            barBorderRadius={30}
                            align="vertical"
                        /> */}
                    </ContainerItem>
                </div>
            </div>
        </div>
    );
};
export default GraphPage;
