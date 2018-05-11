<template>
  <div  id="myChart" :style="{width: '600px', height: '450px'}">
  </div>
</template>
<script>
export default {
  name: 'migration',
  data () {
    return {
    }
  },
  mounted () {
    console.log("人口迁移图")
    this.drawLine()
  },
  computed: {
  },
  methods: {
    drawLine () {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            backgroundColor: '#404a59',
            title: { text: '人口迁移' },
            tooltip: {},
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        })
    }
  }
}
</script>
