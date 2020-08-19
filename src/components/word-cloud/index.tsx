import React, { useEffect } from 'react';
import echarts from 'echarts';
import 'echarts-wordcloud';
import { ICommonProps } from '../../models/global';

interface IWordCloud {
    list: ICommonProps[];
}

const WordCloud: React.FC<IWordCloud> = (props: IWordCloud) => {
    const { list } = props;
    useEffect(() => {
        console.log(props);
        drawWordCloud();
    }, []);

    const drawWordCloud = () => {
        const wordElement = document.getElementById('wordCloud');
        let chart = echarts.init(wordElement as HTMLDivElement);

        let data = [];

        for (let index in list) {
            data.push({
                name: list[index].name,
                value: Math.sqrt(list[index].value)
            });
        }

        // let maskImage = new Image();
        // maskImage.src = logo

        let option = {
            tooltips: {
                show: true,
                formatter: (item: any) => {
                    console.log(item);
                }
            },
            series: [
                {
                    type: 'wordCloud',
                    left: 'center',
                    top: 'center',
                    width: '90%',
                    height: '90%',
                    right: null,
                    bottom: null,
                    sizeRange: [12, 30],
                    rotationRange: [-90, 90],
                    rotationStep: 45,
                    gridSize: 8,
                    shape: 'star',
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
                    data: data.sort(function (a: any, b: any) {
                        return b.value - a.value;
                    })
                }
            ]
        };
        chart.setOption(option);
    };

    return <div id="wordCloud" style={{ height: 230, width: 370 }} />;
};

export default WordCloud;
