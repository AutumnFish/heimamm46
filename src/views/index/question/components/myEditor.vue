<template>
  <div class="editor">
    <div class="toolbar" ref="toolbar"></div>
    <div class="content" ref="content"></div>
  </div>
</template>

<script>
// 导入 富文本编辑器 构造函数 wangeditor
import wangeditor from 'wangeditor';
export default {
  props: {
    value: String
  },
  // 创建编辑器
  mounted() {
    // 创建编辑器
    const editor = new wangeditor(this.$refs.toolbar, this.$refs.content);
    // 注册事件
    editor.customConfig.onchange = html => {
      // 设置给 inputValue
      this.$emit('input', html);
    };
    // 再创建 富文本编辑器
    editor.create();
    // 创建之后再设置
    editor.txt.html(this.value);
  }
};
</script>

<style lang="less">
.editor {
  .toolbar {
    border: 1px solid gray;
    border-bottom: none;
  }
  .content {
    height: 100px;
    border: 1px solid gray;
  }
}
</style>
