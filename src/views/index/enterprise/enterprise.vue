<template>
  <div class="enterprise-container">
    <!-- 顶部的盒子 -->
    <el-card class="top-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号" prop="eid">
          <el-input class="short" v-model="formInline.eid" placeholder="企业编号"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input class="normal" v-model="formInline.name" placeholder="企业名称"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="short" v-model="formInline.username" placeholder="创建者"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="normal" v-model="formInline.status" placeholder="状态">
            <el-option label="所有" value=""></el-option>
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchEnterprise" type="primary">搜索</el-button>
          <el-button @click="clearSeach">清除</el-button>
          <el-button @click="showAdd" icon="el-icon-plus" type="primary">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 底部的盒子 -->
    <el-card class="bottom-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50" label="序号"> </el-table-column>
        <el-table-column prop="eid" label="企业编号"> </el-table-column>
        <el-table-column prop="name" label="企业名称"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            <!-- 使用全局过滤器 -->
            {{ scope.row.create_time | formatTime }}
          </template>
        </el-table-column>
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
    <!-- 新增对话框 -->
    <!-- <enterpriseAdd ref="enterpriseAdd"></enterpriseAdd> -->
    <!-- 编辑对话框 -->
    <!-- <enterpriseEdit ref='enterpriseEdit'></enterpriseEdit> -->

    <!-- 公共的对话框，编辑和新增 -->
    <enterpriseDialog ref="enterpriseDialog"></enterpriseDialog>
  </div>
</template>

<script>
// 导入接口
import { enterpriseList, enterpriseRemove, enterpriseStatus } from '@/api/enterprise.js';
// 导入新增组件
// import enterpriseAdd from './components/enterpriseAdd.vue';
// 导入 编辑组件
// import enterpriseEdit from './components/enterpriseEdit.vue';
// 导入 对话框 既可以编辑又可以修改
import enterpriseDialog from './components/enterpriseDialog.vue';
export default {
  name: 'enterprise',
  data() {
    return {
      // 顶部表单的数据
      formInline: {
        // 企业名
        name: '',
        // 企业编号
        eid: '',
        // 状态
        status: '',
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
  components: {
    // enterpriseAdd,
    // enterpriseEdit,
    enterpriseDialog
  },
  created() {
    // 获取数据
    this.getData();
  },
  methods: {
    // 进入新增状态
    showAdd() {
      // 不传递数据 是新增
      this.$refs.enterpriseDialog.show();
    },
    // 进入编辑状态
    handleEdit(index, row) {
      // 弹出编辑框
      this.$refs.enterpriseDialog.show(JSON.parse(JSON.stringify(row)));
    },
    // 状态的切换
    changeStatus(index, row) {
      enterpriseStatus({
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
          enterpriseRemove({
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
    // 搜索企业
    searchEnterprise() {
      // 返回第一页
      this.index = 1;
      // 调用数据获取逻辑
      this.getData();
    },
    // 获取逻辑
    getData() {
      enterpriseList({
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
.enterprise-container {
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
