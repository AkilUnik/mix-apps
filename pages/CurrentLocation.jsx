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
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
const CurrentLocation = () => {
  const [location, setlocation] = useState({
    lat: 0,
    lon: 0,
  });
  console.log(location);
  const fetchGeolocation = async () => {
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
          style={{width: '100%', height: '90%'}}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            fetchGeolocation();
          }}>
          <Text style={styles.buttonText}>Get current location</Text>
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
