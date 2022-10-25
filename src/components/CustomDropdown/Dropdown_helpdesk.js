import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState} from 'react';
import {ListItem, Icon} from '@rneui/themed';

const Dropdown_helpdesk = ({faq_title, faq_question, faq_answer}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.dropdown_root}>
      <ListItem.Accordion
        containerStyle={styles.helpdeskdrop_container}
        content={
          <>
            <Icon
              name="help"
              type="material"
              size={25}
              color="#83B2E1"
              style={styles.dropdown_icon}
            />
            <ListItem.Content>
              <ListItem.Title style={styles.faq_title}>
                <Text style={styles.faq_text}>FAQ #{faq_title}:</Text>
                <Text style={{color: 'rgba(255, 255, 255, 0.7)', fontSize: 12}}>
                  {'\n' + faq_question}
                </Text>
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}>
        <ListItem containerStyle={styles.dropdown_container}>
          <ListItem.Content>
            <ListItem.Title>
              <Text style={styles.faqdrop_text}>{faq_answer}</Text>
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown_root: {
    padding: 5,
  },
  helpdeskdrop_container: {
    width: '100%',
    marginTop: 5,
    backgroundColor: 'rgba(1, 1, 24, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  faq_title: {
    marginHorizontal: 10,
  },
  dropdown_container: {
    backgroundColor: 'rgba(1, 1, 24, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    //height: 200,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  faqdrop_text: {
    color: 'white',
    fontSize: 12,
  },
  faq_text: {
    color: 'white',
  },
});

export default Dropdown_helpdesk;
