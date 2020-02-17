<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <div class="left">
        <!-- 左侧图标 -->
        <i @click="isCollapse = !isCollapse" class="el-icon-s-fold"></i>
        <img src="../../assets/index_logo.png" alt="" />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img :src="$store.state.userIcon" alt="" />
        <span class="name">{{ $store.state.username }},您好</span>
        <el-button type="primary" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="auto" class="my-aside">
        <!-- 导航菜单 -->
        <el-menu router :collapse="isCollapse" :default-active="$route.path" class="el-menu-vertical-demo">
          <template v-for="(item, index) in navRoutes">
            <el-menu-item :key="index" :index="item.meta.fullPath" v-if="item.meta.rules.includes($store.state.role)">
              <!-- 图标 -->
              <i :class="item.meta.icon"></i>
              <span slot="title">{{ item.meta.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-main class="my-main">
        <!-- 路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入接口
import { logout } from '@/api/index.js';
// 导入 token函数
import { removeToken } from '@/utils/token.js';
// 导入路由数组
import navRoutes from '@/router/childrenRoutes.js';
export default {
  name: 'index',
  data() {
    return {
      // 用户名
      // username: '',
      // 用户头像
      // userIcon: '',
      // 是否折叠
      isCollapse: false,
      // 保存到data中 方便一会循环
      navRoutes: navRoutes
    };
  },
  // 生命周期钩子
  // beforeCreate() {
  //   // 如果没有值
  //   if (getToken() == undefined) {
  //     // 提示用户
  //     this.$message.warning('小老弟，请先登录');
  //     // 打回登录页
  //     this.$router.push('/login');
  //   }
  // },
  // created() {
  //   info().then(res => {
  //     // 如果token有问题 提示 删除，并返回
  //     if (res.data.code === 206) {
  //       this.$message.warning('登录状态有误，请重新登录');
  //       removeToken();
  //       this.$router.push('/login');
  //     } else if (res.data.code === 200) {
  //       // 如果没问题
  //       this.username = res.data.data.username;
  //       // 服务器返回的头像地址不完整，需要进行拼接
  //       this.userIcon = process.env.VUE_APP_URL + '/' + res.data.data.avatar;
  //     }
  //   });
  // },
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
              // 移除 Vuex中的 头像
              this.$store.commit('changeIcon', '');
              // 移除 Vuex中的 名字
              this.$store.commit('changeName', '');
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
  /* c3中的transition（过渡），需要有开始和结束的值 */
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
