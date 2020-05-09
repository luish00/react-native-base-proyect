import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Icon } from 'react-native-elements';
import { Button } from '../common/traking';
import { COLORS } from '../../assets/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    marginBottom: 1,
    paddingLeft: 10,
    paddingRight: 15,
    paddingVertical: 8,
  },

  text: {
    color: COLORS.menuItemText,
    fontFamily: 'sfui-text-regular',
    fontSize: 17,
    letterSpacing: -0.4,
    lineHeight: 20,
    paddingLeft: 8,
  },
});

const MenuItem = ({
  iconType = 'material-community',
  leftIcon,
  onPress,
  name,
  route,
  tagButton,
  tagNavigation,
  navigation,
}) => {
  function handleOnPress() {
    if (onPress && typeof onPress === 'function') {
      onPress();
    }

    if (navigation && route) {
      navigation.tag(tagNavigation).navigate(route);
    }
  }

  return (
    <Button onPress={handleOnPress} tag={tagButton}>
      <View style={styles.container}>
        <Icon name={leftIcon} type={iconType} />

        <Text style={styles.text}>{name}</Text>
      </View>
    </Button>
  );
};

export { MenuItem };
