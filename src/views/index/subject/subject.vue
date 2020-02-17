<template>
  <div class="subject-container">
    <!-- 顶部的盒子 -->
    <el-card class="top-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号" prop="rid">
          <el-input class="short" v-model="formInline.rid" placeholder="学科编号"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input class="normal" v-model="formInline.name" placeholder="学科名称"></el-input>
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
          <el-button @click="searchSubject" type="primary">查询</el-button>
          <el-button @click="clearSeach">清除</el-button>
          <el-button @click="$refs.subjectAdd.dialogFormVisible = true" icon="el-icon-plus" type="primary">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 底部的盒子 -->
    <el-card class="bottom-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50" label="索引"> </el-table-column>
        <el-table-column prop="rid" label="学科编号"> </el-table-column>
        <el-table-column prop="name" label="学科名称"> </el-table-column>
        <el-table-column prop="short_name" label="简称"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            {{ scope.row.create_time | formatTime }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span style="color:red" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column v-if="['老师','管理员','超级管理员'].includes($store.state.role)" label="操作">
          <template slot-scope="niubi">
            <el-button type="text" size="mini" @click="handleEdit(niubi.$index, niubi.row)">编辑</el-button>
            <!-- 启用，禁用 -->
            <el-button type="text" @click="handleNotAllow(niubi.$index, niubi.row)">
              {{ niubi.row.status === 1 ? '禁用' : '启用' }}
            </el-button>
            <el-button v-if="['管理员','超级管理员'].includes($store.state.role)" size="mini" type="text" @click="handleDelete(niubi.$index, niubi.row)">删除</el-button>
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
    <subjectAdd ref="subjectAdd"></subjectAdd>
    <!-- 编辑对话框 -->
    <subjectEdit ref="subjectEdit"></subjectEdit>
  </div>
</template>

<script>
// 导入接口
import { subjectList, subjectStatus, subjectRemove } from '@/api/subject.js';
// 导入新增对话框
import subjectAdd from './components/subjectAdd.vue';
// 导入 编辑对话框
import subjectEdit from './components/subjectEdit.vue';
export default {
  name: 'subject',
  // 注册组件
  components: {
    subjectAdd,
    subjectEdit
  },
  // 生命周期钩子
  created() {
    // 获取数据
    this.getData();
  },
  data() {
    return {
      // 顶部表单的数据
      formInline: {
        // 学科名
        name: '',
        // 学科编号
        rid: '',
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
      size: 5,
      // 总条数
      total: 20
    };
  },
  methods: {
    // 清空搜索
    clearSeach() {
      // 清空表单
      // resetFields Element-ui提供的
      // 和点语法等价
      // this.$refs['formInline'].resetFields()
      this.$refs.formInline.resetFields();
      // 返回第一页
      this.index = 1;
      // 重新获取数据 内部已经实现了筛选条件的合并
      this.getData();
    },
    // 学科搜索
    searchSubject() {
      // 跳转到第一页
      this.index = 1;
      // 调用getData即可
      this.getData();
    },
    // 获取数据的方法
    getData() {
      subjectList({
        // 页码
        page: this.index,
        // 页容量
        limit: this.size,
        // 合并筛选条件 展开运算符
        ...this.formInline
      }).then(res => {
        window.console.log(res);
        // 设置给table
        this.tableData = res.data.items;
        // 总条数保存起来
        this.total = res.data.pagination.total;
      });
    },
    // 编辑学科模块 - 修改02 -保存修改
    handleEdit(index, row) {
      // window.console.log(index, row);
      // row.name = '王二花';
      // 弹出编辑框
      this.$refs.subjectEdit.dialogFormVisible = true;
      // 设置数据 这一行的数据
      // this.$refs.subjectEdit.form = row;

      // 创建一个完全一样的 数据 进行复制
      // 返回的是 字符串（基本数据类型）
      // const rowStr = JSON.stringify(row);
      // 根据字符串转回对象  string->对象
      // this.$refs.subjectEdit.form = JSON.parse(rowStr)

      // 如果id改变了 说明是重新编辑 再赋值
      if(row.id!=this.$refs.subjectEdit.form.id){
        // 一行搞定 obj->string->新的obj
        this.$refs.subjectEdit.form = JSON.parse(JSON.stringify(row));
      }else {
        // 相等的，不需要执行逻辑
      }
    },
    // 删除
    handleDelete(index, row) {
      // window.console.log(index, row);
      const id = row.id;
      this.$confirm('此操作将永久删除该学科, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 确定
          subjectRemove({
            id
          }).then(res=>{
            // window.console.log(res)
            if(res.code===200){
              this.$message.success('删除成功')
              // 增加最后一页的判断
              if(this.tableData.length==1){
                // 服务器的已经被删除
                // 继续获取这一页的数据，会拿不到
                // 页码--
                this.index--;
                // 如果已经是第一页
                if(this.index<=0){
                  this.index=1;
                }
              }
              this.getData()
            }
          })
        })
        .catch(() => {
          
        });
    },
    // 状态切换
    handleNotAllow(index, row) {
      // window.console.log(index, row);
      subjectStatus({
        id: row.id
      }).then(res => {
        // window.console.log(res)
        if (res.code === 200) {
          this.$message.success('状态修改成功！');
          // 重新获取数据
          this.getData();
        }
      });
    },
    // 页容量改变
    sizeChange(val) {
      // window.console.log(`每页 ${val} 条`);
      // 返回第一页
      this.index = 1;
      // 设置新的页容量
      this.size = val;
      // 重新获取数据
      this.getData();
    },
    // 页码改变
    currentChange(val) {
      window.console.log(`当前页: ${val}`);
      // 保存页码
      this.index = val;
      // 重新调用即可
      this.getData();
    }
  }
};
</script>

<style lang="less">
// 最外层容器
.subject-container {
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
