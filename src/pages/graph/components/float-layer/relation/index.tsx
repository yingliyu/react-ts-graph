import React, { useState } from 'react';
import { Carousel, Tabs, Tag, Icon } from 'antd';
import css from './index.module.less';
import FieldLayer from './field';
import AcademicLayer from './academic-exchange';
import PublishLayer from './publish-journal';
import PaperLayer from './paper';
import PatentLayer from './patent';
import OfficeLayer from './office';
import GraduateLayer from './graduate';
import ProjectLayer from './project';
const { TabPane } = Tabs;
export default function RelationLayer() {
    const [showLayer, setShowLayer] = useState(true);
    const closeLayerHandle = () => {
        setShowLayer(false);
    };
    return (
        <div className={css['relation-layer']} style={{ display: showLayer ? 'block' : 'none' }}>
            <div className={css['layer-tags']}>
                <div>
                    <Tag color="#2079ff">论文合作</Tag>
                    <Tag color="#2079ff">专利合作</Tag>
                </div>
                <small onClick={closeLayerHandle}>
                    <Icon type="close-circle" />
                </small>
            </div>
            <div className={css['layer-header']}>
                <h5>专家 - 机构名称</h5>
                <small>共同发文86篇</small>
            </div>
            <div className={css['layer-body']}>
                <Tabs defaultActiveKey="6">
                    <TabPane tab="同领域" key="1">
                        <FieldLayer />
                    </TabPane>
                    <TabPane tab="学术交流" key="2">
                        <AcademicLayer />
                    </TabPane>
                    <TabPane tab="发表" key="3">
                        <PublishLayer />
                    </TabPane>
                    <TabPane tab="论文合作" key="4">
                        <PaperLayer />
                    </TabPane>
                    <TabPane tab="专利合作" key="5">
                        <PatentLayer />
                    </TabPane>
                    <TabPane tab="项目合作" key="6">
                        <ProjectLayer />
                    </TabPane>
                    <TabPane tab="毕业" key="7">
                        <GraduateLayer />
                    </TabPane>
                    <TabPane tab="任职" key="8">
                        <OfficeLayer />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}
