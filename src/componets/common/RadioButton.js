import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { Button } from './traking';
import { COLORS } from '../../assets/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 35,
    justifyContent: 'flex-start',
  },

  disabledColor: {
    color: COLORS.gray,
  },

  radioIcon: {
    marginRight: 8,
  },
});

const RadioButton = ({
  checked,
  checkedColor = COLORS.secondaryColor,
  checkedIcon = 'radio-button-checked',
  disabled,
  label,
  onPress,
  tag,
  typeIcon = 'material-icons',
  uncheckedIcon = 'radio-button-unchecked',
}) => {
  function iconColor() {
    if (disabled) {
      return COLORS.gray;
    }

    return checked ? checkedColor : COLORS.unSelected;
  }

  return (
    <Button disabled={disabled} onPress={onPress} tag={tag}>
      <View style={styles.container}>
        <Icon
          color={iconColor()}
          containerStyle={styles.radioIcon}
          name={checked ? checkedIcon : uncheckedIcon}
          type={typeIcon}
        />

        <Text>{label}</Text>
      </View>
    </Button>
  );
};

export { RadioButton };
