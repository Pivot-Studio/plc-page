<script setup lang="ts">
import { ref } from 'vue';
import Link from '@/components/link.vue';

defineProps<{ msg: string }>();
</script>

<template>
  <div class="nav">
    <div class="left">
      <Link :newWindow="true" :arrowShow="false" href="https://github.com/Pivot-Studio/pivot-lang">
        <span>Pivot Lang</span>
      </Link>
    </div>
    <div class="right">
      <Link :newWindow="true" href="https://github.com/Pivot-Studio/pivot-lang">
        <div class="github">
          <a href="https://github.com/Pivot-Studio/pivot-lang" target="_blank">
            <img alt="Github" src="https://d33wubrfki0l68.cloudfront.net/43f2732eec420aa8a930fc3239ef0469c3d760a8/5d500/community/github.svg" />
            <!-- <div>
          <img alt="stars" src="../assets/star.svg" />
          </div> -->
          </a>
        </div>
      </Link>
      <Link :newWindow="true" href="https://lang.pivotstudio.cn/index.html">
        <div class="txt">Get Started</div>
      </Link>
      <Link :newWindow="true" href="https://lang.pivotstudio.cn/index.html">
        <div class="txt">Use Cases</div>
      </Link>
      <Link :newWindow="true" href="https://lang.pivotstudio.cn/index.html">
        <div class="txt">Community</div>
      </Link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  position: fixed;
  z-index: 1;
  top: 0;
  width: calc(100vw - 100px);
  display: flex;
  margin: 20px 50px;
  justify-content: space-between;
  .left {
    span {
      font-size: 16px;
      color: #fff;
      cursor: pointer;
    }
  }
  .right {
    display: flex;
    div {
      display: flex;
      align-items: center;
      margin: 0 15px 0 10px;
    }
    .txt {
      font-size: 16px;
      line-height: 28px;
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
