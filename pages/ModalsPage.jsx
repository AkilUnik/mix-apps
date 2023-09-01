import {View, SafeAreaView, Button} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import CustomModal from './CustomModal';
import {RFValue} from 'react-native-responsive-fontsize';
const ModalsPage = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button title="Click to show modal" onPress={toggleModal} />
        <Modal
          //   style={{borderWidth: 4}}
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          animationIn={'slideInUp'}
          animationInTiming={400}>
          <CustomModal
            setModalVisible={setModalVisible}
            isModalVisible={isModalVisible}
          />
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default ModalsPage;
