<script setup lang="ts">
import Nav from '@/components/nav.vue';
import Link from '@/components/link.vue';
import { useCreateMonaco } from '@/hooks/monaco';
import { inject, Ref } from 'vue';
const createMonaco = useCreateMonaco('#container');
const isMobile = inject('isMobile') as Ref<boolean>;
function create() {
  if (!isMobile.value) {
    createMonaco();
  }
}
</script>

<template>
  <div class="container">
    <Nav></Nav>
    <div class="first-page">
      <div class="describe">
        <div class="gradient-font">Pivot Lang</div>
        <div class="gradient-font">High-performance</div>
        <div class="gradient-font">New Generation Language</div>
        <div class="detail-describe">Pivot Lang language server was compiled to web assembly to provide your language supports, right from your browser.</div>
      </div>
      <div id="container" style="height: 80%; top: 10%; left: 55%; width: 40%; position: absolute"></div>
      <div v-show="isMobile" class="background-container">
        <img src="https://s3.bmp.ovh/imgs/2023/04/20/1b0fa098ad9a1b7d.png" />
      </div>
      <div class="bottom">
        <div @click="create" class="start-button" style="cursor: pointer">Try It</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;

  .first-page {
    width: 100vw;
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

      .gradient-font {
        font-size: 58px;
        font-weight: 860;
        line-height: 150%;
        background: linear-gradient(180deg, rgba(186, 255, 243, 0) 50.04%, rgba(189, 255, 244, 0.44) 100.09%), linear-gradient(64.57deg, #75fff3 7.22%, #599aff 90.07%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        @media screen and (max-width: 1200px) {
          font-size: 48px;
        }
        @media screen and (max-width: 960px) {
          font-size: 38px;
        }
        @media screen and (max-width: 600px) {
          font-size: 28px;
        }
        @media screen and (max-width: 460px) {
          font-size: 24px;
        }
      }

      .detail-describe {
        margin-top: 50px;
        font-size: 24px;
        font-weight: 500;
        line-height: 150%;
        color: #fff;
        width: 800px;
        max-width: 90vw;
        @media screen and (max-width: 600px) {
          font-size: 18px;
        }
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
}
</style>
