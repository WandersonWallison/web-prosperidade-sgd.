import Vue from 'vue'
import './pollyfills'
import VueRouter from 'vue-router'
import VueRouterPrefetch from 'vue-router-prefetch'
import VueNotify from 'vue-notifyjs'
import VeeValidate, { Validator } from 'vee-validate'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import Element from 'element-ui/lib'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuetify from 'vuetify'
import VueMaterial from 'vue-material'
import VueMoment from 'vue-moment'
import pt from 'vee-validate/dist/locale/pt_BR'

// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import SideBar from './components/UIComponents/SidebarPlugin'
import initProgress from './progressbar'

// router setup
import routes from './routes/routes'

// library imports
// import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import './assets/sass/paper-dashboard.scss'
import './assets/sass/demo.scss'
import 'vue-material/dist/vue-material.min.css'

import sidebarLinks from './sidebarLinks'
import './registerServiceWorker'

Validator.localize('pt',pt)
// import Axios from 'vue-axios'

// plugin setup
Vue.use(VueMaterial)
Vue.use(VueRouter)
Vue.use(VueRouterPrefetch)
Vue.use(GlobalDirectives)
Vue.use(GlobalComponents)
Vue.use(VueNotify)
Vue.use(Vuetify)
Vue.use(SideBar, {sidebarLinks: sidebarLinks})
Vue.use(VeeValidate)
Vue.use(VueAxios, axios)
Vue.use(Element)
Vue.use(VueMoment)
locale.use(lang)

// VeeValidate.locale('pt_BR');

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active',
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
})
initProgress(router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
