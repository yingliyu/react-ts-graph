import React, { useState, useEffect } from 'react';
import Graph from '../../components/graph';
import EchartsGraph from '../../components/charts/graph';
// import EffectScatter from '../../components/charts/effect-scatter';
import { baseApi, expertApi } from '../../services';
import css from './index.module.less';
import { Input, Radio, Button } from 'antd';
import ExpertInfo from './components/expert-info';
import SubjectDistribution from './components/subject-distribution';
import ExpertResume from './components/expert-resume';
// import LiteratureField from './components/literature-field'
import Title from './components/title';
import { LiteratureType } from '../../utils/constant';
import Pie from '../../components/charts/pie';
import Bar from '../../components/charts/bar';

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
    interface ExampleType {
        entityId: string;
        entityName: string;
        entityType: string;
        orgId: string;
        orgName: string;
    }

    const exampleDefault: ExampleType[] = [];
    const [exampleList, setExampleList] = useState(exampleDefault);
    const [activeExampleId, seActiveExampleId] = useState('0');
    const [showExample, setShowExample] = useState(false);
    const [graphData, setGraphData] = useState();
    const [activeGraph, setActiveGraph] = useState(0);
    const [queryValue, setQueryValue] = useState('');
    useEffect(() => {
        getGraphData();
    }, []);

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

    // 获取图谱数据
    const getGraphData = async () => {
        try {
            const params = {
                entityId: '9629e6f710354de888dde8e201be80e0',
                entityName: 'Seregin Vadim'
            };
            const res = await expertApi.getExpertGraph(params);
            console.log(res);
            setGraphData(res);
        } catch (error) {
            console.log(error);
        }
    };

    const inputChangeHandle = (event: any): void => {
        event.persist();
        setQueryValue(event.target.value);
    };

    const inputSearchHandle = (val: any) => {
        console.log('search keyword===', val);
    };

    const showExampleHandle = () => {
        if (!showExample) {
            examplePage = 1;
            getExamplesData();
        } else {
            setShowExample(false);
        }
    };

    const exampleClickHandle = (item: ExampleType): void => {
        console.log('click ok===', item);
        seActiveExampleId(item.entityId);
    };

    const examplePageHandle = () => {
        examplePage = examplePage === 5 ? 1 : examplePage + 1;
        getExamplesData();
    };

    const toggleGraphHandle = () => {
        setActiveGraph(activeGraph === 0 ? 1 : 0);
    };

    return (
        <div className={css['graph-page-wrapper']}>
            <h2>上海人工智能研发资源图谱</h2>
            <div className={css['container']}>
                <section
                    className={[`${css['aside-left-wrapper']}`, `${css['aside-wrapper']}`].join(
                        ' '
                    )}
                >
                    <div className={css['statistics-wrapper']}>
                        <span>实体134个</span>
                        <span>实体134个</span>
                    </div>
                    <ExpertInfo />
                    <SubjectDistribution />
                    <Title title="热词分布" />
                    <EchartsGraph />
                    {/* <EffectScatter /> */}
                </section>
                <div className={css['main-wrapper']}>
                    <div className={css['search-wrapper']}>
                        <Input.Search
                            value={queryValue}
                            placeholder="请您输入您所要查询的内容"
                            onChange={(e) => inputChangeHandle(e)}
                            onSearch={(value) => inputSearchHandle(value)}
                            style={{ width: 480, height: 50 }}
                            loading={false}
                            maxLength={100}
                        />
                        <span className={css['example-btn']} onClick={showExampleHandle}>
                            示例
                        </span>
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
                    {/* 引用知识图谱组件 */}
                    <Graph {...graphData} {...props} />
                </div>
                <section
                    className={[`${css['aside-right-wrapper']}`, `${css['aside-wrapper']}`].join(
                        ' '
                    )}
                >
                    <div className={css['statistics-wrapper']}>
                        <span>实体134个</span>
                        <span>实体134个</span>
                    </div>
                    <ExpertResume />
                    <div className={css['literature-field']}>
                        <Title title="文献领域分布" />
                        <Pie
                            data={literatureFieldList}
                            canvasContainer="pieContainer"
                            type="ring"
                        />
                    </div>
                    <div className={css['journal-distribution']}>
                        <Title title="期刊分布" />
                        <Bar
                            width={370}
                            height={145}
                            data={journalDistributionList}
                            canvasContainer="barContainer"
                        />
                    </div>
                    <div className={css['key-disciplines']}>
                        <Title title="重点学科匹配度" />
                        <Pie data={literatureFieldList} canvasContainer="simplePieContainer" />
                    </div>
                    <div className={css['high-cited']}>
                        <Title title="高被引占比" />
                        <Bar
                            width={370}
                            height={100}
                            data={hightCitedList}
                            canvasContainer="verticalBarContainer"
                            showYAxis={true}
                            showLegend={false}
                            barBorderRadius={30}
                            align="vertical"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};
export default GraphPage;
