// 导入Vue
import Vue from 'vue'
// 导入Vuex
import Vuex from 'vuex'
// use一下
Vue.use(Vuex)
// 创建仓库对象
const store = new Vuex.Store({
    state:{
        // 用户头像
        userIcon:"",
        // 用户的名字
        username:""
    },
    // s 英文中的复数
    mutations:{
        // 修改头像
        changeIcon(state,newIcon){
            // window.console.log(newIcon)
            state.userIcon = newIcon
        },
        // 修改名字
        changeName(state,newName){
            // window.console.log(newName)
            state.username = newName
        }
    }
})
// 暴露出去
export default store