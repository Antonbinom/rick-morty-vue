const characters = {
	state: {
		characters: [],
	},
	mutations: {
		setCharacters(state, data) {
			state.characters = []
			state.characters = data
		},
	},
	actions: {
		setCharacters({commit}, data) {
			commit('setCharacters', data)
		},
	},
	getters: {
		getCharacters(store) {
			return store.characters
		},
	},
}

export default characters