<template>
  <div class="question-container">
    <el-card class="top-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科">
          <!-- <subjectSel v-bind:value="formInline.subject" @input="v => (formInline.subject = v)" /> -->
          <subjectSel v-model="formInline.subject" />
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="formInline.region" placeholder="请选择阶段">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <!-- <enterpriseSel v-bind:value="formInline.enterprise" @input="v => (formInline.enterprise = v)" /> -->
          <enterpriseSel v-model="formInline.enterprise" />
        </el-form-item>
        <el-form-item label="题型">
          <el-select v-model="formInline.region" placeholder="请选择题型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度">
          <el-select v-model="formInline.region" placeholder="请选择难度">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="formInline.value1" type="date" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
        <br />
        <el-form-item class="title-item" label="标题">
          <el-input v-model="formInline.user" placeholder="选择日期"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" @click="$refs.questionAdd.dialogFormVisible=true" icon="el-icon-plus">新增试题</el-button>
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
            {{ scope.row.status === 1 ? '启用' : '禁用' }}
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text">
              {{ scope.row.status === 1 ? '禁用' : '启用' }}
            </el-button>
            <el-button type="text">删除</el-button>
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
  </div>
</template>

<script>
// 导入题库列表 接口
import { questionList } from '@/api/question.js';
// 导入 学科下拉框
import subjectSel from './components/subjectSel.vue';
// 导入 企业下拉框组件
import enterpriseSel from './components/enterpriseSel.vue';
// 导入 新增对话框
import questionAdd from './components/questionAdd.vue';
export default {
  name: 'question',
  data() {
    return {
      formInline: {
        user: '',
        region: '',
        value1: '',
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
    subjectSel,
    enterpriseSel,
    questionAdd
  },
  methods: {
    // 页容量改变
    sizeChange(val) {
      window.console.log(`每页 ${val} 条`);
    },
    // 页面改变
    currentChange(val) {
      window.console.log(`当前页: ${val}`);
    }
  },
  // 获取数据
  created() {
    // 获取题库数据
    questionList().then(res => {
      // window.console.log(res)
      // 赋值给table
      this.tableData = res.data.items;
      // 总条数
      this.total = res.data.pagination.total;
    });
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
