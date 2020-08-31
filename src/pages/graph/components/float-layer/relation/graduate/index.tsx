import React from 'react';
import css from './index.module.less';
export default function GraduateLayer() {
    return (
        <div className={css['graduate-layer']}>
            <ul>
                <li>
                    <span>毕业于：</span>
                    <span>上海科技创新资源数据中心</span>
                </li>
                <li>
                    <span>毕业时间：</span>
                    <span>2013-12-23</span>
                </li>
            </ul>
        </div>
    );
}
