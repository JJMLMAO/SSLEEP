import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState} from 'react';
import {ListItem, Icon} from '@rneui/themed';

const Dropdown_bedtime = () => {
  const [expanded, setExpanded] = useState(false);
  const [bedTime, setBedtime] = useState('Choose your usual bedtime');
  const list_bedtime = [
    {value: '9 - 10(pm)'},
    {value: '10 - 11(pm)'},
    {value: '11(pm) - 12(am)'},
    {value: '12 - 2(am)'},
    {value: '2 - 4(am)'},
    {value: '5(am) or later'},
  ];
  return (
    <View style={styles.dropdown_root}>
      <ListItem.Accordion
        containerStyle={styles.bedtime_container}
        content={
          <>
            <Icon
              name="bedtime"
              type="material"
              size={30}
              style={styles.dropdown_icon}
            />
            <ListItem.Content>
              <ListItem.Title style={styles.bedtime_title}>
                <Text>{bedTime}</Text>
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}>
        {list_bedtime.map((l, i) => (
          <ListItem key={i} containerStyle={styles.dropdown_container}>
            <ListItem.Content>
              <ListItem.Title>
                <Pressable
                  style={styles.dropdown_button}
                  onPress={() => {
                    setBedtime(l.value);
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
  bedtime_container: {
    width: '100%',
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    marginBottom: 0.6,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  bedtime_title: {
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

export default Dropdown_bedtime;
