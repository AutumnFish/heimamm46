<template>
  <div class="question-container">
    <el-card class="top-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科">
          <subjectSel
            v-bind:value="formInline.subject"
            @input="v => (formInline.subject = v)"
          />
          <!-- <subjectSel v-model="formInline.subject" /> -->
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <!-- <enterpriseSel v-bind:value="formInline.enterprise" @input="v => (formInline.enterprise = v)" /> -->
          <enterpriseSel v-model="formInline.enterprise" />
        </el-form-item>
        <el-form-item label="题型">
          <el-select v-model="formInline.type" placeholder="请选择题型">
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="简答" value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度">
          <el-select v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input
            v-model="formInline.username"
            placeholder="审批人"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="formInline.create_date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <br />
        <el-form-item class="title-item" label="标题">
          <el-input
            v-model="formInline.title"
            placeholder="选择日期"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchQuestion">搜索</el-button>
          <el-button>清除</el-button>
          <el-button
            type="primary"
            @click="$refs.questionAdd.dialogFormVisible = true"
            icon="el-icon-plus"
            >新增试题</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 底部的卡片 -->
    <el-card class="bottom-card">
      <!-- table -->
      <el-table :data="tableData" border style="width: 100%">
        <!-- type=index 可以实现索引 -->
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column label="题目" width="200">
          <template slot-scope="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段">
          <template slot-scope="scope">
            {{ scope.row.subject_name }}
            .
            <!-- 对象.属性  对象[1] -->
            {{ { 1: '初级', 2: '中级', 3: '高级' }[scope.row.step] }}
          </template>
        </el-table-column>
        <el-table-column label="题型">
          <template slot-scope="scope">
            {{ { 1: '单选', 2: '多选', 3: '简答' }[scope.row.type] }}
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">启用</span>
            <span style="color:red" v-else>禁用</span>
            <!-- {{ scope.row.status === 1 ? '启用' : '禁用' }} -->
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="enterEdit(scope.row)" type="text"
              >编辑</el-button
            >
            <el-button type="text" @click="changeStatus(scope.row)">
              {{ scope.row.status === 1 ? '禁用' : '启用' }}
            </el-button>
            <el-button @click="removeQuestion(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        background
        :current-page="index"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 新增对话框 -->
    <questionAdd ref="questionAdd"></questionAdd>
    <!-- 编辑对话框 -->
    <questionEdit ref="questionEdit"></questionEdit>
  </div>
</template>

<script>
// 导入题库列表 接口
import { questionList,questionStatus,questionRemove } from '@/api/question.js';
// 导入 学科下拉框
// import subjectSel from './components/subjectSel.vue';
// 导入 企业下拉框组件
// import enterpriseSel from './components/enterpriseSel.vue';
// 导入 新增对话框
import questionAdd from './components/questionAdd.vue';
// 导入 编辑对话框
import questionEdit from './components/questionEdit.vue';
export default {
  name: 'question',
  data() {
    return {
      formInline: {
        // 作者
        username: '',
        // 标题
        title: '',
        // 类型
        type: '',
        // 阶段
        step: '',
        // 状态
        status: '',
        // 难度
        difficulty: '',
        // 创建日期
        create_date: '',
        // 学科id
        subject: '',
        // 企业id
        enterprise: ''
      },

      // 分页器相关
      // 页容量
      size: 2,
      // 页码
      index: 1,
      // 总条数
      total: 0,
      // 表格的数据
      tableData: []
    };
  },
  // 组件注册
  components: {
    // subjectSel,
    // enterpriseSel,
    questionAdd,
    questionEdit
  },
  methods: {
    // 删除试题的逻辑
    removeQuestion(row){
      this.$confirm('你确定要删除这条数据吗?', '友情提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        questionRemove({
          id:row.id
        }).then(res=>{
          if(res.code===200){
            this.$message.success("删除成功")
            this.getData()
          }
        })
      }).catch(() => {});
    },
    // 切换状态
    changeStatus(row){
      questionStatus({
        id:row.id
      }).then(res=>{
        if(res.code===200){
          this.$message.success('状态修改成功')
          // 重新获取数据
          this.getData()
        }
      })
    },
    // 搜索数据
    searchQuestion() {
      // 搜索之后去第一页
      this.index = 1;
      this.getData();
    },
    // 进入编辑
    enterEdit(row) {
      // window.console.log(row)

      // 处理 被服务器保存为字符串的数据
      let rowData = JSON.parse(JSON.stringify(row));
      // 变为数组
      rowData.city = rowData.city.split(',');
      rowData.multiple_select_answer = rowData.multiple_select_answer.split(
        ','
      );
      // 弹出对话框
      this.$refs.questionEdit.dialogFormVisible = true;
      // 设置数据
      this.$refs.questionEdit.form = rowData;
    },
    // 页容量改变
    sizeChange(val) {
      // window.console.log(`每页 ${val} 条`);
      this.size = val;
      // 去第一页
      this.index = 1;
      this.getData();
    },
    // 页面改变
    currentChange(val) {
      // window.console.log(`当前页: ${val}`);
      // 保存页码
      this.index = val;
      this.getData();
    },
    // 抽取的获取数据逻辑
    getData() {
      // 获取题库数据
      questionList({
        // 页码
        page: this.index,
        // 页容量
        limit: this.size,
        // 合并搜索的条件
        ...this.formInline
      }).then(res => {
        // window.console.log(res)
        // 赋值给table
        this.tableData = res.data.items;
        // 总条数
        this.total = res.data.pagination.total;
      });
    }
  },
  // 获取数据
  created() {
    // 默认获取数据
    this.getData();
  }
};
</script>

<style lang="less">
.question-container {
  //  所有的盒子 除了最后一个 都设置宽度
  // .el-form--inline .el-form-item__content {
  .el-form--inline .el-form-item:not(:last-child) .el-form-item__content {
    width: 150px;
  }
  // 标题的盒子
  .el-form--inline .el-form-item.title-item .el-form-item__content {
    width: 398px;
  }
  .top-card .el-card__body {
    padding-left: 11px;
  }
  .el-form-item__label {
    padding-left: 30px;
    padding-right: 30px;
  }
  // 日期选择器的宽度
  .el-date-editor.el-input {
    width: 150px;
  }
  // 距离顶部的间隙
  .bottom-card {
    margin-top: 21px;
  }
  // 分页器
  .el-pagination {
    margin-top: 31px;
    text-align: center;
  }
}
</style>
