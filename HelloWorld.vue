<template>
  <div>
    <p>count is {{ count }}</p>
    <p>plusOne is {{ plusOne }}</p>
    <button @click="increment">count++</button>
  </div>
</template>

<script>
import Vue from 'vue'
import { ref, computed, watch } from '@vue/composition-api'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)

export default {
  setup() {
    const count = ref(0)
    const plusOne = computed(() => count.value + 1)
    const increment = () => { count.value++ }
    // eslint-disable-next-line
    watch(() => count.value * 2, val => console.log(`count * 2 is ${val}`))
    return {
      count,
      plusOne,
      increment
    }
  }
}
</script>