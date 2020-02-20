<template>
  <el-dialog class="question-add" fullscreen title="新增题库" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="学科" :label-width="formLabelWidth">
        <subjectSel v-model="form.subject" />
      </el-form-item>
      <el-form-item label="阶段" :label-width="formLabelWidth">
        <el-select v-model="form.step" placeholder="请选择阶段">
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" :label-width="formLabelWidth">
        <enterpriseSel v-model="form.enterprise" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入组件
import enterpriseSel from './enterpriseSel.vue';
import subjectSel from './subjectSel.vue';
export default {
  // 注册组件
  components: {
    enterpriseSel,
    subjectSel
  },
  data() {
    return {
      dialogFormVisible: false,
      // 表单的数据
      form: {
        // 阶段
        step: '',
        // 学科和企业
        subject: '',
        enterprise: ''
      },
      formLabelWidth: '120px'
    };
  }
};
</script>

<style lang="less">
.question-add {
  .el-form {
    width: 835px;
    margin: 0 auto;
  }
  // 选择框宽度
  .el-select {
    width: 364px;
  }
}
</style>
