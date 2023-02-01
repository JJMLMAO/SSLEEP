import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState} from 'react';
import {ListItem, Icon} from '@rneui/themed';

const Dropdown_hoursSlept = ({hoursSlept, sethoursSlept}) => {
  const [expanded, setExpanded] = useState(false);

  const list_hoursSlept = [
    {value: 'less than 4 hours'},
    {value: '5 hours'},
    {value: '6 hours'},
    {value: '7 hours'},
    {value: '8 hours or more'},
  ];
  return (
    <View style={styles.dropdown_root}>
      <ListItem.Accordion
        containerStyle={styles.hoursSlept_container}
        content={
          <>
            <Icon
              name="king-bed"
              type="material"
              size={30}
              style={styles.dropdown_icon}
            />
            <ListItem.Content>
              <ListItem.Title style={styles.hoursSlept_title}>
                <Text>{hoursSlept}</Text>
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}>
        {list_hoursSlept.map((l, i) => (
          <ListItem key={i} containerStyle={styles.dropdown_container}>
            <ListItem.Content>
              <ListItem.Title>
                <Pressable
                  style={styles.dropdown_button}
                  onPress={() => {
                    sethoursSlept(l.value);
                    setExpanded(false);
                  }}>
                  <Text>{l.value}</Text>
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

const styles = StyleSheet.create({
  dropdown_root: {
    padding: 5,
  },
  hoursSlept_container: {
    width: '100%',
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    marginBottom: 0.6,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  hoursSlept_title: {
    marginHorizontal: 10,
    color: 'black',
  },
  dropdown_container: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginTop: 0,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  dropdown_button: {},
  dropdown_icon: {
    paddingHorizontal: 5,
  },
});

export default Dropdown_hoursSlept;
