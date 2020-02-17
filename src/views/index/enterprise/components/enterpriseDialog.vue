<template>
  <el-dialog class="enterprise-add" width="600px" center :title="(isEdit ? '修改' : '新增') + '企业'" :visible.sync="dialogFormVisible">
    <el-form :model="form" ref="enterpriseDialog" :rules="rules">
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
      <el-button type="primary" @click="submitForm('enterpriseDialog')">
        {{ isEdit ? '保存' : '新增' }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入新增和编辑接口
import { enterpriseAdd, enterpriseEdit } from '@/api/enterprise.js';
export default {
  name: 'enterpriseDialog',
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
      formLabelWidth: '120px',
      // 是否为编辑状态
      isEdit: false
    };
  },
  methods: {
    // 显示对话框
    show(editData) {
      // 使用公共的对话框
      this.dialogFormVisible = true;
      // 判断是否传递了数据
      if (editData == undefined) {
        // 没有传递 新增逻辑
        // 为 对话框 组件 设置nextTick
        this.$nextTick(() => {
          // 修改公共对话框的 标记字段  改为false  新增状态
          this.isEdit = false;
          // 直接设置一个新的对象
          this.form = {
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
          };
          // 清空表单中的数据
          // this.$refs.enterpriseDialog.resetFields();
        });
      } else {
        // 传递了数据 编辑逻辑
        // 为对话框组件 注册 nextTick
        this.$nextTick(() => {
          // 修改公共对话框的 标记字段
          this.isEdit = true;
          // 设置数据 新的副本
          this.form = editData;
        });
      }
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 如果为新增
          if (this.isEdit == false) {
            // 新增接口
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
            // 编辑逻辑
            enterpriseEdit(this.form).then(res => {
              // window.console.log(res)
              if (res.code === 201) {
                this.$message.error('企业编号不能重复哦');
              } else if (res.code === 200) {
                this.$message.success('数据修改成功');
                // 关闭对话框
                this.dialogFormVisible = false;
                // 清空表单
                this.$refs[formName].resetFields();
                // 父组件重新获取数据
                this.$parent.getData();
              }
            });
          }
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
