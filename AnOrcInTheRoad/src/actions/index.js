let nextTodoId = 0;

export const setCurrentLocation = (coordinates) => {
	return {
		type: 'SET_CURRENT_LOCATION',
		latitude: coordinates.latitude,
    longitude: coordinates.longitude
	}
}