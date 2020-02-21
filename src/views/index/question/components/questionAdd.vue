<template>
  <el-dialog
    class="question-add"
    fullscreen
    title="新增题库"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form">
      <el-form-item label="学科" :label-width="formLabelWidth">
        <subjectSel :isQuery="false" v-model="form.subject" />
      </el-form-item>
      <el-form-item label="阶段" :label-width="formLabelWidth">
        <el-select v-model="form.step" placeholder="请选择阶段">
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" :label-width="formLabelWidth">
        <enterpriseSel :isQuery="false" v-model="form.enterprise" />
      </el-form-item>
      <el-form-item label="城市" :label-width="formLabelWidth">
        <!-- <chinaArea v-bind:value="form.city" @input="v => (form.city = v)" /> -->
        <chinaArea v-model="form.city" />
      </el-form-item>
      <el-form-item label="题型" :label-width="formLabelWidth">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" :label-width="formLabelWidth">
        <el-radio-group v-model="form.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 富文本编辑器1 标题 -->
      <el-form-item label="试题标题" :label-width="formLabelWidth">
        <!-- <myEditor v-bind:value="form.title" @input="v => (form.title = v)" /> -->
        <myEditor v-model="form.title" />
      </el-form-item>
      <!-- 选项区域 单选 -->
      <el-form-item
        v-if="form.type == 1"
        label="单选"
        :label-width="formLabelWidth"
      >
        <el-radio-group v-model="form.single_select_answer">
          <!-- <optionItem
            v-bind:label="form.select_options[0].label"
            v-bind:text="form.select_options[0].text"
            v-on:update:text="v => (form.select_options[0].text = v)"
            v-bind:image="form.select_options[0].image"
            v-on:update:image="v => (form.select_options[0].image = v)"
          /> -->
          <optionItem
            :label="form.select_options[0].label"
            :text.sync="form.select_options[0].text"
            :image.sync="form.select_options[0].image"
          />
          <el-radio label="B"></el-radio>
          <el-radio label="C"></el-radio>
          <el-radio label="D"></el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 选项区域 多选 -->
      <el-form-item
        v-else-if="form.type == 2"
        label="多选"
        :label-width="formLabelWidth"
      >
        <el-checkbox-group v-model="form.multiple_select_answer">
          <el-checkbox label="A"></el-checkbox>
          <el-checkbox label="B"></el-checkbox>
          <el-checkbox label="C"></el-checkbox>
          <el-checkbox label="D"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <!-- 选项区域 简答 -->
      <el-form-item v-else label="简答" :label-width="formLabelWidth">
        <el-input
          v-model="form.short_answer"
          type="textarea"
          rows="4"
          placeholder=""
        ></el-input>
      </el-form-item>

      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 富文本编辑器1 标题 -->
      <el-form-item label="答案解析" :label-width="formLabelWidth">
        <!-- <myEditor v-bind:value="form.answer_analyze" @input="v => (form.title = v)" /> -->
        <myEditor v-model="form.answer_analyze" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
// 导入抽取的省市区组件
import chinaArea from './chinaArea.vue';
// 导入抽取的富文本编辑器
import myEditor from './myEditor.vue';
// 导入选项组件
import optionItem from './optionItem.vue';
export default {
  // 注册组件
  components: {
    chinaArea,
    myEditor,
    optionItem
  },
  data() {
    return {
      dialogFormVisible: false,
      // 表单的数据
      form: {
        // 阶段
        step: '',
        // 学科和企业
        subject: '',
        enterprise: '',
        // 省市区
        city: [],
        // 题型 和难度
        type: 1,
        difficulty: 1,
        // 富文本编辑器的数据 标题 答案解析(answer_analyze)
        title: '我是一个标题',
        answer_analyze: '默认的答案解析',
        // 答案 单选，多选，简答
        single_select_answer: '',
        multiple_select_answer: [],
        short_answer: '',
        // 选项
        select_options: [
          {
            label: 'A',
            text: '狗不理',
            image: 'upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg'
          },
          {
            label: 'B',
            text: '猫不理',
            image: 'upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg'
          },
          {
            label: 'C',
            text: '麻花',
            image: 'upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg'
          },
          {
            label: 'D',
            text: '炸酱面',
            image: 'upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg'
          }
        ]
      },

      formLabelWidth: '120px'
    };
  },
  methods: {}
};
</script>

<style lang="less">
.question-add {
  .el-form {
    width: 835px;
    margin: 0 auto;
  }
  // 选择框宽度
  .el-select {
    width: 364px;
  }
  // 级联选择器的宽度
  .el-cascader {
    width: 364px;
  }
}
</style>
