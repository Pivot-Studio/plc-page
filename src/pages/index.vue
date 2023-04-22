<script setup lang="ts">
import { Nav, FirstPage, TabList } from '@/components';
import { ref, onMounted } from 'vue';
import useCreateMonaco from '@pivot-lang/create-monaco';
const createMonaco = useCreateMonaco('#container');
const tabVal = ref('hello,world');
const tabList = ['hello,world', 'nishisha'];
onMounted(() => {
  createMonaco();
});
</script>

<template>
  <div class="container">
    <Nav></Nav>
    <FirstPage @createMonaco="createMonaco"></FirstPage>
    <div class="code-show">
      <div class="gradient-font title">Enjoy coding pivot lang now!</div>
      <div class="detail-describe">We already support for LSP,you can code in the page just like in VSC,enjoying the hightlight and prompt when coding.</div>
      <div class="code-box">
        <TabList @updateVal="(val) => (tabVal = val)" :tablist="tabList" :val="tabVal"></TabList>
        <div class="code-container">
          <div id="container"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  position: relative;

  .code-show {
    position: relative;
    left: 0;
    right: 0;
    height: 1000px;
    .title {
      text-align: center;
      margin: 50px;
    }
    .detail-describe {
      margin: 0 auto;
      text-align: center;
      color: #7d8590;
      margin-bottom: 30px;
    }
    .code-box {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      .code-container {
        border-bottom: 10px #1e1e1e solid;
        border-radius: 10px;
      }
      #container {
        height: 600px;
        width: 800px;
        width: 800px;
      }
    }
  }
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
  font-weight: 400;
  line-height: 150%;
  color: #fff;
  width: 800px;
  max-width: 90vw;
  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
}
</style>
