import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState} from 'react';
import {ListItem} from '@rneui/themed';

const Dropdown_hours = ({hours, setHours}) => {
  const [expanded, setExpanded] = useState(false);
  const hourList = [
    {hour_value: '1'},
    {hour_value: '2'},
    {hour_value: '3'},
    {hour_value: '4'},
    {hour_value: '5'},
    {hour_value: '6'},
    {hour_value: '7'},
    {hour_value: '8'},
    {hour_value: '9'},
    {hour_value: '10'},
    {hour_value: '11'},
    {hour_value: '12'},
  ];

  return (
    <View style={styles.dropdown_root}>
      <ListItem.Accordion
        containerStyle={styles.bedtime_container}
        content={
          <>
            <ListItem.Content>
              <ListItem.Title style={styles.bedtime_title}>
                <Text>{hours}</Text>
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}>
        {hourList.map((l, i) => (
          <ListItem key={i} containerStyle={styles.dropdown_container}>
            <ListItem.Content>
              <ListItem.Title>
                <Pressable
                  style={styles.dropdown_button}
                  onPress={() => {
                    setHours(l.hour_value);
                    setExpanded(false);
                  }}>
                  <Text style={styles.gender_title}>{l.hour_value}</Text>
                </Pressable>
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </ListItem.Accordion>
    </View>
  );
};

export default Dropdown_hours;

const styles = StyleSheet.create({
  dropdown_root: {
    padding: 5,
  },
  bedtime_container: {
    width: '100%',
    marginTop: 10,
    backgroundColor: 'rgba(1, 1, 24, 1)',
    marginBottom: 0.6,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  bedtime_title: {
    color: 'white',
    fontSize: 13,
  },
  dropdown_container: {
    backgroundColor: 'rgba(1, 1, 24, 1)',
    marginTop: 0,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  dropdown_button: {},
  gender_title: {
    color: 'white',
  },
  dropdown_icon: {
    paddingHorizontal: 5,
  },
});
