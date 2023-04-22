<script setup lang="ts">
import Link from '@/components/link.vue';
import { inject } from 'vue';
const isMobile = inject('isMobile') as boolean;
const isPc = inject('isPc') as boolean;
</script>

<template>
  <div class="nav">
    <div class="left">
      <Link :newWindow="true" :arrowShow="false" href="https://github.com/Pivot-Studio/pivot-lang"> Pivot Lang </Link>
    </div>
    <div class="right">
      <Link :arrowShow="isPc" :newWindow="true" href="https://github.com/Pivot-Studio/pivot-lang">
        <div class="github">
          <a href="https://github.com/Pivot-Studio/pivot-lang" target="_blank">
            <img alt="Github" src="https://d33wubrfki0l68.cloudfront.net/43f2732eec420aa8a930fc3239ef0469c3d760a8/5d500/community/github.svg" />
            <!-- <div>
          <img alt="stars" src="../assets/star.svg" />
          </div> -->
          </a>
        </div>
      </Link>
      <Link :arrowShow="isPc" :newWindow="true" href="https://lang.pivotstudio.cn/index.html">
        <div class="txt">Get Started</div>
      </Link>
      <Link :arrowShow="isPc" :newWindow="true" href="https://lang.pivotstudio.cn/index.html">
        <div class="txt">Use Cases</div>
      </Link>
      <Link :arrowShow="isPc" v-show="!isMobile" :newWindow="true" href="https://lang.pivotstudio.cn/index.html">
        <div class="txt">Community</div>
      </Link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: 10px 50px;
  justify-content: space-between;
  font-size: 16px;
  background-color: rgba(0,0,0,.9);

  @media screen and (max-width: 600px) {
    margin: 10px 20px 10px 30px;
    font-size: 14px;
  }
  .left {
    display: flex;
    align-items: center;
    margin-top: -2px;
    span {
      color: #fff;
      cursor: pointer;
    }
  }
  .right {
    display: flex;
    align-items: center;

    div {
      display: flex;
      align-items: center;
      margin: 0 15px 0 10px;
      @media screen and (max-width: 600px) {
        margin: 0 3px;
      }
    }
    .txt {
      text-decoration: none;
    }
    .github {
      img {
        margin-top: 6px;
        width: 28px;
        height: 28px;
      }
    }
  }
}
</style>
