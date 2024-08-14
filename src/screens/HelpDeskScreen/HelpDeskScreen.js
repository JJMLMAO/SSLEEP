import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Dropdown_helpdesk from '../../components/CustomDropdown/Dropdown_helpdesk';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useEffect} from 'react';
import {BASE_URL} from '../../config';

const HelpDeskScreen = () => {
  const [faq_title, setFaq_title] = useState('');
  const [faq_question, setFaq_question] = useState('');
  const [faq_answer, setFaq_answer] = useState('');
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    getFaqdata();
  }, []);

  // get faq data
  const getFaqdata = async () => {
    try {
      const response = await fetch(`${BASE_URL}/faq/getFaqs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        console.log('read successful');
        const json = await response.json();
        setFaqData(json);
        // console.log(json);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <ScrollView style={styles.helpdesk_root}>
      <Text style={styles.title_desc}>
        Here are the FAQs that may help you in navigating in this application.
      </Text>
      <View style={styles.helpdesk_innercontainer}>
        {faqData.map((faq, index) => {
          return (
            <Dropdown_helpdesk
              key={index}
              faq_title={faq.faq_id}
              faq_question={faq.faq_question}
              faq_answer={faq.faq_answer}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  helpdesk_root: {
    flex: 1,
    paddingHorizontal: 35,
    backgroundColor: 'rgba(1, 1, 24, 0.83)',
  },
  title_desc: {
    color: 'grey',
    fontSize: 13,
    padding: 10,
  },
  helpdesk_innercontainer: {},
});

export default HelpDeskScreen;
