<template>
  <div class="container" @mouseup="stopDrag">
    <div class="bird" @mousedown="startDrag" :style="birdPosition"/>
    <div class="target" :style="targetPosition" :class="targetClass"/>
  </div>
</template>

<script>
const initialBird = () => ({ x: 199, y: 256 })
const target = { x: 970, y: 263 }

export default {
  data() {
    return {
      dragStart: { x: null, y: null },
      bird: initialBird()
    }
  },
  methods: {
    startDrag(e) {
      this.dragStart.x = e.clientX
      this.dragStart.y = 660 - e.clientY
    },
    stopDrag(e) {
      this.moveBird(this.calculateTrajectory(this.dragStart.x, this.dragStart.y, e.clientX, 660 - e.clientY))
    },
    calculateTrajectory(x1, y1, x2, y2) {
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
    },
    moveBird(trajectory) {
      trajectory.map((position, t) => setTimeout(() => this.bird = position, t * 90))
      setTimeout(this.resetBird, 2800)
    },
    resetBird() {
      this.bird = initialBird()
    }
  },
  computed: {
    birdPosition() {
      return {
        left: this.bird.x + 'px',
        bottom: this.bird.y + 'px'
      }
    },
    targetPosition() {
      return {
        left: target.x + 'px',
        bottom: target.y + 'px'
      }
    },
    isTargetHit() {
      return (this.bird.x >= target.x && this.bird.x <= target.x + 150 && this.bird.y >= target.y - 45 && this.bird.y <= target.y + 132)
    },
    targetClass() {
      return this.isTargetHit ? 'target-hit' : ''
    }
  }
}
</script>

<style>
@import '../assets/style.css';
</style>