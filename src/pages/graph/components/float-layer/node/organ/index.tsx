import React from 'react';
import css from './index.module.less';
export default function Organ() {
    return (
        <div className={css['organ-layer']}>
            <ul>
                <li>
                    <span>机构名称：</span>
                    <span>
                        广州呼吸疾病广州呼吸疾病研究所广州呼吸疾病研究所广州呼吸疾病研究所研究所
                    </span>
                </li>
                <li>
                    <span>单位性质：</span>
                    <span>中国</span>
                </li>
                <li>
                    <span>所属省市：</span>
                    <span>广东省东莞市</span>
                </li>
            </ul>
        </div>
    );
}
