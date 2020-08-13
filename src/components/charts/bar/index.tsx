import React, { useEffect } from 'react';
import echarts from 'echarts';
import { LiteratureType } from '../../../utils/constant';

interface PropsType {
    width: number;
    height: number;
    data: LiteratureType[];
    canvasContainer: string;
    showYAxis?: boolean; // 是否显示y轴
    showLegend?: boolean; // 是否Legend
    barBorderRadius?: number;
    align?: string; // 垂直 or 水平柱状图
}

const Bar: React.FC<PropsType> = (props) => {
    const {
        data,
        canvasContainer,
        barBorderRadius = 0,
        showYAxis = false,
        showLegend = true,
        width,
        height,
        align
    } = props;

    useEffect(() => {
        drawBar();
    });

    const drawBar = () => {
        const container = document.getElementById(canvasContainer) as
            | HTMLDivElement
            | HTMLCanvasElement;
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(container);
        const nameArr = getArrayValue(data, 'name');
        const valueArr = getArrayValue(data, 'value');
        const salvProMax = new Array(nameArr.length).fill(Math.max(...valueArr));
        const grid = {
            left: '50%',
            right: '4%',
            bottom: '10%',
            top: '10%'
        };
        const gridVertical = {
            left: '30%',
            right: '20%',
            bottom: '10%',
            top: '30%'
            // containLabel: true
        };
        const seriesList: any = [
            {
                type: 'bar',
                barWidth: '15',
                zlevel: 2,
                barGap: '150%' /* 多个并排柱子设置柱子之间的间距 */,
                itemStyle: {
                    normal: {
                        barBorderRadius: barBorderRadius,
                        color: function (params: any) {
                            const colorList = [
                                '#36CFC9',
                                '#40A9FF',
                                '#597EF7',
                                '#9254DE',
                                '#F759AB',
                                '#FFA940'
                            ];
                            return colorList[params.dataIndex];
                        }
                    }
                },
                data: data
            }
        ];

        if (align === 'vertical') {
            // 背景
            seriesList.push({
                name: '',
                type: 'bar',
                barWidth: 15,
                barGap: '-100%',
                data: salvProMax,
                zlevel: 0,
                itemStyle: {
                    normal: {
                        color: 'rgba(0,0,0,0.1)',
                        barBorderRadius: barBorderRadius
                    }
                }
            });
        } else {
            seriesList.push({
                data: data,
                width: 0,
                height: 0,
                type: 'pie',
                hoverAnimation: false,
                labelLine: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        color: function (params: any) {
                            const colorList = [
                                '#36CFC9',
                                '#40A9FF',
                                '#597EF7',
                                '#9254DE',
                                '#F759AB',
                                '#FFA940'
                            ];
                            return colorList[params.dataIndex];
                        }
                    }
                }
            });
        }

        const option: any = {
            legend: {
                show: showLegend,
                type: 'scroll',
                orient: 'vertical',
                left: '3%',
                top: 'center',
                itemGap: 5,
                selectedMode: true,
                icon: 'pin',
                formatter: function (name: any) {
                    let target;
                    let index;
                    let label = '';
                    const maxLength = 8;
                    const maxAllLen = 15;
                    if (name.length > maxLength) {
                        label = name.slice(0, 8) + '...';
                        label = label.padEnd(maxAllLen, ' ');
                    } else {
                        label = name.padEnd(maxAllLen, ' ');
                    }
                    for (let i = 0, l = option.series[0].data.length; i < l; i++) {
                        if (option.series[0].data[i].name === name) {
                            target = option.series[0].data[i].value;
                            index = i < 6 ? i : 5;
                        }
                    }
                    return `{a| ${label}}{b${index}|     ${target}}`;
                },
                tooltip: {
                    show: true
                },
                textStyle: {
                    rich: {
                        title: {
                            fontSize: 12,
                            lineHeight: 20
                        },
                        value: {
                            fontSize: 14,
                            lineHeight: 20
                        }
                    }
                }
            },
            grid: align === 'vertical' ? gridVertical : grid,
            tooltip: {
                show: true
            },
            xAxis: {
                show: false,
                type: align === 'vertical' ? 'value' : 'category',
                axisLabel: {
                    color: 'rgba(0,0,0,0.6)',
                    fontSize: '12'
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0,0,0,0)'
                    }
                },
                axisTick: {
                    show: false
                }
            },
            yAxis: [
                {
                    show: showYAxis,
                    type: align === 'vertical' ? 'category' : 'value',
                    textStyle: {
                        width: 0
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: align === 'vertical' ? true : false,
                        formatter: function (value: any) {
                            let maxLength = 6; // 每项显示文字个数
                            let valLength = value.length; // X轴类目项的文字个数
                            if (valLength > maxLength) {
                                let temp = ''; // 每次截取的字符串
                                let start = 0; // 开始截取的位置
                                temp = value.substring(start, maxLength) + '...';
                                return temp;
                            } else {
                                return value;
                            }
                        },
                        textStyle: {
                            color: '#333'
                        }
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    data: nameArr
                },
                {
                    show: showYAxis,
                    type: align === 'vertical' ? 'category' : 'value',
                    axisTick: 'none',
                    axisLine: 'none',
                    axisLabel: {
                        formatter: function (value: any) {
                            let maxLength = 6; // 每项显示文字个数
                            let valLength = value.length; // X轴类目项的文字个数
                            if (valLength > maxLength) {
                                let temp = ''; // 每次截取的字符串
                                let start = 0; // 开始截取的位置
                                temp = value.substring(start, maxLength) + '...';
                                temp = temp.padEnd(7, ' ');
                                return temp;
                            } else {
                                return value;
                            }
                        },
                        textStyle: {
                            color: '#333',
                            fontSize: '12'
                        }
                    },
                    data: valueArr
                }
            ],
            series: seriesList
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    };
    const getArrayValue = (array: any, val: any) => {
        let key = val || 'value';
        let res: number[] = [];
        if (array) {
            array.forEach(function (t: any) {
                res.push(t[key]);
            });
        }
        return res;
    };
    return (
        <div
            className="bar-wrapper"
            id={canvasContainer}
            style={{ width: width, height: height }}
        />
    );
};
export default Bar;
