import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CameraPage from '../pages/CameraPage';
import QrCodeScanPage from '../pages/QrCodeScanPage';
import VideoPage from '../pages/VideoPage';
import CurrentLocation from '../pages/CurrentLocation';
import Location from '../pages/Location';

const Tab = createMaterialTopTabNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="CameraScreen">
        {/* <Tab.Screen name="CameraScreen" component={CameraPage} /> */}
        {/* <Tab.Screen name="AudioScreen" component={QrCodeScanPage} /> */}
        {/* <Tab.Screen name="VideoScreen" component={VideoPage} /> */}
        <Tab.Screen name="GetLocation" component={CurrentLocation} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
