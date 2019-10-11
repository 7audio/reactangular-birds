<template>
  <div class="container" @mouseup="stopDrag">
    <div class="bird" @mousedown="startDrag" :style="birdPosition"/>
    <div class="target" :style="targetPosition"/>
  </div>
</template>

<script>
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import { reactive, watch, computed } from '@vue/composition-api'

Vue.use(VueCompositionApi)

function useCatapult(moveBird) {
  const dragStart = reactive({ x: null, y: null })
  const startDrag = e => {
    dragStart.x = e.clientX
    dragStart.y = 720 - e.clientY
  }
  const stopDrag = e => {
    moveBird(calculateTrajectory(dragStart.x, dragStart.y, e.clientX, 720 - e.clientY))
  }
  const calculateTrajectory = (x1, y1, x2, y2) => {
    let Vx = (x1 - x2)/1.7,
      Vy = (y1 - y2)/1.7,
      result = []
    for (let t = 0; t < 30; t++) {
      result.push({
        y: Vy * t - 9.8 * t * t/2 + y1,
        x: x1 + Vx * t
      })
    }
    return result
  }
  return {
    startDrag,
    stopDrag
  }
}

function useBird() {
  const initialBird = () => ({ x: 229, y: 256 })
  const bird = reactive(initialBird())
  const moveBird = trajectory => {
    trajectory.map(({ x, y }, t) => setTimeout(() => {
      bird.x = x
      bird.y = y
    }, t * 65))
    setTimeout(resetBird, 2000)
  }
  const resetBird = () => {
    bird.x = initialBird().x
    bird.y = initialBird().y
  }
  const birdPosition = computed(() => ({
    left: bird.x + 'px',
    bottom: bird.y + 'px'
  }))
  return {
    bird,
    moveBird,
    resetBird,
    birdPosition
  }
}

function useTarget(bird, winCallback) {
  const target = { x: 1000, y: 263 }
  const targetPosition = computed(() => ({
    left: target.x + 'px',
    bottom: target.y + 'px'
  }))
  watch(() => {
    if (bird.x >= target.x + 25 && bird.x <= target.x + 152 && bird.y >= target.y - 45 && bird.y <= target.y + 132) {
      winCallback()
      alert("you win!")
    }
  })
  return { targetPosition }
}

export default {
  setup() {
    const { bird, moveBird, resetBird, birdPosition } = useBird()
    return {
      birdPosition,
      ...useCatapult(moveBird),
      ...useTarget(bird, resetBird)
    }
  }
}
</script>

<style>
@import './assets/style.css';
</style>