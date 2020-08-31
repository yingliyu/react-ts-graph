import React from 'react';
import css from './index.module.less';
export default function OfficeLayer() {
    return (
        <div className={css['office-layer']}>
            <ul>
                <li>
                    <span>职务：</span>
                    <span>科学院院长xxxxx</span>
                </li>
                <li>
                    <span>就职时间：</span>
                    <span>2013-12-23</span>
                </li>
            </ul>
        </div>
    );
}
