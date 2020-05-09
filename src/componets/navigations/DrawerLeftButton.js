import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';

const DrawerLeftButton = (props) => {
  const { drawerProps: { navigation } } = props;
  return (
    <TouchableWithoutFeedback onPress={navigation.toggleDrawer}>
      <Icon name="menu" type="material-community" />
    </TouchableWithoutFeedback>
  );
};

export { DrawerLeftButton };
