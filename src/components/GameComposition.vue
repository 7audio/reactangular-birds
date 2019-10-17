<template>
  <div class="container" @mouseup="stopDrag">
    <div class="bird" @mousedown="startDrag" :style="birdPosition"/>
    <div class="target" :style="targetPosition" :class="targetClass"/>
  </div>
</template>

<script>
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import { reactive, computed } from '@vue/composition-api'

Vue.use(VueCompositionApi)

function useBird() {
  const initialBird = () => ({ x: 199, y: 256 })
  const bird = reactive(initialBird())
  const moveBird = trajectory => {
    trajectory.map(({ x, y }, t) => setTimeout(() => {
      bird.x = x
      bird.y = y
    }, t * 90))
    setTimeout(resetBird, 2800)
  }
  const resetBird = () => Object.assign(bird, initialBird())
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

function useCatapult(moveBird) {
  const dragStart = reactive({ x: null, y: null })
  const startDrag = e => {
    dragStart.x = e.clientX
    dragStart.y = 660 - e.clientY
  }
  const stopDrag = e => {
    moveBird(calculateTrajectory(dragStart.x, dragStart.y, e.clientX, 660 - e.clientY))
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

function useTarget(bird) {
  const target = { x: 970, y: 263 }
  const isTargetHit = computed(() => bird.x >= target.x && bird.x <= target.x + 150 && bird.y >= target.y - 45 && bird.y <= target.y + 132)
  const targetPosition = computed(() => ({
    left: target.x + 'px',
    bottom: target.y + 'px'
  }))
  const targetClass = computed(() => isTargetHit.value ? 'target-hit' : '')
  return { targetPosition, targetClass }
}

export default {
  setup() {
    const { bird, moveBird, resetBird, birdPosition } = useBird()
    return {
      birdPosition,
      ...useCatapult(moveBird),
      ...useTarget(bird)
    }
  }
}
</script>

<style>
@import '../assets/style.css';
</style>