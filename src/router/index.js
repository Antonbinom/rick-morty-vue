import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView'
import CharacterView from '@/views/CharacterView'
import EpisodeView from '@/views/EpisodeView'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: [
		{path: '/', component: HomeView},
		{path: '/character/:id', component: CharacterView},
		{path: '/episode/:id', component: EpisodeView},
	],
})

export default router