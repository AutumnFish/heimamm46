<template>
  <el-container class="my-container">
    <el-header class="my-header">Header</el-header>
    <el-container>
      <el-aside width="200px" class="my-aside">Aside</el-aside>
      <el-main class="my-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style lang="less">
.my-container{
    height: 100%;
    .my-header{
        background: hotpink;
    }
    .my-aside{
        background: yellowgreen;
    }
    .my-main{
        background: #0094ff;
    }
}
</style>
