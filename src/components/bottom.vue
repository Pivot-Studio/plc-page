<script lang="ts" setup></script>
<template>
  <div class="bottom">
    <div class="left">
      <img src="../assets/logo_dark.svg" />
      <span>Pivot Lang</span>
    </div>
    <div class="right">©Pivot Lang 2023. All rights reserved | Privacy Policy</div>
  </div>
</template>
<style lang="scss" scoped>
.bottom {
  background-color: #111414;
  position: relative;
  bottom: 10px;
  display: flex;
  padding: 20px 40px;
  justify-content: space-between;
  color: #fff;
  flex-wrap: wrap;
  .left {
    display: flex;
    align-items: center;
    img {
      transform: translate(0, -4px);
      width: 30px;
      height: 30px;
    }
    span {
      margin-left: 10px;
      color: #fff;
    }
  }
  .right {
    font-size: 14px;
    line-height: 50px;
  }
  @media (max-width: 800px) {
    font-size: 12px;
    justify-content: center;
    .right {
      font-size: 12px;
    }
    padding: 20px 10px;
  }
}
</style>
