<template>
  <el-dialog class="register-dialog" width="603px" center title="用户注册" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16" >
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1" class="register-box">
            <img class="register-code" src="../../../assets/login_captcha.png" alt="" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth">
        <el-row>
           <el-col :span="16" >
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button >点击获取验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      // 是否显示对话框
      dialogFormVisible: false,
      // 表单数据
      form: {
        name: ''
      },
      // 左侧的文本宽度
      formLabelWidth: '62px'
    };
  }
};
</script>

<style lang="less">
.register-dialog {
  .el-dialog__header {
    background: linear-gradient(to right, #0dbfef, #1792f8);
  }
  .el-dialog__title {
    color: white;
  }
  .register-box{
    height: 40.8px;
  }
  .register-code{
    height: 40.8px;
    width: 100%;
  }
}
</style>
