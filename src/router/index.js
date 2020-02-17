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

// 导入仓库
import store from '@/store/index.js';

// 注册一下 use
Vue.use(VueRouter);

// 导入 组件 login
import login from '../views/login/login.vue';
// 导入 组件 index
import index from '../views/index/index.vue';

// 导入嵌套路由
import children from './childrenRoutes.js';

// 创建路由对象
const router = new VueRouter({
  // 路由规则
  routes: [
    // 空地址的重定向
    {
      path: '/',
      redirect: '/login'
      // component:login,
    },
    // 登录
    {
      path: '/login',
      // path:"/",
      component: login,
      meta: {
        title: '登录',
        // 允许访问的角色
        rules: ['超级管理员','管理员', '老师', '学生']
      }
    },
    // 首页
    {
      path: '/index',
      // path:"/",
      component: index,
      meta: {
        title: '首页',
        // 允许访问的角色
        rules: ['超级管理员','管理员', '老师', '学生']
      },
      // 嵌套路由
      children // children:children
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
          // 用户状态判断:
          // info接口抽取的时候 没有 注册拦截器 获取简化data
          if (res.data.data.status === 1) {
            // 启用
            // 处理用户的信息 用户的名字
            const username = res.data.data.username;
            // 处理用户的信息 用户的头像
            const userIcon = process.env.VUE_APP_URL + '/' + res.data.data.avatar;
            // 调用仓库的方法
            store.commit('changeIcon', userIcon);
            store.commit('changeName', username);
            // window.console.log(from)
            // 如果是从 不需要登陆的页面过来的，弹框
            if (whitePaths.includes(from.path)) {
              // 可以正常访问时，才提示欢迎
              Message.success('欢迎你！！');
            }
            // 获取当前用户的角色
            const role = res.data.data.role;
            // 调用仓库方法 保存起来
            store.commit('changeRole', role);
            // 判断是否有访问的权限
            if (to.meta.rules.includes(role)) {
              // 有 放走
              next();
            } else {
              // 没有 提示用户
              Message.warning('没有访问权限，无法访问');
              // 关闭进度条
              NProgress.done();
            }
          } else {
            // 禁用状态
            // 提示用户
            // 打回登录页
            Message.warning('当前出于禁用状态，请等待管理员审核');
            NProgress.done();
            next('/login');
          }
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
router.afterEach(to => {
  // window.console.log(to)
  // 关闭进度条
  NProgress.done();
  // 修改标题
  window.document.title = to.meta.title;
});

// 暴露出去
export default router;
