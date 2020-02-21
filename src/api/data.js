// 直接导入 创建公共的请求对象
import request from '@/utils/request.js'

// 面板接口
export function titleData(){
    return request({
        url:"/data/title",
        method:'post',
        
    })
}

// 企业数据统计接口
export function statisticsData(){
    return request({
        url:"/data/statistics",
        method:'post',
        
    })
}