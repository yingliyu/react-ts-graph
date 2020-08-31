import React from 'react';
import css from './index.module.less';
import { Tag } from 'antd';
export default function FieldLayer() {
    return (
        <div className={css['field-wrapper']}>
            <span>共同领域：</span>
            <div>
                <Tag color="geekblue">geekblue</Tag>
                <Tag color="geekblue">geekblue</Tag>
                <Tag color="geekblue">geekblue</Tag>
                <Tag color="geekblue">geekblue</Tag>
                <Tag color="geekblue">geekblue</Tag>
                <Tag color="geekblue">geekblue</Tag>
            </div>
        </div>
    );
}
