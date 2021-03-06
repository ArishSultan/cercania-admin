import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './firebase'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'

/// include styles
import './assets/styles/style.sass'
import './assets/styles/vuetify-overloads.sass'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
