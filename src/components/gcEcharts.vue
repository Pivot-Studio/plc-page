<script lang="ts" setup>
import * as echarts from 'echarts';
import { ref, Ref, onMounted } from 'vue';
const echartsDom = ref<HTMLInputElement | null>(null);
const option = {
  animationDuration: 2000,
  xAxis: {
    type: 'category',
    data: ['2', '3', '4', '5', '6', '7', '8', '9', '10'],
    name: 'thread',
  },
  yAxis: {
    type: 'value',
    name: 'time',
    axisLine: { show: true },
    splitLine: {
      show: false,
    },
  },
  legend: {
    data: ['immix gc', 'bdw gc'],
    textStyle: {
      color: 'white',
    },
    itemStyle: {
      color: 'black',
    },
  },
  series: [
    {
      name: 'immix gc',
      data: [0.45, 0.46, 0.48, 0.53, 0.62, 0.7, 0.72, 1.03, 1.08],
      type: 'line',
    },
    {
      name: 'bdw gc',
      data: [0.44, 0.77, 1.21, 1.69, 2.37, 2.85, 3.45, 4.12, 4.65],
      type: 'line',
    },
  ],
};
onMounted(() => {
  const myChart = echarts.init(echartsDom.value as HTMLElement);
  const loadEcharts = () => {
    const { top, bottom } = (echartsDom.value as HTMLElement).getBoundingClientRect();
    if (top < window.innerHeight && bottom > 0) {
      window.removeEventListener('scroll', loadEcharts);
      myChart.setOption(option);
    }
  };
  window.addEventListener('scroll', loadEcharts);
});
function gotoBenchmark() {
  window.open('https://lang.pivotstudio.cn/docs/systemlib/immix.html#%E6%80%A7%E8%83%BD');
}
</script>
<template>
  <div ref="echartsDom" id="echartsDom"></div>
  <div class="button">
    <span @click="gotoBenchmark">👉 See benchmark details</span>
  </div>
</template>
<style lang="scss" scoped>
#echartsDom {
  height: 400px;
  width: 900px;
  margin: 0 auto;
  max-width: 80vw;
}
.button {
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  color: #7d8590;
  span {
    cursor: pointer;
  }
}
</style>
