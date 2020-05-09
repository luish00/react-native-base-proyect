import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { COLORS } from '../../assets/colors';
import { Shimmer } from './Shimmer';

import I18n from '../../i18n';
import { testId } from '../../utils';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 18,
  },

  icon: {
    borderBottomWidth: 1,
    justifyContent: 'center',
    paddingRight: 8,
  },

  inputStyle: {
    borderBottomWidth: 1,
    color: COLORS.black,
    flex: 1,
    fontSize: 18,
    lineHeight: 23,
    paddingLeft: 5,
    paddingRight: 5,
  },

  labelError: {
    color: COLORS.red,
    fontSize: 13,
  },

  labelStyle: {
    color: COLORS.primaryText,
    fontSize: 16,
  },

  row: {
    flexDirection: 'row',
  },

  shimmerContainer: {
    margin: 3,
  },
});

const defaultErrors = {
  required: I18n.t('requiredField'),
};

const Input = ({
  editable = true,
  errors = defaultErrors,
  id = '',
  inpRef,
  onBlur,
  onError,
  onFocus,
  keyboardType = 'default',
  maxLength,
  label,
  leftIcon,
  leftIconType = 'material-icons',
  multiline,
  value,
  onChangeText,
  onEndEditing,
  placeholder,
  required = false,
  returnKeyType = 'next',
  rightIcon,
  rightIconType = 'material-icons',
  rightIconColor = COLORS.gray,
  secureTextEntry = false,
  shimmer = false,
  style = {},
  styleContainer = {},
}) => {
  const [isFocus, setFocus] = useState(false);
  const [error, setError] = useState('');
  const { container, labelError, inputStyle, labelStyle } = styles;

  function handleOnFocus() {
    setFocus(true);
    setError('');

    if (onFocus && typeof onFocus === 'function') {
      onFocus();
    }
  }

  function handleOnBlur() {
    setFocus(false);

    if (onBlur && typeof onBlur === 'function') {
      onBlur();
    }
  }

  function handleOnEndEditing() {
    if (required && !value) {
      setError(errors.required);
    }

    if (onError) {
      const customError = typeof onError === 'function' ? onError() : onError;

      setError(errors[customError]);
    }

    if (onEndEditing && typeof onEndEditing === 'function') {
      onEndEditing(value);
    }
  }

  function renderLeftIcon() {
    if (!leftIcon) {
      return null;
    }

    return (
      <View style={[styles.icon, {
        borderBottomColor: isFocus
          ? COLORS.secondaryDarkColor : COLORS.gray,
      }]}
      >
        <Icon
          color={COLORS.gray}
          name={leftIcon}
          size={27}
          type={leftIconType}
        />
      </View>
    );
  }

  function renderRightIcon() {
    if (!rightIcon) {
      return null;
    }

    return (
      <View style={[styles.icon, {
        borderBottomColor: isFocus
          ? COLORS.secondaryDarkColor : COLORS.gray,
      }]}
      >
        <Icon
          color={rightIconColor}
          name={rightIcon}
          size={27}
          type={rightIconType}
        />
      </View>
    );
  }

  return (
    <View style={[container, { ...styleContainer }]}>
      <Text style={labelStyle}>{label}</Text>

      <Shimmer
        autoRun
        height={35}
        style={styles.shimmerContainer}
        visible={shimmer}
      >
        <View style={styles.row}>
          {renderLeftIcon()}

          <TextInput
            ref={inpRef}
            autoCorrect={false}
            editable={editable}
            keyboardType={keyboardType}
            maxLength={maxLength}
            multiline={multiline}
            onBlur={handleOnBlur}
            onChangeText={onChangeText}
            onEndEditing={handleOnEndEditing}
            onFocus={handleOnFocus}
            placeholder={placeholder}
            returnKeyType={returnKeyType}
            secureTextEntry={secureTextEntry}
            style={[inputStyle, { ...style }, {
              borderBottomColor: isFocus
                ? COLORS.secondaryDarkColor : COLORS.gray,
            }]}
            value={value}
            {...testId(id)}
          />

          {renderRightIcon()}
        </View>
      </Shimmer>

      <Text style={labelError} {...testId(`error-${id}`)}>{error}</Text>
    </View>
  );
};

export { Input };
