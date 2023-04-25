<script lang="ts" setup>
import { Link } from '@/components';
</script>
<template>
  <div class="out-container">
    <div class="container">
      <div class="line">
        <div class="title">Why PL</div>
        <Link href="https://lang.pivotstudio.cn/docs/systemlib/immix.html"><div>immix GC</div></Link>
        <Link href="https://lang.pivotstudio.cn/docs/tutorial/vscsupport.html"><div>VSC Support</div></Link>
        <Link href="https://lang.pivotstudio.cn/docs/references/module.html"><div>Module</div></Link>
      </div>
      <div class="line">
        <div class="title">Get Started</div>
        <Link href="https://lang.pivotstudio.cn/docs/index.html"><div>Documentation</div></Link>
        <Link href="https://lang.pivotstudio.cn/docs/tutorial/index.html"><div>Tutorial</div></Link>
        <Link href="https://lang.pivotstudio.cn/docs/references/index.html"><div>API Reference</div></Link>
      </div>
      <div class="line">
        <div class="title">Resources</div>
        <Link href="https://lang.pivotstudio.cn/docs/blogs/aboutpl.html"><div>Blog</div></Link>
        <Link href="https://lang.pivotstudio.cn/docs/blogs/lsp_and_salsa.html"><div>lsp and salsa</div></Link>
      </div>
      <div class="line">
        <div class="title">Community</div>
        <Link href="https://lang.pivotstudio.cn/docs/CONTRIBUTING-CN.html"><div>Contributor's Guide</div></Link>
        <Link href="https://github.com/Pivot-Studio/pivot-lang/issues"><div>Good First Issue</div></Link>
      </div>
      <div class="line">
        <div class="title">Contact</div>
        <Link href="https://github.com/Pivot-Studio/pivot-lang"><div>Github</div></Link>
        <Link href="https://jq.qq.com/?_wv=1027&k=wcaoBAmg"><div>QQ group</div></Link>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.out-container {
  display: flex;
  justify-content: center;
  background-color: #253443;
  margin-top: 60px;
}
.container {
  max-width: 1200px;
  max-width: 90vw;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .line {
    margin: 40px 0;
    > div {
      margin: 20px;
    }
    .title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 30px;
      background: linear-gradient(180deg, rgba(186, 255, 243, 0) 50.04%, rgba(189, 255, 244, 0.44) 100.09%), linear-gradient(64.57deg, #75fff3 7.22%, #599aff 90.07%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
