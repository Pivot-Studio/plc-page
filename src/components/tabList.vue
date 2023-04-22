<script lang="ts" setup>
const props = defineProps<{
  tablist: string[];
  val: string;
}>();
const emit = defineEmits(['updateVal']);
function updateVal(val: string) {
  emit('updateVal', val);
}
</script>
<template>
  <div class="tab-list">
    <tab @click="updateVal(tab)" v-for="tab in props.tablist" :key="tab" :class="{ selected: props.val === tab }"> {{ tab }} </tab>
  </div>
</template>
<style lang="scss" scoped>
.tab-list {
  display: flex;
  background-color: #080808;
  border-radius: 10px 10px 0 0;
  padding: 0 10px;
  tab {
    margin-top: 5px;
    padding: 10px 15px;
    color: #7d8590;
    cursor: pointer;
    &:hover {
      color: #fff;
    }
  }
  .selected {
    color: #fff;
    background-color: #201C1C;
    border-radius: 5px 5px 0 0;
  }
}
</style>
