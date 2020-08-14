import React, { useState, useEffect } from 'react';

import css from './index.module.less';
import { Select, Radio, Button, Spin, Icon } from 'antd';
import Title from './components/title';
import ExpertInfo from './components/expert-info';
// import WordCloud from '../../components/word-cloud';
import ExpertResume from './components/expert-resume';
import Graph from '../../components/graph';
import EchartsGraph from '../../components/charts/graph';
// import Pie from '../../components/charts/pie';
// import Bar from '../../components/charts/bar';
import debounce from 'lodash.debounce';
import { baseApi, expertApi } from '../../services';

import { LiteratureType, ICommonProps, IExampleData } from '../../utils/constant';

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
        value: 50000000
    },
    {
        name: '已损坏资源量',
        value: 120000000
    }
];

const GraphPage: React.FC = (props) => {
    const exampleDefault: IExampleData[] = [];
    const [exampleList, setExampleList] = useState(exampleDefault);
    const [activeExampleId, seActiveExampleId] = useState('0');
    const [showExample, setShowExample] = useState(false);

    const [suggestInfo, setSuggestInfo] = useState({
        list: [],
        loading: false,
        showModal: false
    });

    const [graphData, setGraphData] = useState();
    const [activeGraph, setActiveGraph] = useState(0);
    const [queryValue, setQueryValue] = useState([]);

    useEffect(() => {
        getGraphData();
    }, [queryValue]);

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
        try {
            const queryObj: any = suggestInfo.list.filter(
                (item: any) => item.entityName === queryValue[0]
            );
            /*{
            "entityId": "9629e6f710354de888dde8e201be80e0",
            "entityName": "Seregin Vadim"
            }*/
            const params: any = {
                entityId:
                    queryObj.length && queryObj
                        ? queryObj[0].entityId
                        : '9629e6f710354de888dde8e201be80e0',
                entityName: queryObj.length && queryObj ? queryObj[0].entityName : 'Seregin Vadim'
            };
            const res = await expertApi.getExpertGraph(params);
            setGraphData(res);
        } catch (error) {
            console.log(error);
        }
    };

    // 监听输入框值改变后去获取关联list
    const inputSearchHandle = (value: any): void => {
        setSuggestInfo({
            list: suggestInfo.list,
            loading: true,
            showModal: true
        });
        getSuggestWords(value);
    };

    // 获取关联list数据
    const getSuggestWords = async (val: string) => {
        try {
            const res = await baseApi.getSuggestWords({ word: val });
            setSuggestInfo({
                list: res,
                loading: false,
                showModal: true
            });
        } catch (error) {
            setSuggestInfo({
                list: suggestInfo.list,
                loading: false,
                showModal: suggestInfo.showModal
            });
        }
    };

    // 防抖、节流
    debounce(getSuggestWords, 800);

    // 点击联想词之后触发的查询事件
    const selectSuggestWordHandle = (value: any) => {
        setSuggestInfo({
            list: suggestInfo.list,
            loading: false,
            showModal: false
        });
        setQueryValue(value);
    };

    // 显示示例
    const showExampleHandle = () => {
        if (!showExample) {
            examplePage = 1;
            getExamplesData();
        } else {
            setShowExample(false);
        }
    };

    // 示例点击事件
    const exampleClickHandle = (item: IExampleData): void => {
        console.log('click ok===', item);
        seActiveExampleId(item.entityId);
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
                <div
                    className={[`${css['aside-left-wrapper']}`, `${css['aside-wrapper']}`].join(
                        ' '
                    )}
                >
                    <div className={css['statistics-wrapper']}>
                        <span>实体134个</span>
                        <span>实体134个</span>
                    </div>
                    {/* 专家基本信息 */}
                    <ExpertInfo />
                    <section className={css['subject-distribution']}>
                        <Title title="学科分布" />
                        {/* <WordCloud list={wordCloudList} /> */}
                    </section>
                    <section>
                        <Title title="热词分布" />
                        <EchartsGraph />
                    </section>
                </div>
                <div className={css['main-wrapper']}>
                    <div className={css['search-wrapper']}>
                        <Select
                            showSearch={true}
                            value={queryValue}
                            mode="multiple"
                            open={suggestInfo.showModal}
                            placeholder="请输入搜索词并在下拉菜单选择知识图谱"
                            notFoundContent={
                                suggestInfo.loading ? <Spin size="small" /> : '无关联知识图谱'
                            }
                            filterOption={false}
                            onSearch={(value) => inputSearchHandle(value)}
                            onChange={(value: any) => selectSuggestWordHandle(value)}
                            style={{ width: 480, height: 50 }}
                            defaultActiveFirstOption={true}
                            suffixIcon={<Icon type="search" />}
                        >
                            {suggestInfo.list.map((item: any) => (
                                <Option key={item.entityName}>
                                    {item.entityName + (item.orgName ? ' ' + item.orgName : '')}
                                </Option>
                            ))}
                        </Select>

                        <span className={css['example-btn']} onClick={showExampleHandle}>
                            示例
                        </span>
                        {/* 所有示例 */}
                        <div
                            className={[
                                `${css['examples-wrapper']}`,
                                `${showExample ? css['show-example'] : ''}`
                            ].join(' ')}
                        >
                            <section className={css['expert-words']}>
                                {exampleList.map((item, index) => {
                                    if (item.entityType === 'EXPERT') {
                                        return (
                                            <Button
                                                className={
                                                    item.entityId === activeExampleId
                                                        ? css['active']
                                                        : ''
                                                }
                                                key={item.entityName + '_' + index}
                                                onClick={() => exampleClickHandle(item)}
                                            >
                                                {item.entityName}
                                            </Button>
                                        );
                                    }
                                    return '';
                                })}
                            </section>
                            <section className={css['subject-words']}>
                                {exampleList.map((item, index) => {
                                    if (item.entityType === 'SUBJECT') {
                                        return (
                                            <Button
                                                className={
                                                    item.entityId === activeExampleId
                                                        ? css['active']
                                                        : ''
                                                }
                                                key={item.entityName + '_' + index}
                                                onClick={() => exampleClickHandle(item)}
                                            >
                                                {item.entityName}
                                            </Button>
                                        );
                                    } else {
                                        return '';
                                    }
                                })}
                            </section>
                            <div className={css['example-footer']}>
                                <Button type="primary" onClick={examplePageHandle}>
                                    换一组
                                </Button>
                                <Button onClick={() => setShowExample(false)}>关闭</Button>
                            </div>
                        </div>
                    </div>
                    <div className={css['toggle-btn-group']}>
                        <Radio.Group value={activeGraph} onChange={toggleGraphHandle}>
                            <Radio.Button value={0}>关系图谱</Radio.Button>
                            <Radio.Button value={1}>资源图谱</Radio.Button>
                        </Radio.Group>
                    </div>
                    {/* 知识图谱 */}
                    <Graph {...graphData} {...props} />
                </div>
                <div
                    className={[`${css['aside-right-wrapper']}`, `${css['aside-wrapper']}`].join(
                        ' '
                    )}
                >
                    <div className={css['statistics-wrapper']}>
                        <span>实体134个</span>
                        <span>实体134个</span>
                    </div>
                    {/* 专家履历 */}
                    <ExpertResume />

                    <section className={css['literature-field']}>
                        <Title title="文献领域分布" />
                        {/* <Pie
                            data={literatureFieldList}
                            canvasContainer="pieContainer"
                            type="ring"
                        /> */}
                    </section>

                    <section className={css['journal-distribution']}>
                        <Title title="期刊分布" />
                        {/* <Bar
                            width={370}
                            height={145}
                            data={journalDistributionList}
                            canvasContainer="barContainer"
                        /> */}
                    </section>

                    <section className={css['key-disciplines']}>
                        <Title title="重点学科匹配度" />
                        {/* <Pie data={literatureFieldList} canvasContainer="simplePieContainer" /> */}
                    </section>

                    <section className={css['high-cited']}>
                        <Title title="高被引占比" />
                        {/* <Bar
                            width={370}
                            height={100}
                            data={hightCitedList}
                            canvasContainer="verticalBarContainer"
                            showYAxis={true}
                            showLegend={false}
                            barBorderRadius={30}
                            align="vertical"
                        /> */}
                    </section>
                </div>
            </div>
        </div>
    );
};
export default GraphPage;
