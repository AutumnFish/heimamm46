// 直接导入 创建公共的请求对象
import request from '@/utils/request.js'

// 删除接口
export function enterpriseRemove(data){
    return request({
        url:"/enterprise/remove",
        method:'post',
        data
    })
}
// 编辑接口
export function enterpriseEdit(data){
    return request({
        url:"/enterprise/edit",
        method:'post',
        data
    })
}
// 修改状态接口
export function enterpriseStatus(data){
    return request({
        url:"/enterprise/status",
        method:'post',
        data
    })
}
// 列表数据接口
export function enterpriseList(params){
    return request({
        url:"/enterprise/list",
        method:'get',
        params
    })
}
// 添加接口
export function enterpriseAdd(data){
    return request({
        url:"/enterprise/add",
        method:'post',
        data
    })
}