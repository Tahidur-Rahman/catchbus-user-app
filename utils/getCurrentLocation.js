import * as Location from 'expo-location';

export const getCurrentLocation = async () => {
      
    let { status } = await Location?.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    let {coords:{latitude,longitude}} = await Location?.getCurrentPositionAsync({});
    return {latitude,longitude};
  }
