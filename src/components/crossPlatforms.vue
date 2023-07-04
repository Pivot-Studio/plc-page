<script setup lang="ts">
import { computed, Fragment, onMounted, reactive, ref, Ref } from 'vue';
import codeBlock from './codeBlock.vue';
import { useDetectDeviceType } from '@/hooks/detectDeviceType';

const deviceType = useDetectDeviceType();
const currenClickPlatform = ref('');

if (deviceType.value !== 'other') {
  currenClickPlatform.value = deviceType.value;
} else {
  currenClickPlatform.value = 'apple';
}

function showCode(type: string) {
  currenClickPlatform.value = type;
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
    iconColor: 'rgb(200, 150, 50)',
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

const curShowCode = computed(() => {
  return platforms.find((item) => item.type === currenClickPlatform.value)?.code;
});
</script>
<template>
  <div id="advantage">
    <div class="gradient-font title">Cross Platforms</div>
    <div class="detail-describe">Download Pivot Lang with the command now!</div>
    <div class="advantages">
      <div v-for="item in platforms" :class="{ 'advantage-item': true, 'selected-item': item.type === currenClickPlatform }" :key="item.type">
        <font-awesome-icon
          @click="showCode(item.type)"
          inverse
          :icon="item.icon"
          :style="{
            color: item.iconColor,
          }"
          size="10x"
          class="picture"
        />
      </div>
    </div>
    <codeBlock class="code-block'" :code="curShowCode"></codeBlock>
  </div>
</template>
<style lang="scss" scoped>
#advantage {
  .advantages {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .advantage-item {
      margin: 10px 5vw;
      position: relative;
      .picture {
        position: relative;
        flex: 0 1 auto;
        background-color: rgba(255, 255, 255, 0.72);
        padding: 10px 26px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.7s ease;
        margin: 0 auto 12px;
        transform: scale(0.9);
        &:hover {
          background-color: #fff;
        }
        // height: 30vw;
      }
    }

    .selected-item {
      .picture {
        background-color: #fff;
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
