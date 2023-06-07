<script setup lang="ts">
import { onMounted, reactive, ref, Ref } from 'vue';
import codeBlock from './codeBlock.vue';
const currenClickPlatform = ref('');
function showCode(type: string) {
  if (currenClickPlatform.value === type) currenClickPlatform.value = '';
  else currenClickPlatform.value = type;
}
const platforms = [
  {
    type: 'apple',
    icon: 'fa-brands fa-apple',
    iconColor: '#8465ff',
    code: `brew tap pivot-studio/tap
brew install pivot-lang`,
  },
  {
    type: 'windows',
    icon: 'fa-brands fa-windows',
    iconColor: '#409eff',
    code: `scoop bucket add pivot https://github.com/Pivot-Studio/scoop
scoop install plc`,
  },
  {
    type: 'linux',
    icon: 'fa-brands fa-linux',
    iconColor: 'rgb(220, 160, 50)',
    code: `apt install wget gnupg
wget -O -  https://lang.pivotstudio.cn/apt/public.key | apt-key add -
echo "deb [arch=amd64] https://lang.pivotstudio.cn/apt/repo focal main
# deb-src [arch=amd64] https://lang.pivotstudio.cn/apt/repo focal main
deb [arch=amd64] https://lang.pivotstudio.cn/apt/repo jammy main
# deb-src [arch=amd64] https://lang.pivotstudio.cn/apt/repo jammy main">/etc/apt/sources.list.d/pl.list
apt update
apt install pivot-lang`,
  },
];
</script>
<template>
  <div id="advantage">
    <div class="gradient-font title">Cross Platforms</div>
    <div class="advantages">
      <div v-for="item in platforms" class="advantage-item" :key="item.type">
        <Transition>
          <codeBlock v-if="currenClickPlatform === item.type" :class="['code-block', item.type]" :code="item.code"></codeBlock>
        </Transition>
        <Transition>
          <font-awesome-icon
            @click="showCode(item.type)"
            inverse
            :icon="item.icon"
            :style="{
              color: item.iconColor,
              opacity: currenClickPlatform === item.type ? 0 : 1,
              display: currenClickPlatform === item.type ? 'hidden' : 'block',
              zIndex: currenClickPlatform === item.type ? -1 : 1,
            }"
            size="10x"
            class="picture"
          />
        </Transition>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#advantage {
  .text-describe {
    .title-text {
      color: white;
    }
  }
  .advantages {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .advantage-item {
      margin: 40px 0;
      position: relative;
    }
    .text-describe {
      text-align: start;
      font-size: 1.7vw;
    }
    .picture {
      position: relative;
      flex: 0 1 auto;
      margin: 0 5vw;
      background-color: #eee;
      padding: 10px 24px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.7s ease;
      // height: 30vw;
    }
    .code-block {
      width: calc(220px + 5vw);
      max-height: 220px;
      transition: all 0.7s ease;
    }
    @media (max-width: 800px) {
      .advantage-item {
        margin: 10px 8vw;
        .text-describe {
          font-size: 4vw;
          width: 70%;
        }
        .picture {
          margin: 0 auto 12px;
          transform: scale(.9);
        }
        .code-block {
          width: 60vw;
          max-height: 220px;
          transition: all 0.7s ease;
        }
      }
    }
  }
}
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
