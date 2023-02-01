import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomOverlay from '../../components/CustomOverlay/CustomOverlay';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useIsFocused} from '@react-navigation/native';

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState('');
  const [visible, setVisible] = useState(false); // Custom Overlay
  const [vfeedback, setVfeedback] = useState([]);
  const [displayfeedback, setDisplayfeedback] = useState('');
  //const [data, setData] = useState('')
  const isFocused = useIsFocused();

  // View feedback
  useEffect(() => {
    if (isFocused) {
      getFeedbacks();
    }
  }, [isFocused]);
  const getFeedbacks = async () => {
    try {
      let userToken = await EncryptedStorage.getItem('userToken');

      const response = await fetch(
        `http://10.115.91.134:5000/feedback/getfeedbacks`,
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
        //console.log(json);
        setVfeedback(json);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // submit feedback
  const onFeedback = async () => {
    try {
      let userToken = await EncryptedStorage.getItem('userToken');
      const body = {
        fb_date: new Date().toLocaleString('en-MY', {
          timeZone: 'Asia/Kuala_Lumpur',
        }),
        // fb_date: date,
        fb_desc: feedback,
      };
      const response = await fetch(
        `http://10.115.91.134:5000/feedback/submitfeedbacks`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: userToken,
          },
          body: JSON.stringify(body),
        },
      );
      if (response.status === 200) {
        console.log('success !');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const Feedback_container = ({feedbackdate, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.containerstyle}>
          <Text style={styles.feedbackdate}>{feedbackdate}</Text>
          <Text style={styles.feedback_view}>View</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView style={styles.feedback_root}>
      <Text style={styles.title_desc}>
        Here you can submit your feedback towards the application like bugs and
        complaints!
      </Text>
      <CustomInput
        placeholder="Enter your desired feedback here:"
        value={feedback}
        setValue={setFeedback}
        multiline={true}
        numberOfLines={10}
        customstyle_input={{
          textAlignVertical: 'top',
        }}
      />
      <View style={styles.feedback_button}>
        <CustomButton
          text="SUBMIT"
          underlayColor="white"
          onPress={() => {
            // insertDate();
            onFeedback();
            alert('Thank you for the feedback!');
          }}
        />
      </View>
      <View style={styles.fbhistory_root}>
        <Text style={styles.feedbackhistory_title}>Feedback History</Text>
        <Text style={styles.title_desc}>
          You can view your feedback history here.
        </Text>
        {vfeedback.map((feedback, index) => (
          <View key={index}>
            <Feedback_container
              feedbackdate={
                new Date(feedback.feedback_date)
                  .toLocaleString('en-MY', {timeZone: 'Asia/Kuala_Lumpur'})
                  .split(',')[0]
              }
              onPress={() => {
                setVisible(!visible);
                setDisplayfeedback(feedback.feedback_description);
              }}
            />
          </View>
        ))}
        <CustomOverlay
          visible={visible}
          togglebackdrop={() => setVisible(!visible)}
          // onPress={}
          overlayContent={
            <View style={styles.fbdesc_root}>
              <Text style={styles.fb_title}>Feedback Description</Text>
              <Text style={styles.fbdesc_text}>{displayfeedback}</Text>
            </View>
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  feedback_root: {
    flex: 1,
    paddingHorizontal: 35,
    backgroundColor: 'rgba(1, 1, 24, 0.83)',
  },
  title_desc: {
    color: 'grey',
    fontSize: 13,
    paddingVertical: 10,
  },
  feedback_button: {
    paddingVertical: 20,
  },
  fbhistory_root: {
    marginVertical: 30,
  },
  feedbackhistory_title: {
    color: 'white',
    fontSize: 20,
  },
  containerstyle: {
    backgroundColor: 'rgba(1, 1, 24, 0.5)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    padding: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  feedbackdate: {
    color: 'white',
  },
  feedback_view: {
    color: 'white',
    position: 'absolute',
    right: 0,
    paddingRight: 10,
    alignSelf: 'center',
  },
  fb_title: {
    color: 'black',
    fontSize: 20,
    paddingVertical: 10,
  },
  fbdesc_root: {
    height: '50%',
    width: '90%',
  },
  fbdesc_text: {
    justifyContent: 'center',
    paddingVertical: 6,
    color: 'black',
  },
});

export default FeedbackScreen;
