// 导入 axios
import axios from 'axios';
// 导入token工具函数
import { getToken } from '../utils/token.js';

const enterpriseRequest = axios.create({
  // 基地址
  baseURL: process.env.VUE_APP_URL,
  // 是否跨域
  withCredentials: true
});

// 添加一个请求拦截器 注册给创建的 那个请求对象
enterpriseRequest.interceptors.request.use(
  function(config) {
    // 在发送之前 设置token
    config.headers.token = getToken();
    return config;
  },
  function(error) {
    // 如果请求出错了 干一些事情
    return Promise.reject(error);
  }
);

// 注册一个相应拦截器
enterpriseRequest.interceptors.response.use(
  function(response) {
    // 拿掉 .data
    return response.data;
  },
  function(error) {
    // 可以在这里对错误进行一些处理
    return Promise.reject(error);
  }
);

// 删除接口
export function enterpriseRemove(data){
    return enterpriseRequest({
        url:"/enterprise/remove",
        method:'post',
        data
    })
}
// 编辑接口
export function enterpriseEdit(data){
    return enterpriseRequest({
        url:"/enterprise/edit",
        method:'post',
        data
    })
}
// 修改状态接口
export function enterpriseStatus(data){
    return enterpriseRequest({
        url:"/enterprise/status",
        method:'post',
        data
    })
}
// 列表数据接口
export function enterpriseList(params){
    return enterpriseRequest({
        url:"/enterprise/list",
        method:'get',
        params
    })
}
// 添加接口
export function enterpriseAdd(data){
    return enterpriseRequest({
        url:"/enterprise/add",
        method:'post',
        data
    })
}