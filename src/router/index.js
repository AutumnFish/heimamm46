// 导入Vue
import Vue from 'vue';
// 导入Vue-router
import VueRouter from 'vue-router';

// 导入 进度条组件
import NProgress from 'nprogress';
// 导入 进度条样式
import 'nprogress/nprogress.css';

// 导入token的工具函数 获取token
import { getToken, removeToken } from '@/utils/token.js';

// 导入 用户信息获取接口
import { info } from '@/api/index.js';

// 按需导入 Element-ui的弹框
import { Message } from 'element-ui';

// 注册一下 use
Vue.use(VueRouter);

// 导入 组件 login
import login from '../views/login/login.vue';
// 导入 组件 index
import index from '../views/index/index.vue';

// 导入组件 嵌套路由 数据 chart
import chart from '@/views/index/chart/chart.vue';
// 导入组件 嵌套路由 用户 user
import user from '@/views/index/user/user.vue';
// 导入组件 嵌套路由 题库 question
import question from '@/views/index/question/question.vue';
// 导入组件 嵌套路由 企业 enterprise
import enterprise from '@/views/index/enterprise/enterprise.vue';
// 导入组件 嵌套路由 学科 subject
import subject from '@/views/index/subject/subject.vue';

// 创建路由对象
const router = new VueRouter({
  // 路由规则
  routes: [
    // 空地址的重定向
    {
      path: '/',
      redirect: '/login'
    },
    // 登录
    {
      path: '/login',
      // path:"/",
      component: login
    },
    // 首页
    {
      path: '/index',
      // path:"/",
      component: index,
      // 嵌套路由
      children: [
        {
          // 路径不需要写 /  被解析为 /index/chart
          path: 'chart',
          component: chart
        },
        {
          // 路径不需要写 /  会被解析为 /index/user
          path: 'user',
          component: user
        },
        {
          // 路径不需要写 /  会被解析为 /index/question
          path: 'question',
          component: question
        },
        {
          // 路径不需要写 /  会被解析为 /index/enterprise
          path: 'enterprise',
          component: enterprise
        },
        {
          // 路径不需要写 /  会被解析为 /index/subject
          path: 'subject',
          component: subject
        }
      ]
    }
  ]
});

// 定义 路由白名单 （不需要登录就可以访问的页面）
const whitePaths = ['/login'];

// 导航守卫 beforeEach 进入之前
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start();
  // 白名单
  if (whitePaths.includes(to.path.toLocaleLowerCase()) !== true) {
    // 判断token 是否存在
    // 不存在 提示用户，并打回登录页 缓存不存在 是null 要么用== 要么改为 null
    if (getToken() === null) {
      Message.warning('请先登录');
      NProgress.done();
      next('/login');
    } else {
      // token 存在
      // 对错判断
      info().then(res => {
        window.console.log(res);
        if (res.data.code === 206) {
          // token有问题
          removeToken();
          Message.warning('登录状态有误，请重新登录');
          NProgress.done();
          next('/login');
        } else if (res.data.code === 200) {
          // 正确的
          next();
        }
      });
    }
  } else {
    // 白名单中的页面
    // 放走
    next();
  }
});
// 导航守卫 afterEach 进入完成之后
// router.afterEach((to,from)=>{
router.afterEach(() => {
  // 关闭进度条
  NProgress.done();
});

// 暴露出去
export default router;
