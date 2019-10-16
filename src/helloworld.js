import Vue from 'vue'
import HelloWorld from './components/HelloWorld.vue'

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(HelloWorld) },
}).$mount('#app')
