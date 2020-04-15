import React from 'react';
import { Image, StyleSheet, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: 'red',
    height: 30,
    width: 30,
  },
});

const DrawerLeftButton = (props) => {
  const { drawerProps: { navigation } } = props;
  return (
    <TouchableHighlight onPress={navigation.toggleDrawer}>
      <Image style={styles.backButton} />
    </TouchableHighlight>
  );
};

export { DrawerLeftButton };
