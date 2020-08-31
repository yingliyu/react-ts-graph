import React from 'react';
import css from './index.module.less';
import { Tag, Tooltip } from 'antd';
export default function Project() {
    return (
        <div className={css['project-layer']}>
            <ul>
                <li>
                    <span>项目标题：</span>
                    <Tooltip placement="right" title="xxxxxxxxxxxxxx">
                        <span className={css['limit-one-line']}>xxxxxxxxxx</span>
                    </Tooltip>
                </li>
                <li>
                    <span>学科标签：</span>
                    <span className={[css['subject-tags'], css['limit-one-line']].join(' ')}>
                        <Tag color="geekblue">学科词1</Tag>
                        <Tag color="geekblue">学科词2</Tag>
                        <Tag color="geekblue">学科词ddd1</Tag>
                    </span>
                </li>
                <li>
                    <span>依托单位：</span>
                    <Tooltip
                        placement="right"
                        title="广州呼吸疾病研究所广州呼吸疾病研究所广州呼吸疾病研究所"
                    >
                        <span className={css['limit-one-line']}>
                            广州呼吸疾病研究所广州呼吸疾病研究所广州呼吸疾病研究所
                        </span>
                    </Tooltip>
                </li>
                <li>
                    <span>批准时间：</span>
                    <span>2202-01-08</span>
                </li>
                <li>
                    <span>摘要：</span>
                    <span>
                        钟南山，男，汉族，中共党员，1936年10月出生于江苏南京，福建厦门人，呼吸内科学家，广州医科大学附属第一医院国家呼吸系统疾病临床医学研究中心主任，中国工程院院士
                        [1] ，中国医学科学院学部委员 [2]
                        ，中国抗击非典型肺炎的领军人物，曾任广州医学院院长、党委书记，广州市呼吸疾病研究所所长、广州呼吸疾病国家重点实验室主任、中华医学会会长。
                        [3-6] 国家卫健委高级别专家组组长、 [7] 国家健康科普专家。 [8]
                        钟南山出生于医学世家；1958年8月，在第一届全运会的比赛测验中，钟南山以54秒2的成绩，打破了当时54秒6的400米栏全国纪录
                        [9]
                        。1960年毕业于北京医学院（今北京大学医学部）；2007年获英国爱丁堡大学荣誉博士；2007年10月任呼吸疾病国家重点实验室主任；2014年获香港中文大学荣誉理学博士
                        [10] ；2019年被聘为中国医学科学院学部委员 [2]
                        ；2020年8月11日，习近平签署主席令，授予钟南山“共和国勋章” [11] 。
                    </span>
                </li>
            </ul>
        </div>
    );
}
