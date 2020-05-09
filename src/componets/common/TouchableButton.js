import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Button } from './traking';
import { COLORS } from '../../assets/colors';
import { testId } from '../../utils';

const styles = StyleSheet.create({
  disabledButton: {
    backgroundColor: COLORS.gray,
  },

  loginButton: {
    alignItems: 'center',
    backgroundColor: COLORS.secondaryDarkColor,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
  },

  loginButtonText: {
    color: '#fff',
  },

  titleCard: {
    fontSize: 24,
    paddingBottom: 16,
  },
});

const TouchableButton = ({
  disabled = false,
  id = '',
  loading = false,
  onPress,
  style = {},
  styleText = {},
  tag,
  text,
  ...rest
}) => {
  function renderContentOrDefault() {
    if (loading) {
      return (
        <ActivityIndicator
          {...testId(`spinner-${id}`)}
          color="#fff"
          size="small"
        />
      );
    }

    return (
      <Text style={[styles.loginButtonText, { ...styleText }]}>
        {text}
      </Text>
    );
  }

  return (
    <Button
      {...rest}
      disabled={disabled || loading}
      id={id}
      onPress={onPress}
      tag={tag}
    >
      <View style={[
        styles.loginButton,
        (disabled || loading) ? styles.disabledButton : null,
        { ...style },
      ]}
      >
        {renderContentOrDefault()}
      </View>
    </Button>
  );
};

export { TouchableButton };
