// 直接导入 创建公共的请求对象
import request from '@/utils/request.js'

// 删除接口
export function userRemove(data){
    return request({
        url:"/user/remove",
        method:'post',
        data
    })
}
// 编辑接口
export function userEdit(data){
    return request({
        url:"/user/edit",
        method:'post',
        data
    })
}
// 修改状态接口
export function userStatus(data){
    return request({
        url:"/user/status",
        method:'post',
        data
    })
}
// 列表数据接口
export function userList(params){
    return request({
        url:"/user/list",
        method:'get',
        params
    })
}
// 添加接口
export function userAdd(data){
    return request({
        url:"/user/add",
        method:'post',
        data
    })
}