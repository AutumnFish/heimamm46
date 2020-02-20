<template>
  <el-dialog
    class="question-add"
    fullscreen
    title="新增题库"
    :visible.sync="dialogFormVisible"
  >
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
      <el-form-item label="城市" :label-width="formLabelWidth">
        <!-- <chinaArea v-bind:value="form.city" @input="v => (form.city = v)" /> -->
        <chinaArea v-model="form.city" />
      </el-form-item>
      <el-form-item label="题型" :label-width="formLabelWidth">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" :label-width="formLabelWidth">
        <el-radio-group v-model="form.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
// 导入抽取的省市区组件
import chinaArea from './chinaArea.vue';
export default {
  // 注册组件
  components: {
    chinaArea
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
        enterprise: '',
        // 省市区
        city: [],
        // 题型 和难度
        type: 1,
        difficulty: 1
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
  // 级联选择器的宽度
  .el-cascader {
    width: 364px;
  }
}
</style>
