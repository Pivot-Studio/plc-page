<script setup lang="ts">
import Link from '@/components/link.vue';
import { inject } from 'vue';
const isMobile = inject('isMobile') as boolean;
function scrollToCode() {
  window.scrollTo({
    top: window.innerHeight - 10,
    behavior: 'smooth',
  });
}
</script>

<template>
  <div class="nav">
    <div class="left">
      <Link :newWindow="false" :arrowShow="false" href="https://github.com/Pivot-Studio/pivot-lang"> <img src="../assets/logo_dark.svg" /> Pivot Lang </Link>
    </div>
    <div class="right">
      <Link href="https://github.com/Pivot-Studio/pivot-lang">
        <div class="github">
          <a>
            <img alt="Github" src="https://d33wubrfki0l68.cloudfront.net/43f2732eec420aa8a930fc3239ef0469c3d760a8/5d500/community/github.svg" />
          </a>
        </div>
      </Link>
      <Link :newWindow="true" href="https://pivotlang.tech/docs/index.html">
        <div class="txt">Get Started</div>
      </Link>
      <Link :newWindow="true" href="https://github.com/Pivot-Studio/pivot-lang/blob/master/test/test/generic.pi">
        <div class="txt">Use Cases</div>
      </Link>
      <Link v-show="!isMobile" :newWindow="true" href="https://pivotlang.tech/index.html">
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
  background-color: rgba(0, 0, 0, 0.9);

  @media (max-width: 800px) {
    padding: 10px 20px;
    font-size: 14px;
  }
  .left {
    display: flex;
    align-items: center;
    margin-top: -2px;
    img {
      transform: translate(-5px, -4px);
      width: 30px;
      height: 30px;
    }
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
      @media (max-width: 800px) {
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
