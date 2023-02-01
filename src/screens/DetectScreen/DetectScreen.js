import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import CustomScreenHeader from '../../components/CustomScreenHeader/CustomScreenHeader';
import CustomOverlay from '../../components/CustomOverlay/CustomOverlay';
import CustomButton from '../../components/CustomButton/CustomButton';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Tflite from 'tflite-react-native';
import {response} from 'express';
import RNFS from 'react-native-fs';

const DetectScreen = ({navigation}) => {
  const [visible, setVisible] = useState(true); // Overlay
  const [imageUri, setImageUri] = useState('');
  const [detectImage, setdetectImage] = useState('');

  let tflite = new Tflite();
  tflite.loadModel(
    {
      model: 'model_unquant.tflite',
      labels: 'labels.txt',
      numThreads: 1,
    },
    (err, res) => {
      if (err) console.log(err);
      else console.log(res);
    },
  );

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openCamera = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 200,
      maxHeight: 200,
      cameraType: 'front',
      includeBase64: true,
      saveToPhotos: true,
      //path: 'image',
    };
    try {
      await launchCamera(options, res => {
        // if (response && !response.didCancel) {
        //   setImageUri(response.assets[0].base64);
        //   setdetectImage(response.assets[0].uri);
        // } else if (response.error) {
        //   console.log('Image Picker error: ', response.error);
        // }
        // console.log('test1');
        if (res.didCancel) {
          console.log('User has cancelled image picker');
        } else if (res.error) {
          console.log('Image Picker error: ', res.error);
        } else {
          console.log(res.assets);
          setImageUri(res.assets[0].base64);
          setdetectImage(res.assets[0].uri);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const openGallery = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      saveToPhotos: true,
      maxWidth: 200,
      maxHeight: 200,
      cameraType: 'front',
    };
    try {
      await launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User has cancelled image library');
        } else if (response.error) {
          console.log('Image Library error: ', response.error);
        } else {
          setImageUri(response.assets[0].base64);
          setdetectImage(response.assets[0].uri);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.detect_root}>
      <CustomScreenHeader
        header_title="Detect"
        onPress={
          (onPress = () => {
            navigation.goBack();
          })
        }
      />
      <CustomOverlay
        visible={visible}
        togglebackdrop={() => setVisible(visible)}
        overlayContent={
          <View style={styles.detectoverlay_root}>
            <Text style={styles.overlay_title}>Important Information</Text>
            <Text style={styles.overlay_text}>
              This feature is only workable if:{`\n\n`}- You are not in a
              medium-light room.{`\n`}- There is only ONE face in the camera.
              {`\n`}- You just get out of bed.{`\n`}
              {`\n`}
              Click on the button below to proceed.
            </Text>
            <CustomButton
              text="I UNDERSTAND"
              underlayColor="black"
              onPress={
                (onPress = () => {
                  setVisible(false);
                })
              }
              customStyle={{
                borderWidth: 1,
                borderColor: 'black',
                paddingTop: 10,
                backgroundColor: 'rgba(1, 1, 24, 0.83)',
              }}
              buttonView={{
                paddingTop: 20,
              }}
            />
          </View>
        }
      />
      <ScrollView contentContainerStyle={{justifyContent: 'center', flex: 1}}>
        <Text
          style={{
            color: 'white',
            paddingVertical: 10,
            textAlign: 'center',
            marginVertical: 30,
          }}>
          Please ensure you are NOT in a dark room.{`\n`}
          Click on the button below to begin.
        </Text>
        {/* <CustomButton
          text="Open Camera"
          onPress={
            (onPress = () => {
              requestCameraPermission();
              openCamera();
            })
          }
        />
        <Text
          style={{color: 'white', alignSelf: 'center', paddingVertical: 10}}>
          OR
        </Text> */}

        <CustomButton
          text="Choose From Gallery"
          onPress={
            (onPress = () => {
              requestCameraPermission();
              openGallery();
            })
          }
        />
        <Image
          source={{uri: `data:image/png;base64,${imageUri}`}}
          style={{
            height: 200,
            width: 200,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: 'black',
            marginVertical: 20,
            alignSelf: 'center',
          }}
          resizeMode="contain"
        />

        <CustomButton
          text="Detect!"
          onPress={
            (onPress = () => {
              tflite.runModelOnImage(
                {
                  path: detectImage,
                  imageMean: 128.0, // defaults to 127.5
                  imageStd: 128.0, // defaults to 127.5
                  numResults: 3, // defaults to 5
                  threshold: 0.05, // defaults to 0.1
                },
                (err, res) => {
                  if (err) console.log(err);
                  else
                    console.log(
                      'Sleep deprivation status: ' + res[0].label.split(' ')[1],
                    );
                  Alert.alert(
                    'Sleep deprivation status: \n' +
                      (res[0].label.split(' ')[0] === '0'
                        ? 'Sleep Deprived'
                        : 'Not Sleep Deprived'),
                  );
                },
              );
            })
          }
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  detect_root: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(1, 1, 24, 0.83)',
  },
  detect_title: {
    color: 'white',
    fontSize: 35,
  },
  detectoverlay_root: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10,
  },
  overlay_title: {
    color: 'black',
    fontSize: 25,
  },
  overlay_text: {
    marginVertical: 10,
    color: 'black',
  },
});

export default DetectScreen;
