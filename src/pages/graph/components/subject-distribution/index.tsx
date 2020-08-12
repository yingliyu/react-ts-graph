import React, { useEffect } from 'react';
import css from './index.module.less';
import Title from '../title';
import 'echarts-wordcloud';
import echarts from 'echarts';
// import logo from './imgs/logo.png';
const SubjectDistribution = () => {
    useEffect(() => {
        drawWordCloud();
    }, []);

    const keywords: {
        [prop: string]: number;
    } = {
        showTitle: 484,
        dataView: 2754,
        restore: 932,
        timeline: 10104,
        range: 477,
        value: 5732,
        precision: 878,
        target: 1433,
        zlevel: 5361,
        symbol: 8718,
        interval: 7964,
        symbolSize: 5300,
        showSymbol: 1247,
        inside: 8913,
        xAxisIndex: 3843,
        orient: 4205,
        boundaryGap: 5073,
        nameGap: 4896,
        zoomLock: 571,
        hoverAnimation: 2307,
        legendHoverLink: 3553
    };

    const drawWordCloud = () => {
        const wordElement = document.getElementById('wordCloud');
        let chart = echarts.init(wordElement as HTMLDivElement);

        let data = [];
        for (let name in keywords) {
            data.push({
                name: name,
                value: Math.sqrt(keywords[name])
            });
        }

        // let maskImage = new Image();
        // maskImage.src = logo

        let option = {
            series: [
                {
                    type: 'wordCloud',
                    sizeRange: [16, 20],
                    rotationRange: [-90, 90],
                    rotationStep: 45,
                    gridSize: 2,
                    shape: 'pentagon',
                    // maskImage: maskImage,
                    textStyle: {
                        normal: {
                            color: function () {
                                return (
                                    'rgb(' +
                                    [
                                        Math.round(Math.random() * 160),
                                        Math.round(Math.random() * 160),
                                        Math.round(Math.random() * 160)
                                    ].join(',') +
                                    ')'
                                );
                            }
                        }
                    },
                    data: data.sort(function (a, b) {
                        return b.value - a.value;
                    })
                }
            ]
        };
        chart.setOption(option);
    };

    return (
        <div className={css['subject-distribution']}>
            <Title title="学科分布" />
            <div
                id="wordCloud"
                style={{ height: 230, width: 400, position: 'relative', left: '-20px' }}
            />
        </div>
    );
};

export default SubjectDistribution;
