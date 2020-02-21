<template>
  <el-select v-model="selfEnterprise" placeholder="请选择企业">
    <el-option v-if="isQuery" label="所有企业" value=""></el-option>
    <el-option
      v-for="(item, index) in enterpriseList"
      :key="index"
      :label="item.short_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
// 导入企业 接口
import { enterpriseList } from '@/api/enterprise.js';
export default {
  props: {
    value: {
      type: [String, Number]
    },
    isQuery: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 企业数据
      enterpriseList: [],
      // 内部选中的值
      selfEnterprise: this.value
    };
  },
  created() {
    // 获取企业数据
    enterpriseList().then(res => {
      this.enterpriseList = res.data.items;
    });
  },
  // 侦听器
  watch: {
    selfEnterprise() {
      this.$emit('input', this.selfEnterprise);
    }
  }
};
</script>

<style></style>
