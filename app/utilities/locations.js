import Exponent from 'exponent';

export function createLocationWatcher() {
  console.log('createLocationWatcher');
  const intervalId = setInterval(() => {
    return getLocationAsync((result) => {
      console.log('*** RESULT', result);
    });
  }, 10000);
  return intervalId;
}

export function removeLocationWatcher(intervalId) {
  clearInterval(intervalId);
}

export async function getLocationAsync(cb) {
  const { Location, Permissions } = Exponent;
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status === 'granted') {
    return Location.getCurrentPositionAsync({ enableHighAccuracy: true })
      .then((result) => {
        console.log('getLocationAsync location', result);
        return cb(result);
      })
      .catch((error) => {
        return error;
      });
  } else {
    throw new Error('Location permission not granted');
  }
}