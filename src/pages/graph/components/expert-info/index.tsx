import React from 'react';
// import { Avatar } from 'antd';
import css from './index.module.less';
const expertImg = require('./imgs/zhong.jpg');
const ExpertInfo = () => {
    return (
        <div className={css['expert-info']}>
            <div className={css['expert-head']}>
                <div className={css['expert-head-wrapper']}>
                    <img src={expertImg} alt="专家头像" />
                    {/* <Avatar src={expertImg} size={92} icon="专家头像" /> */}
                </div>
                <h5>钟南山</h5>
                <span>zhongnanshan</span>
                <span>机构名称XXXXXXXXXX</span>
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
                    <span>前1%高被引数：</span>
                    <b>94.91%</b>
                </li>
            </ul>
        </div>
    );
};

export default ExpertInfo;
