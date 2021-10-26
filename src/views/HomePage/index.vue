<template>
  <el-button @click="actions.incrementIfOddOnRootSum">{{name}}</el-button>
  <div @click="mutations.increment">{{age}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useState } from '@/hook/useState'
import { useMethod } from '@/hook/useMethod'

export default defineComponent({
  name: 'Home',
  setup() {
    const state = useState('HomePage', ['name', 'age'])

    const [actions, mutations] = useMethod('HomePage', [
      'increment',
      'incrementIfOddOnRootSum',
    ])

    return {
      actions,
      mutations,
      ...state,
    }
  },
})
</script>
<style scoped lang="scss">
.home {
  /* prettier-ignore */
  font-size: 30Px;
}
.who {
  font-size: 40px;
}
</style>
