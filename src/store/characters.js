const characters = {
	state: {
		characters: [],
		searchValue: '',
		sortValue: ''
	},
	mutations: {
		setCharacters(state, data) {
			state.characters = data
		},
		setSearchValue(state, value) {
			state.searchValue = value
		},
		setSortValue(state, value) {
			state.sortValue = value
		},
	},
	actions: {
		setCharacters({commit}, data) {
			commit('setCharacters', data)
		},
		setSearchValue({commit}, value) {
			commit('setSearchValue', value)
		},
		setSortValue({commit}, value) {
			commit('setSortValue', value)
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