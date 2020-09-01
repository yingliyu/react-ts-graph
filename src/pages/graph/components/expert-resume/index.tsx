import React from 'react';
import css from './index.module.less';
import Title from '../title';
const ExpertResume = () => {
    return (
        <div className={css['expert-resume']}>
            <Title title="履历" />
            <ul>
                <li>
                    <span>荣誉:</span>
                    <span className={css['text-overflow']}>中国工程院院士</span>
                </li>
                <li>
                    <span>职务/职称:</span>
                    <span className={css['text-overflow']}>中国工程院院士</span>
                </li>
                <li>
                    <span>机构:</span>
                    <ol>
                        <li className={css['text-overflow']}>中国工程院院士</li>
                        <li className={css['text-overflow']}>国家为健胃</li>
                        <li className={css['text-overflow']}>
                            广州呼吸疾病研究所广州广州呼吸疾病研究所呼吸xxxx
                        </li>
                    </ol>
                </li>
                <li>
                    <span>履历:</span>
                    <div>
                        <span>
                            中国工程院院士中国工程院院士中国工程院士中国工程院院士中国工程院士中国工程院院士中国工程院士中国工程院院士中国工程院院士中国工程院院士中国工程院院士中国工程院院士中国工程院院士
                        </span>
                        <span>...展示全部</span>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default ExpertResume;
