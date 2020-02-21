<template>
  <div class="chart-container">
    <el-card class="top-card">
      <ul>
        <li>
          <span class="circle primary">{{ topData.increment_users }}</span>
          <span>今日新增用户</span>
        </li>
        <li>
          <span class="circle primary">{{ topData.total_users }}</span>
          <span>总用户量</span>
        </li>
        <li>
          <span class="circle warning">{{ topData.increment_questions }}</span>
          <span>新增试题</span>
        </li>
        <li>
          <span class="circle warning">{{ topData.total_questions }}</span>
          <span>总试题量</span>
        </li>
        <li>
          <span class="circle success">{{ topData.total_done_questions }}</span>
          <span>总刷题量</span>
        </li>
        <li>
          <span class="circle success">{{ topData.personal_questions }}</span>
          <span>人均刷题量</span>
        </li>
      </ul>
    </el-card>
    <el-card class="bottom-card">
      <div ref="chart" class="chart-box"></div>
    </el-card>
  </div>
</template>

<script>
// 导入接口
import { titleData, statisticsData } from '@/api/data.js';
// 导入 echarts
import echarts from 'echarts';
export default {
  name: 'chart',
  data() {
    return {
      topData: {}
    };
  },
  // 获取数据
  created() {
    titleData().then(res => {
      // window.console.log(res)
      this.topData = res.data;
    });
  },
  // echarts的渲染依赖于 dom加载
  mounted() {
    statisticsData().then(res => {
      // window.console.log(res);
      const myChart = echarts.init(this.$refs.chart);
      // 循环数组 ，并返回一个新的数组 新数组的每一项 是 return的值
      let nameArr = res.data.map(v => {
        return v.name;
      });
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          data: nameArr
        },
        // 不写颜色，就会自动
        // color: ['#429dfe', '#f86137', '#aa314d'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: res.data
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });
  }
};
</script>

<style lang="less">
.chart-container {
  .top-card {
    height: 150px;
    margin-bottom: 12px;
    ul {
      display: flex;
      align-items: center;
      padding: 0;
      margin: 0;
      justify-content: space-around;
      list-style: none;
      li {
        span {
          display: block;
          color: #737373;
          text-align: center;
          font-size: 16px;
        }
        .circle {
          width: 99px;
          height: 99px;
          border: 2px solid orange;
          border-radius: 50%;
          font-size: 35px;
          text-align: center;
          line-height: 99px;
          &.primary {
            color: #409efe;
            border-color: #409efe;
          }
          &.warning {
            color: #f86137;
            border-color: #f86137;
          }
          &.success {
            color: #70c58b;
            border-color: #70c58b;
          }
        }
      }
    }
  }
  .bottom-card {
    height: 571px;
  }
  .chart-box {
    height: 571px;
  }
}
</style>
