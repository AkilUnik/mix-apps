import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

const Location = () => {
  useEffect(() => {
    requestLocationPermission();
  }, []);
  const [location, setlocation] = useState({
    lat: 0,
    lon: 0,
  });
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS == 'android') {
        const permissionResult = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        if (permissionResult === 'granted') {
          Geolocation.getCurrentPosition(
            position => {
              console.log(position.coords.latitude);
              console.log(position.coords.longitude);
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

  const getLocation = () => {
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
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <View style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        initialRegion={{
          latitude: 22.3012575,
          longitude: 73.13823,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        region={{
          latitude: location.lat,
          longitude: location.lon,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onRegionChangeComplete={region => console.log(region)}
        zoomEnabled={true}
        showsMyLocationButton
        userLocationCalloutEnabled
        showsUserLocation
        showsCompass
        followsUserLocation
        style={{width: '100%', height: '90%'}}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          requestLocationPermission();
        }}>
        <Text style={styles.buttonText}>Get current location</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Location;

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
