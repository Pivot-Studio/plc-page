<script setup lang="ts">
import Nav from '@/components/nav.vue';
import Link from '@/components/link.vue';
</script>

<template>
  <div class="container">
    <Nav></Nav>
    <div class="first-page">
      <div class="describe">
        <div class="gradient-font">High-performance</div>
        <div class="gradient-font">Based On Rust</div>
        <div class="gradient-font">New Generation Language</div>
        <div class="detail-describe">GitHub Copilot uses the OpenAI Codex to suggest code and entire functions in real-time, right from your editor.</div>
      </div>
      <div class="bottom">
        <Link href="https://lang.pivotstudio.cn/index.html" :arrowShow="false"> <div class="start-button">Get Started</div></Link>
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
    background: url(https://s3.bmp.ovh/imgs/2023/04/18/97f8881ab6358b0f.jpg) 0 0 / cover;
    .describe {
      position: absolute;
      top: 200px;
      left: 100px;
      .gradient-font {
        font-size: 58px;
        font-weight: 860;
        line-height: 150%;
        background: linear-gradient(180deg, rgba(186, 255, 243, 0) 50.04%, rgba(189, 255, 244, 0.44) 100.09%), linear-gradient(64.57deg, #75fff3 7.22%, #599aff 90.07%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .detail-describe {
        margin-top: 50px;
        font-size: 24px;
        line-height: 150%;
        color: #fff;
        width: 800px;
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
