<template>
  <el-button @click="actions.increment">{{name}}</el-button>
  <div @click="mutations.incrementAge">age:{{age}}</div>
  <div @click="rootMutations.updateContent">content:{{content}}</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useState } from '@/hook/useState'
import { useMethod } from '@/hook/useMethod'
import { useGetter } from "@/hook/useGetter"

export default defineComponent({
  name: 'Home',
  setup() {

    const state = useState('HomePage', ['name', 'age']);

    const rootState = useState(['content']);

    const getters = useGetter('HomePage',["getName"]);

    const [actions, mutations] = useMethod('HomePage', [
      'increment',
      'incrementAge',
    ])

     const [rootActions, rootMutations] = useMethod([
      'updateContent',
      'update',
    ])

    return {
      actions,
      mutations,
      ...state,
      ...rootState,
      ...getters,
      rootActions,
      rootMutations
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
