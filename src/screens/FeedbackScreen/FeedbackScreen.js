import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState('');

  return (
    <ScrollView style={styles.feedback_root}>
      <Text style={styles.title_desc}>
        Here you can submit your feedback towards the application like bugs and
        complaints!
      </Text>
      <View>
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
            onPress={() => alert('Thank you for the feedback!')}
          />
        </View>
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
    padding: 10,
  },
  feedback_button: {
    paddingVertical: 20,
  },
});

export default FeedbackScreen;
