import React, { useState, useEffect } from 'react';
import Graph from '../../components/graph';
import { baseApi, expertApi } from '../../services'
import css from './index.module.less'
import { Input, Radio, Button } from 'antd';

const GraphPage: React.FC = props => {
  type ExampleType = {
    entityId: string
    entityName: string
    entityType: string
    orgId: string
    orgName: string
  }
  const exampleDefault: ExampleType[] = []
  const [exampleList, setExampleList] = useState(exampleDefault)
  const [activeExampleId, seActiveExampleId] = useState(0)
  const [showExample, setShowExample] = useState(false)
  useEffect(() => {
    initExamplesData()
    getGraphData()
  }, [])

  // 初始化示例数据
  const initExamplesData = async () => {
    try {
      const res = await baseApi.getExamples({ page: 1 })
      console.log(res)
      setExampleList(res)
      console.log(exampleList);

    } catch (error) {
      console.log(error)
    }
  }

  // 获取图谱数据
  const getGraphData = async () => {
    try {
      const params = {
        "entityId": "9629e6f710354de888dde8e201be80e0",
        "entityName": "Seregin Vadim"
      }
      const res = await expertApi.getExpertGraph(params)
      console.log(res);

    } catch (error) {
      console.log(error)
    }
  }
  const showExampleHandle = () => {
    setShowExample(true)
  }
  return (
    <div className={css['graph-page-wrapper']}>
      <h2>上海人工智能研发资源图谱</h2>
      <div className={css['container']}>
        <section className={[`${css['aside-left-wrapper']}`, `${css['aside-wrapper']}`].join(' ')}>
          left content
        </section>
        <div className={css['main-wrapper']}>
          <div className={css['search-wrapper']}>
            <Input.Search
              placeholder="请您输入您所要查询的内容"
              onSearch={value => console.log(value)}
              style={{ width: 400 }}
              loading={false}
            />
            <span className={css['example-btn']} onClick={() => showExampleHandle}>示例</span>
            <div className={[`${css['examples-wrapper']}`, `${showExample ? css['show-example'] : ''}`].join(' ')}>
              <section className={css['expert-words']}>
                {exampleList.map((item, index) => {
                  if (item.entityType === 'EXPERT') {
                    return (
                      <Button
                        className={index === activeExampleId ? css['active'] : ''}
                        key={item.entityName}
                      // onClick={() => this.changeCurrentField(index)}
                      >
                        {item.entityName}
                      </Button>
                    )
                  }
                })}

              </section>
              <section className={css['subject-words']}>
                {exampleList.map((item, index) => {
                  if (item.entityType === 'SUBJECT') {
                    return (
                      <Button
                        className={index === activeExampleId ? css['active-field'] : ''}
                        key={item.entityName}
                      // onClick={() => this.changeCurrentField(index)}
                      >
                        {item.entityName}
                      </Button>
                    )
                  }
                })}
              </section>
              <div className={css['example-footer']}>
                <Button type="primary">换一组</Button>
                <Button >关闭</Button>
              </div>
              {/* {
                exampleList.forEach(item => {
                  return (<Button>{item.entityName}</Button>)
                })
              } */}

            </div>
          </div>
          <div className={css['toggle-btn-group']}>
            <Radio.Group>
              <Radio.Button value="large">关系图谱</Radio.Button>
              <Radio.Button value="default">资源图谱</Radio.Button>
            </Radio.Group>
          </div>

          <Graph {...props}></Graph>
        </div>
        <section className={[`${css['aside-right-wrapper']}`, `${css['aside-wrapper']}`].join(' ')}>
          right content
        </section>
      </div>

    </div>
  )
};
export default GraphPage;
