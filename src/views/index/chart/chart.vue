<template>
  <div class='chart-container'>
    <el-card class="top-card">
      <ul>
        <li>
          <span class="circle primary">{{topData.increment_users }}</span>
          <span>今日新增用户</span>
        </li>
        <li>
          <span class="circle primary">{{topData.total_users}}</span>
          <span>总用户量</span>
        </li>
        <li>
          <span class="circle warning">{{topData.increment_questions }}</span>
          <span>新增试题</span>
        </li>
        <li>
          <span class="circle warning">{{ topData.total_questions }}</span>
          <span>总试题量</span>
        </li>
        <li>
          <span class="circle success">{{topData.total_done_questions}}</span>
          <span>总刷题量</span>
        </li>
        <li>
          <span class="circle success">{{topData.personal_questions }}</span>
          <span>人均刷题量</span>
        </li>
        
      </ul>
    </el-card>
  </div>
</template>

<script>
// 导入接口
import {titleData} from '@/api/data.js'
export default {
    name:"chart",
    data(){
      return {
        topData:{}
      }
    },
    // 获取数据
    created() {
      titleData().then(res=>{
        // window.console.log(res)
        this.topData = res.data;
      })
    },
}
</script>

<style lang="less">
  .chart-container{
    .top-card{
      height: 150px;
      margin-bottom: 12px;
      ul{
        display: flex;
        align-items: center;
        padding: 0;
        margin: 0;
        justify-content: space-around;
        list-style: none;
        li{
          span{
            display: block;
            color:#737373;
            text-align: center;
            font-size:16px;
          }
          .circle{
            width: 99px;
            height: 99px;
            border:2px solid orange;
            border-radius: 50%;
            font-size:35px;
            text-align: center;
            line-height: 99px;
            &.primary{
              color:#409efe;
              border-color: #409efe;
            }
            &.warning{
              color:#f86137;
              border-color:#f86137;
            }
            &.success{
              color:#70c58b;
              border-color:#70c58b;
            }
          }
        
        }
      }
    }
  }
</style>