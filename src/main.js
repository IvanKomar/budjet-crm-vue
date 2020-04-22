import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import Vuelidate from 'vuelidate'
import messagePalgin from '@/utils/message.plagin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
Vue.config.productionTip = false

Vue.filter('date', dateFilter)
Vue.use(Vuelidate)
Vue.use(messagePalgin)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
