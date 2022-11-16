const characters = {
	state: {
		characters: [],
		searchValue: '',
		sortValue: '',
		loading: "loaded"
	},
	mutations: {
		setCharacters(state, data) {
			state.characters = []
			state.characters = data
		},
		setSearchValue(state, value) {
			state.searchValue = value
		},
		setSortValue(state, value) {
			state.sortValue = value
		},
		setLoading(state, value) {
			state.loading = value
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
		setLoading({commit}, value) {
			commit('setLoading', value)
		},
	},
	getters: {
		getCharacters(store) {
			return store.characters.filter(item => item.name.toLowerCase().trim().includes(store.searchValue.toLowerCase().trim())).filter(item => item.status.toLowerCase().includes(store.sortValue.toLowerCase()))
		},
		getSearchValue(store) {
			return store.searchValue
		},
		getLoading(store) {
			return store.searchValue
		},
	},
}

export default characters