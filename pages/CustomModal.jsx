import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const width = Dimensions.get('screen').width;
console.log(width);
const CustomModal = ({isModalVisible, setModalVisible}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.heading1}>Complete your payment</Text>
        <Text style={styles.heading2}>Confirm your order</Text>
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              setModalVisible(!isModalVisible);
              Toast.show({
                text1: 'Order not placed',
                type: 'error',
              });
            }}>
            <Text style={styles.text}>Cancel Order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
              setModalVisible(!isModalVisible);
              Toast.show({
                text1: 'Order places Successfully',
                visibilityTime: 800,
              });
            }}>
            <Text style={styles.text}>Confirm Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  wrapper: {
    borderRadius: 10,
    padding: RFValue(12),
    backgroundColor: 'white',
    paddingHorizontal: RFValue(16),
  },
  heading1: {
    fontSize: RFValue(20),
    color: 'black',
    marginBottom: 7,
    fontWeight: 'bold',
  },
  heading2: {
    fontSize: RFValue(14),
    color: 'black',
    marginBottom: 7,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    gap: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
    width: '45%',
  },
  confirmButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'green',
    width: '45%',
  },
  text: {
    fontSize: RFValue(12),
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default CustomModal;
