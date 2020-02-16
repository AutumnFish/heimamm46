<template>
  <el-dialog class="subject-edit" width="600px" center title="编辑学科" :visible.sync="dialogFormVisible">
    <el-form :model="form" ref="subjectEdit" :rules="rules">
      <el-form-item prop="rid" label="学科编号" :label-width="formLabelWidth">
        <el-input v-model="form.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="学科名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="short_name" label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="intro" label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="remark" label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('subjectEdit')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入编辑接口
import { subjectEdit } from '@/api/subject.js';
export default {
  name: 'subjectEdit',
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
      rules: {
        rid: [{ required: true, message: '学科编号不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '学科名称不能为空', trigger: 'blur' }]
      },
      // 文字的宽度
      formLabelWidth: '120px'
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 成功
          // 把form对象的所有键值对 全部传递进来
          subjectEdit(this.form).then(res=>{
            window.console.log(res)
            if(res.code===200){
              // 关闭对话框
              this.dialogFormVisible = false;
              // 清空对话框
              this.$refs[formName].resetFields()
              // 重新获取数据
              this.$parent.getData()
              this.$message.success('编辑成功')
            }else if(res.code===201){
              // this.$message.warning(res.message)
              this.$message.warning("学科编号不能重复哦，请检查")
            }
          })
        } else {
          // 失败
          this.$message.error('数据校验失败，请检查')
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">

</style>
