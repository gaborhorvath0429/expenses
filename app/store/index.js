import Vue from 'nativescript-vue';
import Vuex from 'vuex'
const appSettings = require("tns-core-modules/application-settings");

Vue.use(Vuex)

// Load store modules dynamically.
const requireContext = require.context('./modules', true, /.*\.js$/)

const modules = requireContext.keys()
  .map(file =>
    [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
  )
  .reduce((modules, [name, module]) => {
    if (module.namespaced === undefined) {
      module.namespaced = true
    }

    return { ...modules, [name]: module }
  }, {})

var store = new Vuex.Store({
  modules,

  mutations: {
      load(state) {
        if(appSettings.getString("store")) {
            store.replaceState(
                Object.assign(state, JSON.parse(appSettings.getString("store")))
            );
        }
    },
  }
})

export default store;
