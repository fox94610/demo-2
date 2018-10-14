export function itemsIsLoading(bool) {
	//console.log("IS LOADING")
	return {
		type: 'ITEMS_IS_LOADING',
		isLoading: bool
	};
}

export function itemsFetchDataSuccess(items) {
	//console.log("ON LOAD COMPLETE")
	return {
		type: 'ITEMS_FETCH_DATA_SUCCESS',
		items
	};
}

export function itemsHasErrored(bool) {
	return {
		type: 'ITEMS_HAS_ERRORED',
		hasErrored: bool
	};
}

export function errorAfterFiveSeconds() {
	// We return a function instead of an action object
	return (dispatch) => {
		setTimeout(() => {
			// This function is able to dispatch other action creators
			dispatch(itemsHasErrored(true));
		}, 5000);
	};
}

export function itemsFetchData(url) {
	return (dispatch) => {
		dispatch(itemsIsLoading(true));
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				dispatch(itemsIsLoading(false));
				return response;
			})
			.then((response) => response.json())
			.then((items) => dispatch(itemsFetchDataSuccess(items)))
			.catch(() => dispatch(itemsHasErrored(true)));
	};
}