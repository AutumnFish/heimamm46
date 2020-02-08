<template>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
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
      formLabelWidth: '120px'
    };
  }
};
</script>

<style></style>
