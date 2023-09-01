import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CameraPage from '../pages/CameraPage';
import QrCodeScanPage from '../pages/QrCodeScanPage';
import VideoPage from '../pages/VideoPage';
import CurrentLocation from '../pages/CurrentLocation';
import Location from '../pages/Location';
import ModalsPage from '../pages/ModalsPage';
import Forms from '../pages/Forms';

const Tab = createMaterialTopTabNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Form">
        {/* <Tab.Screen name="CameraScreen" component={CameraPage} /> */}
        {/* <Tab.Screen name="AudioScreen" component={QrCodeScanPage} /> */}
        {/* <Tab.Screen name="VideoScreen" component={VideoPage} /> */}
        {/* <Tab.Screen name="GetLocation" component={CurrentLocation} /> */}
        <Tab.Screen name="Modals" component={ModalsPage} />
        <Tab.Screen name="Form" component={Forms} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
