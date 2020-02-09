// 导入 axios
import axios from 'axios';

// 把注册相关的接口调用 抽取为函数 并暴露 带名字的暴露
export function sendsms(data) {
  return axios({
    url: process.env.VUE_APP_URL + '/sendsms',
    method: 'post',
    // 是否跨域携带cookie 默认是false
    withCredentials: true,
    data
  });
}
