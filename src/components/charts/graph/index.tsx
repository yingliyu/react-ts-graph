import React, { useEffect } from 'react'
// 引入 ECharts 主模块
import echarts from 'echarts'

type echartsOpType = echarts.EChartsResponsiveOption | echarts.EChartOption<echarts.EChartOption<echarts.EChartOption.Series>>

const EchartsGraph: React.FC = () => {
  const colorList = [[
    '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
    '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
    '#1e90ff', '#ff6347', '#7b68ee', '#d0648a', '#ffd700',
    '#6b8e23', '#4ea397', '#3cb371', '#b8860b', '#7bd9a5'
  ],
  [
    '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
    '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
    '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
    '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0'
  ],
  [
    '#929fff', '#9de0ff', '#ffa897', '#af87fe', '#7dc3fe',
    '#bb60b2', '#433e7c', '#f47a75', '#009db2', '#024b51',
    '#0780cf', '#765005', '#e75840', '#26ccd8', '#3685fe',
    '#9977ef', '#f5616f', '#f7b13f', '#f9e264', '#50c48f'
  ]][2];
  const option: any = {
    // 图表标题
    title: {
      show: true,//显示策略，默认值true,可选为：true（显示） | false（隐藏）
      text: '',//主标题文本，'\n'指定换行
      // x: 'left',        // 水平安放位置，默认为左对齐，可选为：
      // 'center' ¦ 'left' ¦ 'right'
      // ¦ {number}（x坐标，单位px）
      // y: 'top',             // 垂直安放位置，默认为全图顶端，可选为：
      // 'top' ¦ 'bottom' ¦ 'center'
      // ¦ {number}（y坐标，单位px）
      //textAlign: null          // 水平对齐方式，默认根据x设置自动调整
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: '#ccc',    // 标题边框颜色
      borderWidth: 0,         // 标题边框线宽，单位px，默认为0（无边框）
      padding: 5,             // 标题内边距，单位px，默认各方向内边距为5，
      // 接受数组分别设定上右下左边距，同css
      itemGap: 10,            // 主副标题纵向间隔，单位px，默认为10，
      textStyle: {
        fontSize: 18,
        fontWeight: 'bolder',
        color: '#333'        // 主标题文字颜色
      },
      subtextStyle: {
        color: '#aaa'        // 副标题文字颜色
      }
    },
    backgroundColor: '#fff',
    tooltip: {
      formatter: function (params: any, ticket: any, callback: any) {
        //根据业务自己拓展要显示的内容
        var res = "";
        var name = params.data.label ? params.data.label : params.name;
        var value = params.value;
        res = "<span><b style='display:inline-block;position:relative;left:-3px;top:-3px;width:5px;height:5px;border-radius:50%;background:" + params.color + "'></b>" + name + "</span><br/>相关度：" + value;
        return res;
      }
    },
    animationDurationUpdate: function (idx: any) {
      // 越往后的数据延迟越大
      return idx * 100;
    },
    animationEasingUpdate: 'bounceIn',
    color: ['#fff', '#fff', '#fff'],
    series: [{
      type: 'graph',
      layout: 'force',
      force: {
        repulsion: 110, //节点之间的斥力因子
        edgeLength: 10
      },
      roam: true,
      label: {
        normal: {
          show: true
        }
      },
      data: [{
        "name": "新冠肺炎",
        "label": "新冠肺炎label",
        "value": 2373,
        "symbolSize": 68,
        "draggable": true,
        "itemStyle": {
          "normal": {
            // "shadowBlur": 100,
            "shadowColor": colorList[0],
            "color": colorList[0]
          }
        }
      }, {
        "name": "女篮两连胜",
        "value": 5449,
        "symbolSize": 73,
        "draggable": true,
        "itemStyle": {
          "normal": {
            // "shadowBlur": 100,
            "shadowColor": colorList[1],
            "color": colorList[1]
          }
        }
      }, {
        "name": "火神山医院开微博",
        "value": 2289,
        "symbolSize": 67,
        "draggable": true,
        "itemStyle": {
          "normal": {
            // "shadowBlur": 100,
            "shadowColor": colorList[2],
            "color": colorList[2]
          }
        }
      }, {
        "name": "医疗队女队员",
        "value": 2518,
        "symbolSize": 60,
        "draggable": true,
        "itemStyle": {
          "normal": {
            // "shadowBlur": 100,
            "shadowColor": colorList[3],
            "color": colorList[3]
          }
        }
      }, {
        "name": "缅怀疫情中\n逝去的人们",
        "value": 4730,
        "symbolSize": 78,
        "draggable": true,
        "itemStyle": {
          "normal": {
            // "shadowBlur": 100,
            "shadowColor": colorList[4],
            "color": colorList[4]
          }
        }
      }, {
        "name": "66岁重症患者\n8天快速康复",
        "value": 926,
        "symbolSize": 70,
        "draggable": true,
        "itemStyle": {
          "normal": {
            // "shadowBlur": 100,
            "shadowColor": colorList[6],
            "color": colorList[6]
          }
        }
      }, {
        "name": "等在寒风中",
        "value": 4536,
        "symbolSize": 67,
        "draggable": true,
        "itemStyle": {
          "normal": {
            // "shadowBlur": 100,
            "shadowColor": colorList[7],
            "color": colorList[7]
          }
        }
      }, {
        "name": "新增病例数\n连降5天",
        "value": 750,
        "symbolSize": 47,
        "draggable": true,
        "itemStyle": {
          "normal": {
            // "shadowBlur": 100,
            "shadowColor": colorList[8],
            "color": colorList[8]
          }
        }
      }, {
        "name": "女儿写给战疫\n一线爸爸的信",
        "value": 493,
        "symbolSize": 82,
        "draggable": true,
        "itemStyle": {
          "normal": {
            // "shadowBlur": 100,
            "shadowColor": colorList[9],
            "color": colorList[9]
          }
        }
      }, {
        "name": "一张图看懂\n新冠肺炎",
        "value": 200,
        "symbolSize": 80,
        "draggable": true,
        "itemStyle": {
          "normal": {
            // "shadowBlur": 100,
            "shadowColor": colorList[19],
            "color": colorList[19]
          }
        },
        "url": "https://gallery.echartsjs.com/preview.html?c=xPLngHx_Z&v=1"
      }]
    }]
  }
  useEffect(() => {
    renderGraph()
  }, [])
  const renderGraph = () => {
    const container = document.getElementById('echartsGraph') as HTMLDivElement | HTMLCanvasElement
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(container);
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
  return <div id='echartsGraph' style={{ width: '100%', height: '260px', borderRadius: '5px' }}></div>
}
export default EchartsGraph