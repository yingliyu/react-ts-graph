import React from 'react';
import css from './index.module.less';
export default function Journal() {
    return (
        <div className={css['journal-layer']}>
            <ul>
                <li>
                    <span>期刊名称：</span>
                    <span>
                        广州呼吸疾病广州呼吸疾病研究所广州呼吸疾病研究所广州呼吸疾病研究所研究所
                    </span>
                </li>
                <li>
                    <span>是否是TOP：</span>
                    <span>xxx</span>
                </li>
                <li>
                    <span>影响因子：</span>
                    <span>xxxxx</span>
                </li>
                <li>
                    <span>所属国家</span>
                    <span>中华人民共和国</span>
                </li>
            </ul>
        </div>
    );
}
