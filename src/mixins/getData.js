import axios from "axios";

export const getData = (url, action, store) => {
	axios.get(url).then((response) => {
		store.dispatch(action, response.data.results);
		if (response.data.info.next !== null) {
			getData(response.data.info.next);
		}
	});
}
