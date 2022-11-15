const episodes = {
	state: {
		episodes: [],
	},
	mutations: {
		setEpisodes(state, data) {
			state.episodes = [...data]
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