const characters = {
	state: {
		characters: [],
		searchValue: '',
	},
	mutations: {
		setCharacters(state, data) {
			state.characters = [...state.characters, ...data]
		},
		setSearchValue(state, value) {
			state.searchValue = value
		},
	},
	actions: {
		setCharacters({commit}, data) {
			commit('setCharacters', data)
		},
		setSearchValue({commit}, value) {
			commit('setSearchValue', value)
		},
	},
	getters: {
		getCharacters(store) {
			return store.characters.filter(item => item.name.toLowerCase().trim().includes(store.searchValue.toLowerCase().trim()))
		},
		getSearchValue(store) {
			return store.searchValue
		},
	},
}

export default characters