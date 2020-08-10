import React, { useEffect } from 'react'
import echarts from 'echarts'
const Bar = () => {
  useEffect(() => {
    drawBar()
  })

  const drawBar = () => {
    const container = document.getElementById('container') as HTMLDivElement | HTMLCanvasElement
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(container);

    var dataStyle = {
      normal: {
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        shadowBlur: 30,
        shadowColor: 'rgba(40, 40, 40, 0.3)',
      }
    };

    var placeHolderStyle = {
      normal: {
        color: 'rgba(0,0,0,0)',
        label: {
          show: false
        },
        labelLine: {
          show: false
        }
      },
      emphasis: {
        color: 'rgba(0,0,0,0)'
      }
    };

    const option = {
      color: ["#4C3CAE", "#8C0F86", "#CA2C95", "#E1A4C4", "#857ABA"],
      tooltip: {
        show: true,
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        itemGap: 12,
        top: '10%',
        textStyle: {
          color: '#FE80C8',
        },
        data: ['01', '02', '03', '04', '05', '06']
      },

      series: [{
        name: 'Line 1',
        type: 'pie',
        clockWise: false,
        radius: [40, 50],
        itemStyle: dataStyle,
        hoverAnimation: false,
        data: [{
          value: 100,
          name: '01'
        },
        {
          value: 50,
          name: 'invisible',
          itemStyle: placeHolderStyle
        }

        ]
      },
      {
        name: 'Line 2',
        type: 'pie',
        clockWise: false,
        radius: [30, 40],
        itemStyle: dataStyle,
        hoverAnimation: false,

        data: [{
          value: 50,
          name: '02'
        },
        {
          value: 50,
          name: 'invisible',
          itemStyle: placeHolderStyle
        }
        ]
      },
      {
        name: 'Line 3',
        type: 'pie',
        clockWise: false,
        hoverAnimation: false,
        radius: [20, 30],
        itemStyle: dataStyle,

        data: [{
          value: 20,
          name: '03'
        },
        {
          value: 50,
          name: 'invisible',
          itemStyle: placeHolderStyle
        }
        ]
      }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }

  const getArrayValue = (array: any, key: any) => {
    var key = key || "value";
    var res: number[] = [];
    if (array) {
      array.forEach(function (t: any) {
        res.push(t[key]);
      });
    }
    return res;
  }

  const array2obj = (array: any, key: any) => {
    var resObj: any = {};
    for (var i = 0; i < array.length; i++) {
      resObj[array[i][key]] = array[i];
    }
    return resObj;
  }

  const getData = (data: any, sumValue: any) => {

    var res: any = {
      series: [],
      yAxis: []
    };
    for (let i = 0; i < data.length; i++) {
      // console.log([70 - i * 15 + '%', 67 - i * 15 + '%']);
      const seriesData = {
        name: '',
        type: 'pie',
        clockWise: false, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        radius: [73 - i * 15 + '%', 68 - i * 15 + '%'],
        center: ["30%", "55%"],
        label: {
          show: false
        },
        itemStyle: {
          label: {
            show: false,
          },
          labelLine: {
            show: false
          },
          borderWidth: 5,
        },
        data: [
          {
            value: data[i].value,
            name: data[i].name
          },
          {
            value: sumValue - data[i].value,
            name: '',
            itemStyle: {
              color: "rgba(0,0,0,0)",
              borderWidth: 0
            },
            tooltip: {
              show: false
            },
            hoverAnimation: false
          }]
      }
      res.series.push(seriesData);

      res.series.push({
        name: '',
        type: 'pie',
        silent: true,
        z: 1,
        clockWise: false, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        radius: [73 - i * 15 + '%', 68 - i * 15 + '%'],
        center: ["30%", "55%"],
        label: {
          show: false
        },
        itemStyle: {
          label: {
            show: false,
          },
          labelLine: {
            show: false
          },
          borderWidth: 5,
        },
        data: [{
          value: 7.5,
          itemStyle: {
            color: "rgb(3, 31, 62)",
            borderWidth: 0
          },
          tooltip: {
            show: false
          },
          hoverAnimation: false
        }, {
          value: 2.5,
          name: '',
          itemStyle: {
            color: "rgba(0,0,0,0)",
            borderWidth: 0
          },
          tooltip: {
            show: false
          },
          hoverAnimation: false
        }]
      });

      res.yAxis.push((data[i].value / sumValue * 100).toFixed(2) + "%");
    }
    return res;
  }

  return <div className='bar-wrapper' id='container' style={{ width: 370, height: 200 }}></div>
}
export default Bar