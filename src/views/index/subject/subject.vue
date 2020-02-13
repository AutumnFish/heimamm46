<template>
  <div class="subject-container">
    <!-- 顶部的盒子 -->
    <el-card class="top-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input class='short' v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input class="normal" v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class='short' v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class='normal' v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="onSubmit">清除</el-button>
          <el-button icon="el-icon-plus" type="primary" @click="onSubmit">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'subject',
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      }
    };
  }
};
</script>

<style lang="less">
.subject-container{
  .top-card{
    .short{
      width: 100px;
    }
    .normal{
      width: 150px;
    }
  }
}
</style>
