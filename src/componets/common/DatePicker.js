import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { Button } from './traking';
import { formatDate } from '../../utils';
import { COLORS } from '../../assets/colors';
import { Shimmer } from './Shimmer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 8,
  },

  icon: {
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    color: COLORS.gray,
    justifyContent: 'center',
    paddingRight: 8,
  },

  input: {
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    color: COLORS.black,
    flex: 1,
    fontSize: 18,
  },

  labelError: {
    color: COLORS.red,
    fontSize: 13,
  },

  row: {
    flexDirection: 'row',
  },

  textPicker: {
    color: COLORS.primaryText,
  },
});

const DatePicker = ({
  error,
  disabled = false,
  display = 'default',
  date,
  maximumDate = new Date(),
  label,
  leftIcon,
  leftIconType = 'material-icons',
  setDate,
  shimmer = false,
  tag,
}) => {
  const [show, setShow] = useState(false);

  function onChange(event, selectedDate) {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  }

  function onPress() {
    setShow(true);
  }

  function getFormatedDate() {
    if (typeof date !== 'object') {
      return '';
    }

    return formatDate({ date, format: 'MM/DD/YYYY' });
  }

  function renderPicker() {
    if (show) {
      return (
        <DateTimePicker
          display={display}
          is24Hour
          maximumDate={maximumDate}
          mode="date"
          onChange={onChange}
          testID="dateTimePickerProfile"
          timeZoneOffsetInMinutes={0}
          value={date}
        />
      );
    }

    return null;
  }

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
    <>
      <Button disabled={disabled} onPress={onPress} tag={tag}>
        <View style={styles.container}>
          <Text style={styles.textPicker}>{label}</Text>

          <Shimmer
            autoRun
            height={35}
            visible={shimmer}
          >
            <View style={[styles.row, { flex: 1 }]}>
              {renderLeftIcon()}

              <TextInput
                editable={false}
                label={label}
                style={styles.input}
                value={getFormatedDate()}
              />
            </View>
          </Shimmer>
          <Text style={styles.labelError}>{error}</Text>
        </View>
      </Button>

      {renderPicker()}
    </>
  );
};

export { DatePicker };
