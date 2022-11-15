import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './assets/scss/style.scss'
import VueObserveVisibility from "vue-observe-visibility";

Vue.config.productionTip = false


Vue.use(VueObserveVisibility);
new Vue({
	store,
	router,
	render: h => h(App),
}).$mount('#app')
