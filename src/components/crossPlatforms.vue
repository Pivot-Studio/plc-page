<script setup lang="ts"></script>
<template>
  <div id="advantage">
    <div class="gradient-font title">Cross Platforms</div>

    <div class="advantage-item">
        <font-awesome-icon inverse class="picture" icon="fa-brands fa-apple" size="8x" />
        <font-awesome-icon inverse class="picture" icon="fa-brands fa-windows" size="8x"/>
        <font-awesome-icon inverse class="picture" icon="fa-brands fa-linux" size="8x"/>
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
        margin: 5vw 5vw;
        // height: 30vw;
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
  @media (max-width: 800px) {
    .advantage-item {
        margin: 0 7vw;
      .text-describe {
        font-size: 4vw;
        width: 70%;
      }
      .picture {
        width: 70vw;
        margin: 0 auto;
        transform: scale(0.7);
      }
    }
  }
}
</style>
