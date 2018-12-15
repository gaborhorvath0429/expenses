import Vue from 'nativescript-vue'
import App from './components/App'
import store from './store'
import VueDevtools from 'nativescript-vue-devtools'
import RadChartPlugin from 'nativescript-ui-chart/vue';
Vue.use(RadChartPlugin);

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
Vue.config.devtools = true;

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
