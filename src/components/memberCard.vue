<script lang="ts" setup>
const props = defineProps<{ avatar: string; name: string; identity: string; github: string }>();
function gotoGithub() {
  window.open(props.github);
}
</script>
<template>
  <div class="container" @click="gotoGithub">
    <div>
      <img class="avatar" :src="props.avatar" />
    </div>
    <div class="name">{{ props.name }}</div>
    <div>{{ props.identity }}</div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  width: 180px;
  margin: 20px 15px;
  background-color: rgba(227, 227, 229, 0.1);
  color: #999999;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  > div {
    margin: 10px;
    display: flex;
    justify-content: center;
  }
  .name {
    color: #cccccc;
    font-size: 18px;
    font-weight: bold;
  }
  .avatar {
    height: 64px;
    width: 64px;
    border-radius: 50%;
    text-align: center;
  }
}
</style>
