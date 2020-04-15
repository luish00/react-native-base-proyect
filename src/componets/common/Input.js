import React from 'react';
import { TextInput, View, Text } from 'react-native';

const styles = {
  containerStyle: {
    paddingBottom: 18,
  },

  inputStyle: {
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1,
    color: '#000',
    fontSize: 18,
    lineHeight: 23,
    paddingLeft: 5,
    paddingRight: 5,
  },

  labelStyle: {
    fontSize: 16,
  },
};

const Input = ({
  keyboardType = 'default',
  label,
  value,
  onChangeText,
  placeholder,
  returnKeyType = 'next',
  secureTextEntry = false,
  style = {},
}) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        autoCorrect={false}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        returnKeyType={returnKeyType}
        secureTextEntry={secureTextEntry}
        style={[inputStyle, { ...style }]}
        value={value}
      />
    </View>
  );
};

export { Input };
