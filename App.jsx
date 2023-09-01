import {View, SafeAreaView} from 'react-native';
import React from 'react';
import AppNavigator from './Navigators/AppNavigator';

import Toast from 'react-native-toast-message';
const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <AppNavigator />
        <Toast />
      </View>
    </SafeAreaView>
  );
};

export default App;
