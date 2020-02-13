import Vue from 'vue'
import App from './App.vue'

// 导入路由
import router from './router/index.js'
// 导入 仓库
import store from './store/index.js'

// 导入 element-ui
import ElementUI from 'element-ui'
// 导入 element-ui的样式
import 'element-ui/lib/theme-chalk/index.css'
// 注册element-ui
Vue.use(ElementUI)

// 导入全局样式
import './style/base.css'

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  // 挂载到Vue示例上  路由
  router,
  // 挂载到Vue示例上  仓库
  store
}).$mount('#app')
