<template>
  <div class="user-container">
    <!-- 顶部的盒子 -->
    <el-card class="top-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称" prop="username">
          <el-input class="short" v-model="formInline.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input class="normal" v-model="formInline.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select class="normal" v-model="formInline.role_id" placeholder="角色">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchEnterprise" type="primary">搜索</el-button>
          <el-button @click="clearSeach">清除</el-button>
          <el-button @click="showAdd" icon="el-icon-plus" type="primary">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 底部的盒子 -->
    <el-card class="bottom-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50" label="序号"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="role" label="角色"> </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="niubi">
            <el-button type="text" size="mini" @click="handleEdit(niubi.$index, niubi.row)">编辑</el-button>
            <!-- 启用，禁用 -->
            <el-button type="text" @click="changeStatus(niubi.$index, niubi.row)">
              {{ niubi.row.status === 1 ? '禁用' : '启用' }}
            </el-button>
            <el-button size="mini" type="text" @click="handleDelete(niubi.$index, niubi.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        class="my-pagination"
        background
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="index"
        :page-sizes="[2, 4, 5, 10]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 用户对话框 -->
    <userDialog ref="userDialog"></userDialog>
  </div>
</template>

<script>
// 导入用户接口
import { userList, userRemove, userStatus } from '@/api/user.js';
// 导入对话框
import userDialog from './components/userDialog.vue'
export default {
  name: 'enterprise',
  data() {
    return {
      // 顶部表单的数据
      formInline: {
        // 邮箱
        email: '',
        // 角色
        role: '',
        // 创建者名
        username: ''
      },
      // 底部表格的数据
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      // 分页器的数据
      // 页码
      index: 1,
      // 页容量
      size: 2,
      // 总条数
      total: 20
    };
  },
  // 注册组件
  components:{
    userDialog
  },
  created() {
    // 获取数据
    this.getData();
  },
  methods: {
    // 进入新增状态
    showAdd() {
      // 不传递数据 是新增
      this.$refs.userDialog.show();
    },
    // 进入编辑状态
    handleEdit(index, row) {
      // 弹出编辑框
      this.$refs.userDialog.show(JSON.parse(JSON.stringify(row)));
    },
    // 状态的切换
    changeStatus(index, row) {
      userStatus({
        id: row.id
      }).then(res => {
        if (res.code === 200) {
          this.$message.success('状态切换成功');
          this.getData();
        }
      });
    },
    // 删除数据
    handleDelete(index, row) {
      // window.console.log(index,row)
      // 获取id
      const id = row.id;
      // 询问用户
      this.$confirm('你确定要删除这条数据吗', '友情提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 确定
          userRemove({
            id // 或者  id:row.id  或者 id:id
          }).then(res => {
            if (res.code === 200) {
              // 页码异常处理
              if (this.tableData.length == 1) {
                // 判断页码
                if (this.index > 1) {
                  this.index--;
                }
              }
              // 重新获取数据
              this.getData();
            }
          });
        })
        .catch(() => {});
    },
    // 页码改变
    currentChange(newIndex) {
      // 保存新页码
      this.index = newIndex;
      // 重新获取数据
      this.getData();
    },
    // 页容量改变
    sizeChange(newSize) {
      // 保存新页容量
      this.size = newSize;
      // 返回第一页
      this.index = 1;
      // 重新获取数据
      this.getData();
    },
    // 清除搜索
    clearSeach() {
      // 清空表单
      this.$refs.formInline.resetFields();
      // 返回第一页
      this.index = 1;
      // 重新获取数据
      this.getData();
    },
    // 搜索用户
    searchEnterprise() {
      // 返回第一页
      this.index = 1;
      // 调用数据获取逻辑
      this.getData();
    },
    // 获取逻辑
    getData() {
      userList({
        // 页容量
        limit: this.size,
        // 页码
        page: this.index,
        // 把筛选条件合并
        ...this.formInline
      }).then(res => {
        // window.console.log(res)
        // 保存数据
        this.tableData = res.data.items;
        // 保存总条数
        this.total = res.data.pagination.total;
      });
    }
  }
};
</script>

<style lang="less">
// 最外层容器
.user-container {
  // 顶部的卡片
  .top-card {
    // 短的输入框
    .short {
      width: 100px;
    }
    // 长一些的输入框
    .normal {
      width: 150px;
    }
  }
  // 底部的卡片
  .bottom-card {
    margin-top: 19px;
    .my-pagination {
      margin-top: 30px;
      text-align: center;
    }
  }
}
</style>
