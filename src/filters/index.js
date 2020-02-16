// 导入 Vue
import Vue from 'vue'

// 导入 moment.js
import moment from 'moment'
// 注册全局过滤器 处理日期
Vue.filter('formatTime', value=>{
  // 日期格式 
  // YYYY 年
  // MM 月
  // DD 日
  // return moment(value).format('YYYY/MM/DD')
  return moment(value).format('YYYY年MM月DD日')
})