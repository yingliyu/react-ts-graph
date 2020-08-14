import React from 'react';
import css from './index.module.less';
const expertImg = require('./imgs/zhong.jpg');
const ExpertInfo = () => {
    return (
        <div className={css['expert-info']}>
            <div className={css['expert-head']}>
                <div className={css['expert-head-wrapper']}>
                    <img src={expertImg} alt="专家头像" />
                </div>
                <span>钟南山</span>
                <span>zhongnanshan</span>
                <span>机构名称</span>
            </div>
            <ul>
                <li>
                    <span>总发文数：</span>
                    <b>12133</b>
                </li>
                <li>
                    <span>总被引数：</span>
                    <b>12133</b>
                </li>
                <li>
                    <span>H指数：</span>
                    <b>1213323</b>
                </li>
                <li>
                    <span>前1%高被引：</span>
                    <b>4.91%</b>
                </li>
            </ul>
        </div>
    );
};

export default ExpertInfo;
