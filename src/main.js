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

// 导入全局过滤器 不需要接收，只需要保证代码执行即可
import '@/filters/index.js'

// 导入 企业下拉框
import enterpriseSel from './views/index/question/components/enterpriseSel.vue'
// 导入 学科下拉框
import subjectSel from './views/index/question/components/subjectSel.vue'


// 注册 企业和学科下拉框
// 参数1 名字
// 参数2 组件
Vue.component('enterpriseSel', enterpriseSel)
Vue.component('subjectSel', subjectSel)



new Vue({
  render: h => h(App),
  // 挂载到Vue示例上  路由
  router,
  // 挂载到Vue示例上  仓库
  store
}).$mount('#app')
