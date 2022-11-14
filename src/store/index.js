import Vue from "vue";
import Vuex from 'vuex';
import characters from './characters'
import episodes from './episodes'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		characters,
		episodes,
	}
})

export default store