<script setup lang="ts"></script>
<template>
  <div id="advantage">
    <div class="gradient-font title">First Class VSC support</div>

    <div class="advantage-item">
      <div class="left detail-describe text-describe">
        <div class="title-text">Code fast, code easy</div>
        <div>We provide Code Hints, Code jump, Reference lookup, semantic highlights and more...</div>
      </div>
      <div class="right picture lsp-img">
        <img src="@/assets/LSP-hint.png" />
        <img src="@/assets/LSP-reference.png" />
      </div>
    </div>
    <div class="advantage-item">
      <div class="right detail-describe text-describe">
        <div class="title-text">Debug with a single click</div>
        <div>We have complete debug support on every major platform.</div>
      </div>
      <div class="left picture debug-img">
        <img src="@/assets/debug_code.png" />
        <img src="@/assets/debug_value.png" />
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
  .picture {
    img {
      position: relative;
    }
  }
  @media (min-width: 600px) {
    .advantage-item {
      display: flex;
      justify-content: center;
      align-items: center;
      .text-describe {
        text-align: start;
        font-size: 1.7vw;
      }
      .picture {
        flex: 0 1 auto;
        margin: 5vw 10vw;
        height: 30vw;
      }
      // 通过order来控制左右
      .left {
        order: -1;
        width: 36vw;
        margin-left: 14vw;
      }
      .right {
        margin-right: 10vw;
      }
    }
  }
  @media (max-width: 600px) {
    .advantage-item {
      display: block;
      .text-describe {
        font-size: 3vw;
        width: 60%;
      }
      .picture {
        width: 50vw;
        margin: 0 auto;
      }
    }
  }
}

// 图片的响应式变化
@media (min-width: 600px) {
  .lsp-img {
    img {
      width: 32vw;
    }
    :nth-child(2) {
      top: -12vw;
      left: 4vw;
    }
  }

  .debug-img {
    img {
      width: 25vw;
    }
    :nth-child(2) {
      top: -2vw;
      left: -4vw;
    }
  }
}

@media (max-width: 600px) {
  .lsp-img {
    img {
      width: 100%;
    }
    :nth-child(2) {
      top: -20vw;
      left: 4vw;
    }
  }

  .debug-img {
    img {
      width: 100%;
    }
    :nth-child(2) {
      top: -0.5vw;
      left: -4vw;
    }
  }
}
</style>
