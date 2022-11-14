const episodes = {
	state: {
		episodes: [],
	},
	mutations: {
		setEpisodes(state, data) {
			state.episodes = [...state.episodes, ...data]
			console.log(state.episodes);
		}
	},
	actions: {
		setEpisodes({commit}, data) {
			commit('setEpisodes', data)
		}
	},
	getters: {
		getEpisodes(store) {
			return store.episodes
		}
	},
}

export default episodes