<template>
  <el-dialog class="user-dialog" width="600px" center :title="(isEdit ? '修改' : '新增') + '用户'" :visible.sync="dialogFormVisible">
    <el-form :model="form" ref="userDialog" :rules="rules">
      <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="电话" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id" :label-width="formLabelWidth">
        <el-select class="normal" v-model="form.role_id" placeholder="请选择角色">
          <el-option label="管理员" :value="2"></el-option>
          <el-option label="老师" :value="3"></el-option>
          <el-option label="学生" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
        <el-select class="normal" v-model="form.status" placeholder="请选择状态">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="remark" label="用户备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('userDialog')">
        {{ isEdit ? '保存' : '新增' }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入新增和编辑接口
import { userAdd, userEdit } from '@/api/user.js';
// 导入表单的校验方法
import { checkPhone, checkEmail } from '@/utils/validator.js';
export default {
  name: 'userDialog',
  data() {
    return {
      // 是否显示对话框
      dialogFormVisible: false,
      // 表单绑定的数据
      form: {
        // 用户名
        username: '',
        // 邮箱
        email: '',
        // 电话
        phone: '',
        // 角色
        role_id: '',
        // 状态
        status: '',
        // 用户备注
        remark: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '电话不能为空', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        role_id: [{ required: true, message: '角色不能为空', trigger: 'change' }]
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
            // 用户名
            username: '',
            // 邮箱
            email: '',
            // 电话
            phone: '',
            // 角色
            role_id: '',
            // 状态
            status: '',
            // 用户备注
            remark: ''
          };
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
            userAdd(this.form).then(res => {
              window.console.log(res);
              if (res.code === 201) {
                // 注释
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
            userEdit(this.form).then(res => {
              window.console.log(res);
              if (res.code === 201) {
                // 注释
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
