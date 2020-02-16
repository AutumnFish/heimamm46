// 导入 创建的请求对象即可
import request from '@/utils/request.js'

// 学科删除
export function subjectRemove(data) {
  return request({
    url: '/subject/remove',
    method: 'post',
    data
  });
}
// 学科编辑
export function subjectEdit(data) {
  return request({
    url: '/subject/edit',
    method: 'post',
    data
  });
}
// 学科状态设置
export function subjectStatus(data) {
  return request({
    url: '/subject/status',
    method: 'post',
    data
  });
}
// 学科list
// 记住参数不同
export function subjectList(params) {
  return request({
    url: '/subject/list',
    method: 'get',
    // get请求的参数如何设置
    params 
    // data
  });
}
// 学科添加
export function subjectAdd(data) {
  return request({
    url: '/subject/add',
    method: 'post',
    data
  });
}
