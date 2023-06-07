<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Prism from 'prismjs';
const codeRef = ref();
const props = defineProps({
  code: {
    type: String,
    default: '',
  },
});
onMounted(() => {
  Prism.highlightAll();
});
</script>
<template>
  <pre data-prismjs-copy="copy" data-prismjs-copy-error="按Ctrl+C复制" data-prismjs-copy-success="copied!" class="pre data-prismjs-copy">
    <code className="language-jsx" style="font-size: 10px;" ref={codeRef}>{{ props.code }}</code>
  </pre>
</template>
<style scoped lang="scss">
.pre {
  white-space: pre-line;
  margin: 0 auto;

  &::-webkit-scrollbar {
    height: 5px;
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #666;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    &:hover {
      background-color: #999; // 轨道颜色
    }
  }
  &::-webkit-scrollbar-track {
    background-color: #222; // 轨道颜色
  }
}
</style>
