import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import css from './index.module.less';
import { Select, Radio, Button, Spin, Icon, message, Drawer } from 'antd';
import Title from './components/title';
import ExpertInfo from './components/expert-info';
import WordCloud from '../../components/word-cloud';
import ExpertResume from './components/expert-resume';
import ContainerItem from './components/container-item';
import Graph from '../../components/graph';
import Search from './components/search';
import EchartsGraph from '../../components/charts/graph/index';
import Pie from '../../components/charts/pie';
import Bar from '../../components/charts/bar';
import NodeLayer from './components/float-layer/node';
import RelationLayer from './components/float-layer/relation';
import debounce from 'lodash.debounce';
import { baseApi, expertApi, subjectApi } from '../../services';

import { IGraphComponentProps } from '../../models/graph';
import { ICommonProps } from '../../models/global';
import { LiteratureType, IExampleData } from '../../models/search';
import useSize from '../../hooks/size';
// import useHide from '../../hooks/hide';
import { ALL_NODE_TYPES, COLOR_OBJ, RADIUS_LIST, FONTSIZE_LIST } from '../../utils/constant';
const nodeAttribute = {
    color: COLOR_OBJ,
    radius: RADIUS_LIST,
    fontSize: FONTSIZE_LIST
};

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
    // const exampleWrapper = document.getElementById('examples-words');
    // useHide(exampleWrapper as HTMLElement);
    const exampleDefault: IExampleData[] = [];
    const [exampleList, setExampleList] = useState(exampleDefault);
    const [activeExampleId, setActiveExampleId] = useState('0');
    const [showExample, setShowExample] = useState(false);
    const [search, setSearch] = useState([]);
    const [currentDrawer, setCurrentDrawer] = useState<string>('');

    const [suggestInfo, setSuggestInfo] = useState({
        list: [],
        loading: false
    });
    const refSelect = useRef<any>();
    const [graphData, setGraphData] = useState<IGraphComponentProps>();
    const [activeGraph, setActiveGraph] = useState(0);
    /*{
        entityId: 'f7c1fd353bb04c949ef1747e96ca76ed',
        entityName: '李飞飞',
        orgId: '12'
    }*/
    const [queryValue, setQueryValue] = useState({
        entityId: '',
        entityName: '',
        entityType: ''
    });
    const [graphTypes, setGraphTypes] = useState<string[]>([]);

    const queryStr = useQuery();
    const selectValue = queryStr.get('q');
    const selectedId = queryStr.get('id');
    const selectedEntityType = queryStr.get('qt');

    useEffect(() => {
        const exampleWrapper = document.getElementById('examples-words');
        window.addEventListener('click', function (event: any) {
            if (!(exampleWrapper as HTMLElement).contains(event.target)) {
                setShowExample(false);
            }
        });
        selectedId &&
            selectValue &&
            setQueryValue({
                entityId: selectedId,
                entityName: selectValue,
                entityType: selectedEntityType || ''
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
            `/graph?q=${queryValue.entityName}&id=${queryValue.entityId}&type=${activeGraph}&qt=${queryValue.entityType}`
        );

        const params = {
            entityId: queryValue.entityId,
            entityName: queryValue.entityName
        };
        try {
            if (queryValue.entityType === 'EXPERT') {
                // 专家图谱
                if (activeGraph === 0) {
                    res = await expertApi.getExpertGraph(params);
                } else {
                    // 资源图谱
                }
            } else {
                // 学科词图谱
                if (activeGraph === 0) {
                    // 关系图谱
                    res = await subjectApi.getSubjectGraph(params);
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
            entityType: item.entityType
        };
        setShowExample(false);

        setQueryValue(params);
    };

    // 示例分页
    const examplePageHandle = () => {
        examplePage = examplePage === 5 ? 1 : examplePage + 1;
        getExamplesData();
    };

    // 切换图谱类型
    const toggleGraphHandle = () => {
        setActiveGraph(activeGraph === 0 ? 1 : 0);
    };
    const onEntityClick = (id: string) => {
        console.log(id);
        setCurrentDrawer(id);
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
                    <Search
                        width={inputWidth}
                        height={inputHeight}
                        value={queryValue.entityName}
                        showExample={showExample}
                        activeExampleId={activeExampleId}
                        exampleList={exampleList}
                        refSelect={refSelect}
                        suggestInfo={suggestInfo}
                        showExampleHandle={showExampleHandle}
                        exampleClickHandle={exampleClickHandle}
                        examplePageHandle={examplePageHandle}
                        setShowExample={setShowExample}
                        fetchSuggest={fetchSuggest}
                        selectSuggestWordHandle={selectSuggestWordHandle}
                    />
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
                    {/* <NodeLayer />
                    <RelationLayer /> */}
                </div>
                <div
                    className={[`${css['aside-right-wrapper']}`, `${css['aside-wrapper']}`].join(
                        ' '
                    )}
                >
                    <div className={css['statistics-wrapper']}>
                        <span>文献134xx篇</span>
                        <span onClick={() => onEntityClick('1')}>科研项目134xx个</span>
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
            <Drawer
                className={css['layer-drawer']}
                width={380}
                placement="right"
                onClose={() => setCurrentDrawer('')}
                visible={!!currentDrawer}
                bodyStyle={{ padding: 0 }}
            >
                <RelationLayer />
            </Drawer>
        </div>
    );
};
export default GraphPage;
