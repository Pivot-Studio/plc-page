<script lang="ts" setup>
import { PlMonaco } from "@pivot-lang/create-monaco";
import axios from "axios";
import { ref } from "vue";

const props = defineProps<{
  tablist: string[];
  val: string;
  code: string;
}>();
const emit = defineEmits(["updateVal", "updateOutput"]);
function updateVal(val: string) {
  emit("updateVal", val);
}

let isRunning = ref(false);

async function run(params: string) {
  isRunning.value = true;
  try {
    let re = await axios.post<{ result: string }>(
      "https://code.lang.pivotstudio.cn/coderunner",
      {
        code: params,
      }
    );
    isRunning.value = false;
    if (!re.data.result) {
      emit("updateOutput", "run success with no output");
      return;
    }
    emit("updateOutput", re.data.result);
  } catch (error) {
    isRunning.value = false;
    emit("updateOutput", error);
  }
}
</script>
<template>
  <div class="top-menu">
    <div class="tab-list">
      <div
        @click="updateVal(tab)"
        v-for="tab in props.tablist"
        :key="tab"
        :class="{ selected: props.val == tab }"
      >
        {{ tab }}
      </div>
    </div>
    <div v-if="!isRunning" class="run">
      <font-awesome-icon
        icon="fa-play"
        :style="{
          color: 'green',
        }"
        style="cursor: pointer"
        @click="run(props.code)"
        class=""
      />
    </div>
    <div v-else class="run">
      <font-awesome-icon
        icon="fa-spinner"
        class="fa-spin"
        :style="{
          color: 'grey',
        }"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.top-menu {
  display: flex;
  background-color: #080808;
  border-radius: 10px 10px 0 0;
}
.tab-list {
  display: inline-flex;
  background-color: #080808;
  // border-radius: 10px 10px 0 0;
  padding: 0 10px;
  width: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  div {
    margin-top: 5px;
    padding: 10px 15px;
    color: #7d8590;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      color: #fff;
    }
  }
  .selected {
    color: #fff;
    background-color: #201c1c;
    border-radius: 5px 5px 0 0;
  }
}
.run {
  display: flex;
  margin: auto;
  padding: 10px;
}
</style>
