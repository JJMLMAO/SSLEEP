import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import Dropdown_helpdesk from '../../components/CustomDropdown/Dropdown_helpdesk';

const HelpDeskScreen = () => {
  faq_arr = [
    {
      title: '1',
      question: 'How do I access my camera while using this application',
      answer: 'just open bro lmao',
    },
    {title: '2', question: 'b', answer: 'catgo'},
    {title: '3', question: 'c', answer: 'squid'},
    {title: '4', question: 'd', answer: 'kerang'},
    {title: '5', question: 'e', answer: 'oyster'},
    {title: '6', question: 'f', answer: 'beef'},
  ];
  return (
    <ScrollView style={styles.helpdesk_root}>
      <Text style={styles.title_desc}>
        Here are the FAQs that may help you in navigating in this application.
      </Text>
      <View style={styles.helpdesk_innercontainer}>
        {faq_arr.map((item, index) => {
          return (
            <Dropdown_helpdesk
              key={index}
              faq_title={item.title}
              faq_question={item.question}
              faq_answer={item.answer}
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
