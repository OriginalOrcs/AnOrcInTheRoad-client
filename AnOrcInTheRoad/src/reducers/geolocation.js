const geolocation = (state = {}, action) => {
	switch (action.type) {
		case 'SET_CURRENT_LOCATION':
			return {
				id: action.id,
				coordinates: action.coodinates
			}
		default:
			return state;
	}
}

export default geolocation;