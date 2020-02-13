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
    mutations:{
        changeIcon(state,newIcon){
            state.userIcon = newIcon
        },
        changeName(state,newName){
            state.username = newName
        }
    }
})
// 暴露出去