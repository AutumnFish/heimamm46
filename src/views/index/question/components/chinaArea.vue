<template>
  <el-cascader
    :props="{ value: 'label' }"
    size="large"
    :options="options"
    v-model="selfCity"
    @change="handleChange"
  >
  </el-cascader>
</template>

<script>
// 导入省市区数据
import { regionData } from 'element-china-area-data';
export default {
  // 定义参数
  props: {
    value: {
      type: Array
    }
  },
  data() {
    return {
      // 保存外部传递过来的数据
      selfCity: this.value,
      // 级联选择器的数据
      options: regionData
    };
  },
  methods: {
    handleChange(val) {
      //   window.console.log(val)
      // 通知父组件 数据改变，并传递数据
      this.$emit('input', val);
    }
  }
  //   watch: {
  //       selfCity(){
  //         //   window.console.log(this.selfCity)
  //         this.$emit('input',this.selfCity)
  //       }
  //   },
};
</script>

<style></style>
