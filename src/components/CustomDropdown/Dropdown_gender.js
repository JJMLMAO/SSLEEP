import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ListItem, Icon} from '@rneui/themed';

const Dropdown_gender = ({gender, setGender}) => {
  const [expanded, setExpanded] = useState(false);

  const list = [{value: 'Male'}, {value: 'Female'}];

  return (
    <View style={styles.dropdown_root}>
      <ListItem.Accordion
        containerStyle={styles.gender_container}
        content={
          <>
            <Icon
              name="gender-male-female"
              type="material-community"
              size={30}
              style={styles.dropdown_icon}
            />
            <ListItem.Content>
              <ListItem.Title style={styles.gender_title}>
                <Text>{gender}</Text>
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}>
        {list.map((l, i) => (
          <ListItem key={i} containerStyle={styles.dropdown_container}>
            <ListItem.Content>
              <ListItem.Title>
                <Pressable
                  style={styles.dropdown_button}
                  onPress={() => {
                    setGender(l.value);
                    setExpanded(false);
                  }}>
                  <Text style={styles.gender_title}>{l.value}</Text>
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
  gender_container: {
    width: '100%',
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    marginBottom: 0.6,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  gender_title: {
    marginHorizontal: 10,
  },
  dropdown_container: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginTop: 0,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  dropdown_button: {},
  gender_title: {
    color: 'black',
  },
  dropdown_icon: {
    paddingHorizontal: 5,
  },
});

export default Dropdown_gender;
