import Vue from 'vue'
import GameComposition from './components/GameComposition.vue'

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(GameComposition) },
}).$mount('#app')
