import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueReactiveCookie from 'vue-reactive-cookie'
import BoostrapVue from 'bootstrap-vue'
import money from 'v-money'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faTimesCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default function (vue) {
  library.add(faCheck, faTimesCircle, faTrashAlt)
  Vue.component('font-awesome-icon', FontAwesomeIcon)
  Vue.use(VueAxios, axios)
  Vue.use(money, {
    decimal: '.',
    thousands: ',',
    prefix: '$ ',
    precision: 2,
    masked: true
  })
  Vue.use(VueReactiveCookie)
  Vue.use(BoostrapVue)
  Vue.config.productionTip = false
}
