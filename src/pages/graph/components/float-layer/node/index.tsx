import React from 'react';
import css from './index.module.less';
import { Tag, Icon } from 'antd';
import ExpertLayer from './expert';
import OrganLayer from './organ';
import JournalLayer from './journal';
import SubjectLayer from './subject';
import PaperLayer from './paper';
import PatentLayer from './patent';
import ProjectLayer from './project';
export default function NodeLayer() {
    return (
        <div className={css['node-layer']}>
            <div className={css['layer-header']}>
                <div>
                    <Tag color="#2079ff">专家</Tag>
                    <Tag color="#2079ff">实体</Tag>
                </div>

                <small>
                    <Icon type="close-circle" />
                </small>
            </div>
            <ProjectLayer />
            {/* <PatentLayer /> */}
            {/* <PaperLayer /> */}
            {/* <SubjectLayer /> */}
            {/* <JournalLayer /> */}
            {/* <ExpertLayer /> */}
            {/* <OrganLayer /> */}
        </div>
    );
}
