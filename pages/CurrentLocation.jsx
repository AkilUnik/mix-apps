import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {getDistance} from 'geolib';
import Toast from 'react-native-toast-message';

const CurrentLocation = () => {
  const [markers, setMarkers] = useState([]);
  const [location, setlocation] = useState({
    lat: 0,
    lon: 0,
  });

  const handleMapPress = event => {
    const newMarkers = [...markers];
    newMarkers.push({
      id: newMarkers.length + 1,
      coordinate: event.nativeEvent.coordinate,
    });
    setMarkers(newMarkers);
  };

  const [secondPosition, setSecondPosition] = useState({
    latitude: 23.0225,
    longitude: 72.5714,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [firstPosition, setFirstPosition] = useState({
    latitude: location.lat,
    longitude: location.lon,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const markerHandler = cords => {
    setSecondPosition({
      latitude: cords.coordinate.latitude,
      longitude: cords.coordinate.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    setSecondPosition(prev => {
      return {
        latitude: cords.coordinate.latitude,
        longitude: cords.coordinate.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    });
  };

  const findDistance = () => {
    let distance = getDistance(
      {latitude: firstPosition.latitude, longitude: firstPosition.longitude},
      {latitude: secondPosition.latitude, longitude: secondPosition.longitude},
    );
    console.log(typeof distance);
    Toast.show({
      visibilityTime: 2000,
      type: 'success',
      text1: 'Distance is ' + distance.toString() + ' meteres',
    });
  };
  const fetchGeolocation = async () => {
    try {
      if (Platform.OS == 'android') {
        const permissionResult = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        if (permissionResult === 'granted') {
          Geolocation.getCurrentPosition(
            position => {
              setFirstPosition({
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
              setlocation(prev => {
                return {
                  ...prev,
                  lat: position.coords.latitude,
                  lon: position.coords.longitude,
                };
              });
            },
            error => {
              console.log('Error getting geolocation:', error);
            },
          );
        } else {
          console.log('Location permission not granted.');
        }
      } else if (Platform.OS == 'ios') {
        const permissionResult = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );
        if (permissionResult === 'granted') {
          Geolocation.getCurrentPosition(
            position => {
              setlocation(prev => {
                return {
                  ...prev,
                  lat: position.coords.latitude,
                  lon: position.coords.longitude,
                };
              });
            },
            error => {
              console.log('Error getting geolocation:', error);
            },
          );
        } else {
          console.log('Location permission not granted.');
        }
      }
    } catch (error) {
      console.log('Error requesting permission:', error);
    }
  };
  useEffect(() => {
    fetchGeolocation();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          region={{
            latitude: location.lat,
            longitude: location.lon,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          zoomEnabled={true}
          showsMyLocationButton
          userLocationCalloutEnabled
          showsUserLocation
          showsCompass
          followsUserLocation
          onPress={handleMapPress}
          style={{width: '100%', height: '80%'}}>
          {markers.map(marker => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.coordinate.latitude,
                longitude: marker.coordinate.longitude,
              }}
              onPress={() => markerHandler(marker)}
            />
          ))}
          <Polyline
            coordinates={[firstPosition, secondPosition]} //specify our coordinates
            strokeColor={'#000'}
            strokeWidth={3}
            lineDashPattern={[1]}
          />
        </MapView>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            fetchGeolocation();
          }}>
          <Text style={styles.buttonText}>Get current location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={findDistance}>
          <Text style={styles.buttonText}>Get Distance</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    margin: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default CurrentLocation;
