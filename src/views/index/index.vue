<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <div class="left">
        <i class="el-icon-s-fold"></i>
        <img src="../../assets/index_logo.png" alt="" />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img :src="userIcon" alt="" />
        <span class="name">{{ username }},您好</span>
        <el-button type="primary" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px" class="my-aside">
        <el-menu default-active="2" class="el-menu-vertical-demo" >
          <el-menu-item index="1">
            <!-- 图标 -->
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu></el-aside
      >
      <el-main class="my-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入接口
import { info, logout } from '@/api/index.js';
// 导入 token函数
import { removeToken } from '@/utils/token.js';
export default {
  name: 'index',
  data() {
    return {
      // 用户名
      username: '',
      // 用户头像
      userIcon: ''
    };
  },
  created() {
    info().then(res => {
      this.username = res.data.data.username;
      // 服务器返回的头像地址不完整，需要进行拼接
      this.userIcon = process.env.VUE_APP_URL + '/' + res.data.data.avatar;
    });
  },
  methods: {
    logout() {
      this.$confirm('你确定要离开我们网站', '友情提示', {
        confirmButtonText: '狠心离开',
        cancelButtonText: '继续看看',
        // type: 'error'
        type: 'success'
      })
        .then(() => {
          // 点击确定
          logout().then(res => {
            // window.console.log(res)
            if (res.data.code === 200) {
              // 移除token
              removeToken();
              // 去登录页
              this.$router.push('/login');
            }
          });
        })
        .catch(() => {
          // 点击取消
        });
    }
  }
};
</script>

<style lang="less">
.my-container {
  height: 100%;
  .my-header {
    // background: hotpink;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      i {
        font-size: 24px;
        margin-right: 22px;
      }
      img {
        margin-right: 11px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }
      span.name {
        margin-right: 38px;
        font-size: 14px;
      }
    }
  }
  .my-aside {
    // background: yellowgreen;
  }
  .my-main {
    background: #0094ff;
  }
}
</style>
