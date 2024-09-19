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
import CodeBlock from "@/components/codeBlock.vue";
import { cp } from "fs";
import "xterm/css/xterm.css";
import { Terminal } from "xterm";

const tabVal = ref("hello world");
const tabList = basicCode.map((item) => item.title);
let monaco: PlMonaco;
let code = ref("");
let runResult = ref("");
function gotoEmail() {
  window.location.href = "mailto:lang@pivotstudio.cn";
}

const terminal = new Terminal({
  convertEol: true,
  disableStdin: true, //是否应禁用输入
  fontSize: 14,
  theme: {
    foreground: "#ECECEC", //字体
    background: "#000000", //背景色
  },
});

function handleOutput(re: string) {
  runResult.value = re[re.length - 1] === "\n" ? re.slice(0, -1) : re;
  terminal.reset();
  terminal.write(runResult.value);
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
  terminal.open(document.querySelector(".code-block") as HTMLElement);
  terminal.resize(44, 17);
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
      <div class="code-now-container">
        <div class="code-box">
          <TabList
            @updateVal="(val) => (tabVal = val)"
            @updateOutput="handleOutput"
            :tablist="tabList"
            :val="tabVal"
            :code="code"
          ></TabList>
          <div class="code-container">
            <div id="container"></div>
          </div>
        </div>
        <div class="execution">
          <div class="execution-title">Execution</div>
          <div class="code-block"></div>
        </div>
      </div>
    </div>
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
.terminal {
  overflow: auto;
}
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

      @media (max-width: 600px) {
        margin: 50px 25px 15px 25px;
      }
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
  .code-now-container {
    display: flex;
    justify-content: center;
    .code-box {
      // position: absolute;
      // left: 50%;
      // transform: translate(-50%);
      width: 60%;
      max-width: 800px;
      height: 600px;
      max-height: calc(100vh - 400px);
      .code-container {
        border-bottom: 10px #1e1e1e solid;
        border-radius: 10px;
        height: 100%;
      }
      #container {
        height: 100%;
        width: 100%;
      }
    }

    .execution {
      width: 25%;
      margin: 30px 0 0 50px;
      .execution-title {
        color: wheat;
        margin-left: 5px;
        margin-bottom: 10px;
        font-weight: bold;
      }

      .code-toolbar {
        pre {
          height: 100%;
          background-color: rgba(50, 50, 70, 0.5);
        }
      }
      .toolbar {
        display: none;
      }
    }

    @media (max-width: 800px) {
      flex-direction: column;
      align-items: center;
      .code-box {
        width: 70%;
        height: 40vh;
      }

      .execution {
        width: 70%;
        margin: 80px 0 0;
        max-height: 300px;

        pre {
          height: 100%;
          max-height: 80px;
        }
        .code-toolbar {
          width: 100%;
        }
      }
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

  .code-block {
    white-space: pre-wrap;
    padding: 10px 0 0 20px;
    border-radius: 10px;
    color: aliceblue;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border: 5px #666 solid;
  }

  .xterm-helpers {
    visibility: hidden;
    height: 0;
  }
  .xterm-cursor {
    display: none !important;
  }

  .xterm .xterm-viewport {
    &::-webkit-scrollbar {
      height: 5px;
      width: 5px;
    }
    overflow-y: auto;
    &::-webkit-scrollbar-thumb {
      background-color: #666;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      &:hover {
        background-color: #999; // 轨道颜色
      }
    }
    &::-webkit-scrollbar-track {
      background-color: #222; // 轨道颜色
    }
  }
}
</style>
