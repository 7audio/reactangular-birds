import Vue from 'vue'
import GameOld from './components/GameOld.vue'

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(GameOld) },
}).$mount('#app')
