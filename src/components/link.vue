<script lang="ts" setup>
import { inject } from 'vue';
const isMobile = inject('isMobile') as boolean;
const isPc = inject('isPc') as boolean;
const props = defineProps({
  newWindow: {
    type: Boolean,
    default: true,
  },
  href: {
    type: String,
    required: true,
  },
  arrowShow: {
    type: Boolean,
    default: true,
  },
});
function navigate() {
  if (props.newWindow) window.open(props.href);
  else window.location.href = props.href;
}
</script>
<template>
  <div class="link" @click="navigate">
    <slot></slot>
    <img v-if="props.arrowShow && isPc" src="../assets/rightArrow.svg" />
  </div>
</template>
<style lang="scss" scoped>
.link {
  cursor: pointer;
  line-height: 28px;
  color: #fff;
  display: flex;
  align-items: center;
  img {
    margin: 0 15px 0 10px;
    width: 12px;
    height: 12px;
    transform: translate(-20px, 3px);
    opacity: 0;
    transition: all 0.4s ease-out;
  }

  &:hover {
    color: #6ea6b7;
    img {
      transform: translate(-6px);
      opacity: 1;
    }
  }
}
</style>
