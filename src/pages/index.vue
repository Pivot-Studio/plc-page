<script setup lang="ts">
import {
  Nav,
  FirstPage,
  TabList,
  GcEcharts,
  MemberCard,
  Bottom,
  MoreInfo,
  CodeCovEcharts,
  VscSupportShow,
  Link,
  CrossPlatforms,
} from "@/components";
import { ref, onMounted, watch } from "vue";
import { basicCode } from "@/constant";
import { memberList } from "@/constant";
import createMonaco, { PlMonaco } from "@pivot-lang/create-monaco";
import codeBlock from "@/components/codeBlock.vue";
import { cp } from "fs";
const tabVal = ref("hello world");
const tabList = basicCode.map((item) => item.title);
let monaco: PlMonaco;
let code = ref("");
let runresult = ref("");
function gotoEmail() {
  window.location.href = "mailto:lang@pivotstudio.cn";
}

onMounted(async () => {
  monaco = createMonaco(
    document.getElementById("container")!,
    basicCode[0].code
  );
  code.value = basicCode[0].code;
  monaco.editor.onDidChangeModelContent(() => {
    code.value = monaco.editor.getModel()!.getValue();
  });
});
watch(
  () => tabVal.value,
  (val) => {
    const code1 = basicCode.find((item) => item.title === val)?.code || "";
    code.value = code1;
    monaco.setContent(code1);
  }
);
</script>

<template>
  <div class="container">
    <Nav></Nav>
    <FirstPage :monaco="monaco"></FirstPage>
    <div id="code-show">
      <div class="gradient-font title">Enjoy coding pivot lang now!</div>
      <div class="detail-describe">
        With the help of Web Assembly technology, we are able to provide support
        for some of the Pivot Lang syntax in the browser for you to experience.
      </div>
      <div class="code-box">
        <TabList
          @updateVal="(val:string) => (tabVal = val)"
          @updateOutput="(re) => (runresult = re)"
          :tablist="tabList"
          :val="tabVal"
          :code="code"
        ></TabList>
        <div class="code-container">
          <div id="container"></div>
        </div>
      </div>
    </div>
    <codeBlock
      v-if="runresult"
      class="code-block'"
      :code="runresult"
    ></codeBlock>
    <div id="advantage">
      <div class="gradient-font title">Immix Garbage Collector</div>
      <div class="detail-describe">
        Significantly outperforming the well known Boehm-Demers-Weiser (BDW)
        collector in the multi-thread environment, the Immix collector is a
        state-of-the-art garbage collector for modern hardware. It is designed
        to be highly concurrent and to exploit the locality of reference
        patterns in modern programs.
      </div>
      <GcEcharts></GcEcharts>
    </div>
    <div id="advantage">
      <div class="gradient-font title">Reliability</div>
      <div class="detail-describe">
        Pivot Lang is heavily tested to ensure that it is stable and reliable.
        We have a large number of unit tests and integration tests to ensure
        that the coverage of the code is as high as possible.
      </div>
      <CodeCovEcharts></CodeCovEcharts>
    </div>
    <CrossPlatforms></CrossPlatforms>
    <VscSupportShow></VscSupportShow>
    <div id="team">
      <div class="gradient-font title">Meet The Team</div>
      <div class="team-card">
        <div class="card-container">
          <MemberCard
            v-for="member in memberList"
            :key="member.name"
            :name="member.name"
            :github="member.github"
            :avatar="member.avatar"
            :identity="member.identity"
          ></MemberCard>
        </div>
      </div>
    </div>
    <div id="join">
      <div class="gradient-font title">Join Our Team</div>
      <div class="two-grid-container">
        <img class="left" src="@/assets/socialite.jpg" />
        <div class="detail-describe right">
          Pivot lang is still developing and we long for every geek
          joingus,completing the language together.If you are interested in
          pivot lang,click the button and write the email to
          <span style="color: white">lang@pivotstudio.cn</span>
          introduce yourself now!
        </div>
      </div>
    </div>
    <MoreInfo></MoreInfo>
    <Bottom></Bottom>
  </div>
</template>

<style lang="scss">
.container {
  position: relative;

  #code-show,
  #advantage,
  #team,
  #join {
    position: relative;
    left: 0;
    right: 0;
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
  }

  #code-show {
    min-height: calc(100vh - 100px);
  }
  .code-box {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    max-width: 74.5vw;
    .code-container {
      border-bottom: 10px #1e1e1e solid;
      border-radius: 10px;
    }
    #container {
      height: 800px;
      width: 800px;
      max-height: calc(100vh - 400px);
      max-width: 80vw;
    }
  }
  .team-card {
    display: flex;
    justify-content: center;
    .card-container {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      max-width: 1152px;
    }
  }

  #join {
    .two-grid-container {
      @media (min-width: 800px) {
        display: flex;
        align-items: center;
        .left {
          width: 25vw;
          margin-left: 20vw;
        }
        .right {
          width: 30vw;
          margin-left: 10vw;
          margin-right: 15vw;
          font-size: 1.4vw;
        }
      }
      @media (max-width: 800px) {
        img {
          display: none;
        }
        .right {
          font-size: 16px;
          width: 70vw;
          margin-left: 15vw;
          text-align: left;
        }
      }
    }
    img {
      border-radius: 20px;
    }
    .button {
      width: 10vw;
      margin: 50px auto;
    }
  }
}
</style>
