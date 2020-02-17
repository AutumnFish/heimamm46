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

export default [
  {
    // 路径不需要写 /  被解析为 /index/chart
    path: 'chart',
    component: chart,
    meta: {
      title: '数据概览',
      // 允许访问的角色
      rules: ['超级管理员','管理员', '老师', '学生'],
      // 图标
      icon: 'el-icon-pie-chart',
      // 完全地址
      fullPath: '/index/chart'
    }
  },
  {
    // 路径不需要写 /  会被解析为 /index/user
    path: 'user',
    component: user,
    meta: {
      title: '用户列表',
      // 允许访问的角色
      rules: ['超级管理员','管理员'],
      // 图标
      icon: 'el-icon-user',
      // 完全地址
      fullPath: '/index/user'
    }
  },
  {
    // 路径不需要写 /  会被解析为 /index/question
    path: 'question',
    component: question,
    meta: {
      title: '题库列表',
      // 允许访问的角色
      rules: ['超级管理员','管理员', '老师'],
      // 图标
      icon: 'el-icon-edit-outline',
      // 完全地址
      fullPath: '/index/question'
    }
  },
  {
    // 路径不需要写 /  会被解析为 /index/enterprise
    path: 'enterprise',
    component: enterprise,
    meta: {
      title: '企业列表',
      // 允许访问的角色
      rules: ['超级管理员','管理员', '老师'],
      // 图标
      icon: 'el-icon-office-building',
      // 完全地址
      fullPath: '/index/enterprise'
    }
  },
  {
    // 路径不需要写 /  会被解析为 /index/subject
    path: 'subject',
    component: subject,
    meta: {
      title: '学科列表',
      // 允许访问的角色
      rules: ['超级管理员','管理员', '老师', '学生'],
      // 图标
      icon: 'el-icon-notebook-2',
      // 完全地址
      fullPath: '/index/subject'
    }
  }
];
