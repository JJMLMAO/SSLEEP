import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Icon} from '@rneui/base';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import EncryptedStorage from 'react-native-encrypted-storage';
import {BASE_URL} from '../../config';

const CreateLogsScreen = ({navigation}) => {
  const [logContent, setLogContent] = useState('');

  // submit diary
  const onSubmitDiary = async () => {
    try {
      let userToken = await EncryptedStorage.getItem('userToken');
      const body = {
        d_date: String(
          new Date().toLocaleDateString('en-MY', {
            timeZone: 'Asia/Kuala_Lumpur',
          }),
        ),
        d_time: String(
          new Date().toLocaleTimeString('en-MY', {
            timeZone: 'Asia/Kuala_Lumpur',
          }),
        ),
        d_description: logContent,
      };
      const response = await fetch(`${BASE_URL}/diary/submitdiary`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token: userToken,
        },
        body: JSON.stringify(body),
      });
      if (response.status === 200) {
        console.log('success !');
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <ScrollView style={styles.createlogs_root}>
      <View style={styles.createlogs_header}>
        <Text style={styles.createlogs_title}>Create Log</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            name="x"
            type="octicon"
            size={30}
            color="#83B2E1"
            style={{
              flexDirection: 'row',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.logContainer}>
        <CustomInput
          value={logContent}
          setValue={setLogContent}
          //onChangeText={setLogContent}
          placeholder="Insert your logs here."
          placeholderTextColor={'#FFFFFF'}
          multiline={true}
          numberOfLines={25}
          customstyle_input={{
            textAlignVertical: 'top',
            backgroundColor: 'rgba(1, 1, 24, 0.83)',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.6)',
            color: 'white',
          }}
        />
      </View>
      <View style={styles.button_root}>
        <CustomButton
          text="CREATE"
          onPress={() => {
            onSubmitDiary();
            alert('Your diary is created.');
          }}
        />
      </View>
    </ScrollView>
  );
};

export default CreateLogsScreen;

const styles = StyleSheet.create({
  createlogs_root: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(1, 1, 24, 0.83)',
  },
  createlogs_header: {
    marginVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createlogs_title: {
    color: 'white',
    fontSize: 26,
  },
  logContainer: {
    color: 'white',
    paddingTop: 25,
  },
  button_root: {
    paddingTop: 30,
  },
});
