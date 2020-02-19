<template>
  <div class="question-container">
    <el-card class="top-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科">
          <el-select v-model="formInline.subject" placeholder="请选择学科">
            <el-option label="所有学科" value=""></el-option>
            <el-option v-for="(item, index) in subjectList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="formInline.region" placeholder="请选择阶段">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <el-select v-model="formInline.enterprise" placeholder="请选择企业">
            <el-option label="所有企业" value=""></el-option>
            <el-option v-for="(item, index) in enterpriseList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
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
          <el-button type="primary" icon="el-icon-plus">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 底部的卡片 -->
    <el-card class="bottom-card">
      <!-- table -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="180"> </el-table-column>
        <el-table-column prop="date" label="题目"> </el-table-column>
        <el-table-column prop="name" label="学科.阶段"> </el-table-column>
        <el-table-column prop="address" label="题型"> </el-table-column>
        <el-table-column prop="address" label="题型"> </el-table-column>
        <el-table-column prop="address" label="企业"> </el-table-column>
        <el-table-column prop="address" label="创建者"> </el-table-column>
        <el-table-column prop="address" label="状态"> </el-table-column>
        <el-table-column prop="address" label="访问量"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template>
            <el-button type="text">编辑</el-button>
            <el-button type="text">启用</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="index"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// 导入学科 接口
import { subjectList } from '@/api/subject.js';
// 导入企业 接口
import { enterpriseList } from '@/api/enterprise.js';
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
      // 学科数据
      subjectList: [],
      // 企业数据
      enterpriseList: [],
      // 分页器相关
      // 页容量
      size: 2,
      // 页码
      index: 1,
      // 总条数
      total: 0
    };
  },
  methods: {
    // 页容量改变
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
    },
    // 页面改变
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
    }
  },
  // 获取数据
  created() {
    // 获取学科数据
    subjectList().then(res => {
      // window.console.log(res)
      this.subjectList = res.data.items;
    });
    // 获取企业数据
    enterpriseList().then(res => {
      // window.console.log(res)
      this.enterpriseList = res.data.items;
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
