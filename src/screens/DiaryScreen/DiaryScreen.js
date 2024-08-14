import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Icon, Button} from '@rneui/base';

import CustomScreenHeader from '../../components/CustomScreenHeader/CustomScreenHeader';
import CustomOverlay from '../../components/CustomOverlay/CustomOverlay';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useIsFocused} from '@react-navigation/native';
import {BASE_URL} from '../../config';

const DiaryScreen = ({navigation}) => {
  const [visible, setVisible] = useState(false); // Custom Overlay
  const [showdateContainer, setShowdateContainer] = useState(false); // to show date
  const [diarycontent, setDiarycontent] = useState([]);
  // const [vdiary, setVdiary] = useState([]);
  const [diaryMonth, setDiaryMonth] = useState([]); // to manage the month of created diaries
  const [diaryDate, setDiaryDate] = useState([]); // to manage the date of created diaries
  const isFocused = useIsFocused();

  //view logs
  useEffect(() => {
    if (isFocused) {
      getDiaryMonth();
      getDiaryDate();
      getDiaryContent();
    }
  }, [isFocused]);

  //get the month of the created diary

  const getDiaryMonth = async () => {
    try {
      let userToken = await EncryptedStorage.getItem('userToken');
      const response = await fetch(`${BASE_URL}/diary/getMonth`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: userToken,
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        setDiaryMonth(json);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // get diary date
  const getDiaryDate = async () => {
    try {
      let userToken = await EncryptedStorage.getItem('userToken');
      const response = await fetch(`http://192.168.0.10:5000/diary/getDate`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: userToken,
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        setDiaryDate(json);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // get diary content
  const getDiaryContent = async () => {
    try {
      let userToken = await EncryptedStorage.getItem('userToken');
      const response = await fetch(
        `http://192.168.0.10:5000/diary/getDescription`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: userToken,
          },
        },
      );
      if (response.status === 200) {
        const json = await response.json();
        setDiarycontent(json);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const DiaryContentContainer = ({month_number, log_date, onPressContent}) => {
    return (
      <View style={styles.diarycontent_style}>
        {/* {console.log(month_number)} */}
        <TouchableOpacity onPress={onPressContent}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'white',
                marginHorizontal: 10,
                paddingVertical: 6,
              }}>
              {log_date}
            </Text>
            <View
              style={{
                alignSelf: 'center',
              }}>
              <Icon
                name="chevron-right"
                type="material=community"
                size={20}
                color="white"
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const DiaryContainer = ({
    diarycontainer_title,
    diarycontainer_sub,
    onPress,
  }) => {
    return (
      <View style={styles.diarycontainer_style}>
        <TouchableOpacity onPress={onPress}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              marginHorizontal: 10,
              paddingVertical: 6,
            }}>
            {diarycontainer_title}
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 12,
              marginHorizontal: 10,
              paddingVertical: 6,
            }}>
            {diarycontainer_sub}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const MyLogsContainer = ({
    mylogscontainer_title,
    onPress,
    mylogsicon_name,
    mylogsicon_type,
    mylogsicon_size,
    mylogsicon_style,
    // datevisible,
    month_number,
  }) => {
    const [expand, setExpand] = useState(false);
    return (
      <>
        <View style={styles.mylogscontainer_root}>
          <TouchableOpacity onPress={() => setExpand(!expand)}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  marginHorizontal: 10,
                  paddingVertical: 6,
                  textAlignVertical: 'center',
                  // textAlign: 'center',
                }}>
                {mylogscontainer_title}
              </Text>
              <View
                style={{
                  alignSelf: 'center',
                }}>
                <Icon
                  name={mylogsicon_name}
                  type={mylogsicon_type}
                  size={mylogsicon_size}
                  color="white"
                  style={mylogsicon_style}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {expand && (
          <DiaryContentContainer
            month_number={month_number}
            log_date="date"
            onPressContent={() => {
              setVisible(!visible);
            }}
          />
        )}
      </>
    );
  };

  return (
    <ScrollView style={styles.diary_root}>
      <CustomScreenHeader
        header_title="Diary"
        onPress={
          (onPress = () => {
            navigation.goBack();
          })
        }
      />
      <DiaryContainer
        diarycontainer_title="Create a Log"
        diarycontainer_sub="Describe your sleeping experience in this log!"
        onPress={() => navigation.navigate('CreateLogs')}
      />
      <View>
        <View style={styles.mylogs_root}>
          <Text style={styles.mylogs_title}>My Logs</Text>
          {/* {diaryMonth.map((month, index) => (
            <View key={index}>
              <MyLogsContainer
                mylogscontainer_title={month.month_name}
                month_number={month.month_number}
                onPress={() => {
                  setShowdateContainer(!showdateContainer);
                  // handleDateContainers();
                }}
                mylogsicon_name="chevron-down"
                mylogsicon_type="material-community"
                mylogsicon_size={20}
                mylogsicon_style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                }}
              />
            </View>
          ))} */}

          {diaryDate.map((Ddate, index) => (
            <View key={index}>
              <DiaryContentContainer
                log_date={Ddate.date}
                onPressContent={() => {
                  setVisible(!visible);
                  // getDiaryContent(Ddate.date);
                  setDiarycontent(Ddate.desc);
                }}
              />
            </View>
          ))}
        </View>

        <CustomOverlay
          visible={visible}
          togglebackdrop={() => setVisible(!visible)}
          overlayStyle={{
            height: 300,
            width: 500,
          }}
          overlayContent={
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 20,
                height: 600,
                width: 300,
              }}>
              <Text style={{color: 'black', fontSize: 18}}>Your Sleep Log</Text>
              <Text
                style={{
                  marginVertical: 20,
                }}>
                {diarycontent}
              </Text>
            </View>
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  diary_root: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(1, 1, 24, 0.83)',
  },
  diary_title: {
    color: 'white',
    fontSize: 35,
  },
  diarycontainer_style: {
    backgroundColor: 'rgba(1, 1, 24, 1)',
    color: 'white',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 10,
    marginVertical: 15,
  },
  mylogs_title: {
    color: 'white',
    fontSize: 23,
    paddingBottom: 20,
  },
  mylogscontainer_root: {
    backgroundColor: 'rgba(1, 1, 24, 1)',
    color: 'white',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderRadius: 6,
    // paddingVertical: 10,
    // height: 60,
    //marginVertical: 15,
  },
  diarycontent_style: {
    backgroundColor: 'rgba(1, 1, 24, 1)',
    color: 'white',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 10,
    // marginVertical: 15,
  },
});

export default DiaryScreen;
