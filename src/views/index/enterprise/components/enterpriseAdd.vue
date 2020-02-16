<template>
  <el-dialog class="enterprise-add" width="600px" center title="新增企业" :visible.sync="dialogFormVisible">
    <el-form :model="form" ref="subjectAdd" :rules="rules">
      <el-form-item prop="rid" label="企业编号" :label-width="formLabelWidth">
        <el-input v-model="form.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="企业名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="short_name" label="企业简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="intro" label="企业简介" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="remark" label="企业备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('subjectAdd')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'enterpriseAdd',
  data() {
    return {
      // 是否显示对话框
      dialogFormVisible: false,
      // 表单绑定的数据
      form: {
        // 学科编号
        rid: '',
        // 学科名称
        name: '',
        // 简称
        short_name: '',
        // 简介
        intro: '',
        // 备注
        remark: ''
      },
     
      // 文字的宽度
      formLabelWidth: '120px'
    };
  },
  methods: {
 
  }
};
</script>

<style lang="less">

</style>
