<script lang="ts" setup>
import * as echarts from "echarts";
import { ref, Ref, onMounted, inject } from "vue";
import { getSunBurstData, getTotalCov, SunBurstData } from "@/hooks/codecov";
const covchartsDom = ref<HTMLInputElement | null>(null);

const totalCov = ref(0);
const totalCovTarget = ref("Pivot Lang");
const isMobile = inject("isMobile") as boolean;

onMounted(async () => {
  const data = getSunBurstData(await getTotalCov());
  totalCov.value = data.coverage;
  const option = {
    tooltip: {
      trigger: "item",
    },
    series: {
      type: "sunburst",
      sort: undefined,
      tooltip: {
        formatter: handleCovChange,
      },
      emphasis: {
        disable: true,
      },
      data: data.children,
      label: {
        formatter: "",
        show: false,
      },
      levels: [],
    },
  };
  const myChart = echarts.init(covchartsDom.value as HTMLElement);
  const loadEcharts = () => {
    const { top, bottom } = (
      covchartsDom.value as HTMLElement
    ).getBoundingClientRect();
    if (top < window.innerHeight && bottom > 0) {
      window.removeEventListener("scroll", loadEcharts);
      myChart.setOption(option);
    }
  };
  window.addEventListener("scroll", loadEcharts);
  // myChart.setOption(option);
});

function handleCovChange(ev: any) {
  let data = ev.data as SunBurstData;
  if (data.filename) {
    totalCovTarget.value = data.filename;
    totalCov.value = data.coverage;
  } else {
    let totalLines = 0;
    let totalhits = 0;
    for (let index = 0; index < data.children!.length; index++) {
      const element = data.children![index];
      totalLines += element.value;
      totalhits += element.hits;
    }
    let list = data.children![0].filename.split("/");
    list.pop();
    totalCovTarget.value = list.join("/");
    totalCov.value = totalhits / totalLines;
    if (totalCovTarget.value === "") {
      totalCovTarget.value = "Pivot Lang";
    }
  }
}
function gotoCodecov() {
  window.open("https://app.codecov.io/gh/Pivot-Studio/pivot-lang");
}

function getCovClass() {
  if (totalCov.value >= 0.8) {
    return "covHigh";
  } else if (totalCov.value >= 0.5) {
    return "covMiddle";
  } else {
    return "covLow";
  }
}
</script>
<template>
  <div ref="covchartsDom" class="chart-container"></div>
  <div class="cov">
    {{ totalCovTarget }} coverage:
    <span :class="getCovClass()">{{ (totalCov * 100).toFixed(2) }}%</span>
  </div>
  <div class="button">
    <span @click="gotoCodecov">👉 See test details</span>
  </div>
</template>

<style lang="scss" scoped>

span.covHigh {
  color: #1db010;
}
span.covMiddle {
  color: #f5d10a;
}
span.covLow {
  color: #f50a0a;
}
</style>
