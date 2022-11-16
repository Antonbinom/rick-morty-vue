import Vue from "vue";
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'

import characters from './characters'
import episodes from './episodes'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
	storage: window.localStorage
})

const store = new Vuex.Store({
	modules: {
		characters,
		episodes,
	},
	plugins: [vuexLocal.plugin]
})

export default store