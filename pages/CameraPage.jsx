import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
const CameraPage = () => {
  const [photoPath, setPhotoPath] = useState(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef();
  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission =
      await Camera.getMicrophonePermissionStatus();
  };

  const handlePhotoClick = async () => {
    const photo = await camera.current.takePhoto({
      flash: 'on',
    });
    setPhotoPath(photo.path);
  };
  const showToast = () => {
    console.log('entered toast');
    Toast.show({
      type: 'success',
      visibilityTime: 1000,
      text1: 'Photo Saved seuccessfully 👋',
    });
  };
  useEffect(() => {
    checkPermission();
  }, []);

  if (device == null) return <Text>Loading...</Text>;

  return (
    <View style={{flex: 1}}>
      {!photoPath && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          ref={camera}
          photo={true}
        />
      )}

      {!photoPath && (
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={handlePhotoClick}></TouchableOpacity>
      )}

      {photoPath && (
        <View>
          <Image
            source={{uri: 'file://' + photoPath}}
            style={styles.clickedImage}
          />
          <TouchableOpacity onPress={showToast}>
            <AntIcon
              name="download"
              size={40}
              color={'white'}
              style={styles.saveButton}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cameraButton: {
    height: 60,
    width: 60,
    position: 'absolute',
    bottom: 40,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: 'white',
    alignSelf: 'center',
  },
  saveButton: {
    position: 'absolute',
    bottom: 48,
    left: 30,
  },
  clickedImage: {
    width: 'auto',
    height: '100%',
  },
});

export default CameraPage;
