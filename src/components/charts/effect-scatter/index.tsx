import React, { useEffect } from 'react'
// 引入 ECharts 主模块
import echarts from 'echarts'

const EchartsGraph: React.FC = () => {
  var plantCap = [{
    name: '居住',
    value: 'Settlements'
  }, {
    name: '行政',
    value: 'administration'
  }, {
    name: '文化',
    value: 'Culture'
  }, {
    name: '医疗',
    value: 'hospital '
  }, {
    name: '教育',
    value: 'education '
  }, {
    name: '交通',
    value: 'hospital'
  }, {
    name: '产业',
    value: 'industry'
  }];

  var datalist = [{
    offset: [50, 50],
    symbolSize: 50,
    opacity: .95,
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      offset: 0,
      color: '#29c0fb'
    }, {
      offset: 1,
      color: '#2dc5b9'
    }]),
  }, {
    offset: [30, 70],
    symbolSize: 65,
    opacity: .95,
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      offset: 0,
      color: '#35d17e'
    }, {
      offset: 1,
      color: '#49ddb2'
    }]),
  }, {
    offset: [13, 43],
    symbolSize: 40,
    opacity: .95,
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      offset: 0,
      color: '#e5d273'
    }, {
      offset: 1,
      color: '#e4a37f'
    }]),
  }, {
    offset: [49, 26],
    symbolSize: 40,
    opacity: .95,
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      offset: 0,
      color: '#277aec'
    }, {
      offset: 1,
      color: '#57c5ec'
    }]),
  }, {
    offset: [88, 58],
    symbolSize: 35,
    opacity: .95,
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      offset: 0,
      color: '#e54948'
    }, {
      offset: 1,
      color: '#f08456'
    }]),
  }, {
    offset: [79, 36],
    symbolSize: 48,
    opacity: .7,
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      offset: 0,
      color: '#11c46e'
    }, {
      offset: 1,
      color: '#f08456'
    }]),
  }, {
    offset: [64, 75],
    symbolSize: 55,
    opacity: .68,
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      offset: 0,
      color: '#ff4141'
    }, {
      offset: 1,
      color: '#ff8989'
    }]),
  }];
  var datas = [];
  for (var i = 0; i < plantCap.length; i++) {
    var item = plantCap[i];
    var itemToStyle = datalist[i];
    datas.push({
      name: item.name + '\n' + item.value,
      value: itemToStyle.offset,
      symbolSize: itemToStyle.symbolSize,
      label: {
        normal: {
          textStyle: {
            fontSize: 12,
            fontWeight: 800,
            lineHeight: 20,
          }
        }
      },
      itemStyle: {
        normal: {
          color: itemToStyle.color,
          opacity: itemToStyle.opacity
        }
      },
    })
  }
  const option: any = {
    backgroundColor: '#12468500',
    grid: {
      show: false,
      top: 10,
      bottom: 10
    },
    xAxis: [{
      gridIndex: 0,
      type: 'value',
      show: false,
      min: 0,
      max: 100,
      nameLocation: 'middle',
      nameGap: 5
    }],
    yAxis: [{
      gridIndex: 0,
      min: 0,
      show: false,
      max: 100,
      nameLocation: 'middle',
      nameGap: 30
    }],
    series: [{
      type: 'effectScatter',
      // symbol: 'circle',
      // symbolSize: 120,

      hoverAnimation: true,
      label: {
        normal: {
          show: true,
          formatter: '{b}',
          color: '#fff',
          textStyle: {
            fontSize: '20'
          }
        },
      },
      itemStyle: {
        normal: {
          color: '#00acea'
        }
      },
      data: datas
    }]
  }
  useEffect(() => {
    renderGraph()
  }, [])
  const renderGraph = () => {
    const container = document.getElementById('effectScatter') as HTMLDivElement | HTMLCanvasElement
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(container);
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
  return <div id='effectScatter' style={{ width: '100%', height: '300px' }}>echarts graph</div>
}
export default EchartsGraph