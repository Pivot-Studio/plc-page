<script lang="ts" setup>
import Link from '@/components/link.vue';
import { inject, Ref, onMounted } from 'vue';
const isMobile = inject('isMobile') as Ref<boolean>;
</script>
<template>
  <div class="first-page">
    <div class="describe">
      <div class="gradient-font">Pivot Lang</div>
      <div class="gradient-font">High-performance</div>
      <div class="gradient-font">New Generation Language</div>
      <div class="detail-describe">Pivot Lang language server was compiled to web assembly to provide your language supports, right from your browser.</div>
    </div>
    <div v-show="isMobile" class="background-container">
      <img src="https://s3.bmp.ovh/imgs/2023/04/20/1b0fa098ad9a1b7d.png" />
    </div>
    <div class="bottom">
      <div @click="create" class="start-button" style="cursor: pointer">Try It</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.first-page {
  height: 100vh;
  position: relative;
  background: url(https://s3.bmp.ovh/imgs/2023/04/20/1b0fa098ad9a1b7d.png) 0 0 / cover;
  @media screen and (max-width: 600px) {
    background: none;
  }

  .describe {
    position: absolute;
    top: 200px;
    left: 100px;
    @media screen and (max-width: 960px) {
      position: absolute;
      top: 100px;
      left: 20px;
    }
  }
  .background-container {
    position: absolute;
    bottom: 80px;
    img {
      min-width: 100%;
      min-height: 100%;
      max-width: 100%;
      max-width: 100%;
    }
  }

  .bottom {
    width: 100%;
    position: absolute;
    z-index: 1;
    bottom: 0;
    height: 80px;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    .start-button {
      // position: absolute;
      // right: 60px;
      padding: 10px 70px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 20px;
      color: #fff;
      background: linear-gradient(180deg, rgba(133, 233, 242, 0), rgba(133, 233, 242, 0.5)), linear-gradient(76.14deg, #4caad9 19.78%, #498ff2 80.22%);
    }
  }
}
</style>
