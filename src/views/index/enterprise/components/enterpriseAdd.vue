<template>
  <el-dialog class="enterprise-add" width="600px" center title="新增企业" :visible.sync="dialogFormVisible">
    <el-form :model="form" ref="enterpriseAdd" :rules="rules">
      <el-form-item prop="eid" label="企业编号" :label-width="formLabelWidth">
        <el-input v-model="form.eid" autocomplete="off"></el-input>
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
      <el-button type="primary" @click="submitForm('enterpriseAdd')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入企业的新增方法
import { enterpriseAdd } from '@/api/enterprise.js';
export default {
  name: 'enterpriseAdd',
  data() {
    return {
      // 是否显示对话框
      dialogFormVisible: false,
      // 表单绑定的数据
      form: {
        // 企业编号
        eid: '',
        // 企业名称
        name: '',
        // 简称
        short_name: '',
        // 简介
        intro: '',
        // 备注
        remark: ''
      },
      rules: {
        eid: [{ required: true, message: '企业编号不能为空', triger: 'blur' }],
        name: [{ required: true, message: '企业名称不能为空', triger: 'blur' }],
        short_name: [{ required: true, message: '企业简称不能为空', triger: 'blur' }],
        intro: [{ required: true, message: '企业简介不能为空', triger: 'blur' }]
      },
      // 文字的宽度
      formLabelWidth: '120px'
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          enterpriseAdd(this.form).then(res => {
            // window.console.log(res)
            if (res.code === 201) {
              this.$message.error('企业编号不能重复哦');
            } else if (res.code === 200) {
              this.$message.success('数据新增成功');
              // 关闭对话框
              this.dialogFormVisible = false;
              // 清空表单
              this.$refs[formName].resetFields();
              // 父组件重新获取数据
              this.$parent.getData();
            }
          });
        } else {
          this.$message.warning('数据校验失败，请检查');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less"></style>
