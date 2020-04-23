import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import Loader from '@/components/app/Loader'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import messagePlugin from '@/utils/message.plagin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader)


firebase.initializeApp({
  apiKey: "AIzaSyCtPJgiXcc_UmU0ZIvoo1-c6PGL1s8xCZw",
  authDomain: "budjet-crm-vue.firebaseapp.com",
  databaseURL: "https://budjet-crm-vue.firebaseio.com",
  projectId: "budjet-crm-vue",
  storageBucket: "budjet-crm-vue.appspot.com",
  messagingSenderId: "854316407590",
  appId: "1:854316407590:web:9d0af57fb071301d5b3fe7"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

