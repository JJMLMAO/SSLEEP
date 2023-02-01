import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState} from 'react';
import {ListItem} from '@rneui/themed';
import {ListItemTitle} from '@rneui/base/dist/ListItem/ListItem.Title';
import {color} from '@rneui/base';

const Dropdown_bookmed = ({
  bookmed_date,
  bookmed_time,
  bookmed_DOC,
  bookmed_status,
  bookmed_details,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.dropdown_root}>
      <ListItem.Accordion
        containerStyle={styles.bookmeddrop_container}
        content={
          <>
            <ListItem.Content>
              <ListItem.Title style={styles.month_title}>
                <Text style={styles.month_text}>{bookmed_date}</Text>
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
            <ListItemTitle>
              <Text style={styles.bookmeddrop_text}>Time: {bookmed_time}</Text>
            </ListItemTitle>
            <ListItemTitle>
              <Text style={styles.bookmeddrop_text}>
                Doc in Charge: {bookmed_DOC}
              </Text>
            </ListItemTitle>
            <ListItemTitle>
              <Text style={styles.bookmeddrop_text}>
                Status: {bookmed_status}
              </Text>
            </ListItemTitle>
            <ListItemTitle>
              <Text style={styles.bookmeddrop_text}>
                Details: {bookmed_details}
              </Text>
            </ListItemTitle>
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
  bookmeddrop_container: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 5,
    backgroundColor: 'rgba(131, 178, 225, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(1, 1, 1, 0.5)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  month_title: {
    marginHorizontal: 10,
  },
  dropdown_container: {
    backgroundColor: 'rgba(131, 178, 225, 0.8)',
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(1, 1, 255, 0.5)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  bookmeddrop_text: {
    color: 'black',
    fontSize: 12,
  },
  month_text: {
    color: 'black',
  },
});

export default Dropdown_bookmed;
