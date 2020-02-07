<template>
  <!-- 整体容器 -->
  <div class="login-container">
    <!-- 左侧盒子 -->
    <div class='left-box'></div>
    <!-- 右边的图片 -->
    <img src="../../assets/login_banner_ele.png" alt="">
  </div>
</template>

<script>
export default {
  // 组件的名字
  name: 'login'
};
</script>

<style>
.login-container {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  /* 开启弹性布局 */
  display: flex;
  /* 上下居中 */
  align-items: center;
  /* 左右均分 */
  justify-content: space-around;
  /* justify-content: space-between; */
}
.login-container .left-box{
  width: 478px;
  background-color: #F5F5F5;
  height: 550px;
}
</style>
