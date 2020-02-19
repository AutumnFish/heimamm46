// 直接导入 创建公共的请求对象
import request from '@/utils/request.js'

// 删除接口
export function questionRemove(data){
    return request({
        url:"/question/remove",
        method:'post',
        data
    })
}
// 编辑接口
export function questionEdit(data){
    return request({
        url:"/question/edit",
        method:'post',
        data
    })
}
// 修改状态接口
export function questionStatus(data){
    return request({
        url:"/question/status",
        method:'post',
        data
    })
}
// 列表数据接口
export function questionList(params){
    return request({
        url:"/question/list",
        method:'get',
        params
    })
}
// 添加接口
export function questionAdd(data){
    return request({
        url:"/question/add",
        method:'post',
        data
    })
}

// 获取题目信息
export function questionOne(data) {
    return request({
        url:"/question/one",
        method:"post",
        data
    })
  }