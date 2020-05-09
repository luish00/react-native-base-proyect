import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import RNPicker from 'react-native-picker-select';
import { COLORS } from '../../assets/colors';
import I18n from '../../i18n';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 28,
  },

  flex1: {
    flex: 1,
  },

  icon: {
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    color: COLORS.gray,
    justifyContent: 'center',
    paddingRight: 8,
  },

  inputAndroid: {
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    borderColor: COLORS.grey,
    color: COLORS.black,
    fontSize: 18,
    paddingVertical: 8,
  },

  inputIOS: {
    borderColor: COLORS.grey,
    borderRadius: 4,
    borderWidth: 1,
    color: COLORS.black,
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },

  row: {
    flexDirection: 'row',
  },

  text: {
    color: COLORS.primaryText,
    fontSize: 16,
  },
});

const CustomPicker = ({
  items,
  onSelected,
  leftIcon,
  leftIconType = 'material-icons',
  value,
}) => {
  const { t } = I18n;

  function renderLeftIcon() {
    if (!leftIcon) {
      return null;
    }

    return (
      <View style={styles.icon}>
        <Icon
          color={COLORS.gray}
          name={leftIcon}
          size={27}
          type={leftIconType}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('profileScreen.sex')}</Text>

      <View style={styles.row}>
        {renderLeftIcon()}

        <View style={styles.flex1}>
          <RNPicker
            items={items}
            onValueChange={onSelected}
            placeholder={{
              label: t('profileScreen.placeHolder'),
              value: '',
            }}
            style={styles}
            useNativeAndroidPickerStyle={false}
            value={value}
          />
        </View>
      </View>
    </View>
  );
};

export { CustomPicker };
