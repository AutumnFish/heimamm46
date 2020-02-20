<template>
  <el-select v-model="selfSubject" placeholder="请选择学科">
    <el-option label="所有学科" value=""></el-option>
    <el-option v-for="(item, index) in subjectList" :key="index" :label="item.short_name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
// 导入学科 接口
import { subjectList } from '@/api/subject.js';
export default {
  props: ['value'],
  data() {
    return {
      // 学科数据
      subjectList: [],
      // 内部选中的学科
      selfSubject: this.value
    };
  },
  created() {
    window.console.log(this.value);

    // 获取学科数据
    subjectList().then(res => {
      this.subjectList = res.data.items;
    });
  },
  // 监听数据改变
  watch: {
    selfSubject() {
      this.$emit('input', this.selfSubject);
    }
  }
};
</script>

<style></style>
