<script setup lang="ts">
import { useDetectDeviceSize } from '@/hooks/detectDeviceSize';
import { toRef, provide } from 'vue';
const deviceInfo = useDetectDeviceSize();
provide('sizeCnt', toRef(deviceInfo, 'deviceCnt'));
provide('isMobile', toRef(deviceInfo, 'isMobile'));
provide('isPc', toRef(deviceInfo, 'isPc'));
</script>

<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style scoped>
</style>
