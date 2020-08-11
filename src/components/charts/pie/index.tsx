import React, { useEffect } from 'react'
import echarts from 'echarts'
import { LiteratureType } from '../../../utils/constant'

interface PropsType {
  data: LiteratureType[]
  canvasContainer: string
  type?: string
}

const Pie: React.FC<PropsType> = (props) => {
  const { data, canvasContainer, type } = props
  useEffect(() => {
    drawPie()
  })
  const dataStyle = {
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

  const placeHolderStyle = {
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

  const drawPie = () => {
    const container = document.getElementById(canvasContainer) as HTMLDivElement | HTMLCanvasElement
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(container);

    const arrName = getArrayValue(data, "name");
    // const arrValue = getArrayValue(data, "value");
    const objData = array2obj(data, "name");
    const optionData = getData(data)

    const pieSeries = {
      name: '',
      type: 'pie',
      radius: [0, 55],
      center: ['20%', '35%'],
      itemStyle: dataStyle,
      data: data
    }
    const option: any = {
      color: ["#fdc765", "#23cbff", "#00e5c1", "#E1A4C4", "#857ABA"],
      tooltip: {
        show: true,
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        show: true,
        icon: "roundRect",
        top: '10%',
        left: "40%",
        data: arrName,
        width: 5,
        height: 5,
        padding: [0, 0],
        itemGap: 5,
        formatter: function (name: any) {
          let label = ''
          let maxLength = 6;//每项显示文字个数 
          if (name.length > maxLength) {
            label = name.slice(0, maxLength) + '...';
          } else {
            label = name
          }
          return "{title|" + label + "}           {value|" + (objData[name].value) + "} "
        },
        tooltip: {
          show: true
        },
        textStyle: {
          rich: {
            title: {
              fontSize: 12,
              lineHeight: 20,
            },
            value: {
              fontSize: 14,
              lineHeight: 20,
            }
          }
        }
      },
      series: type === 'ring' ? optionData.series : pieSeries
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

  const getData = (data: any) => {

    var res: any = {
      series: [],
    };
    for (let i = 0; i < data.length; i++) {
      const seriesData = {
        name: '',
        type: 'pie',
        clockWise: false,
        radius: [(i + 1) * 10, (i + 2) * 10],
        center: ["20%", "35%"],
        itemStyle: dataStyle,
        hoverAnimation: false,
        data: [{
          value: data[i].value,
          name: data[i].name
        },
        {
          value: 50,
          name: 'invisible',
          itemStyle: placeHolderStyle
        }
        ]
      }
      res.series.push(seriesData);

    }
    return res;
  }

  return <div className='bar-wrapper' id={canvasContainer} style={{ width: 370, height: 200 }}></div>
}
export default Pie