<!-- loading加载页面 -->
<template>
  <div>
    <van-overlay :show="true">
      <div class="wrapper">
        <div class="block">
          <van-loading size="24px" vertical color="#fff">加载中...</van-loading>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent
} from 'vue'
export default defineComponent({
  setup () {
    return {}
  }
})
</script>
<style scoped lang="less">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  width: 120px;
  height: 120px;
}
</style>
