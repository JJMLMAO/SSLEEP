import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState} from 'react';
import {ListItem} from '@rneui/themed';

const BottomSheet_day = ({day, setDay}) => {
  const [expanded, setExpanded] = useState(false);
  const dayList = [
    {day_value: 'Mon'},
    {day_value: 'Tues'},
    {day_value: 'Wed'},
    {day_value: 'Thurs'},
    {day_value: 'Fri'},
    {day_value: 'Sat'},
    {day_value: 'Sun'},
  ];

  return (
    <View style={styles.dropdown_root}>
      <ListItem.Accordion
        containerStyle={styles.bedtime_container}
        content={
          <>
            <ListItem.Content>
              <ListItem.Title style={styles.bedtime_title}>
                <Text>{day}</Text>
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}>
        {dayList.map((l, i) => (
          <ListItem key={i} containerStyle={styles.dropdown_container}>
            <ListItem.Content>
              <ListItem.Title>
                <Pressable
                  style={styles.dropdown_button}
                  onPress={() => {
                    setDay(l.day_value);
                    setExpanded(false);
                  }}>
                  <Text style={styles.gender_title}>{l.day_value}</Text>
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

export default BottomSheet_day;

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
