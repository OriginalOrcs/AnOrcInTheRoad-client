const initialState = {
  latitude: 0,
  longitude: 0
}

const geolocation = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_CURRENT_LOCATION':
			return {
				latitude: action.latitude,
        longitude: action.longitude
			}
		default:
			return state;
	}
}

export default geolocation;