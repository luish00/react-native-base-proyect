import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { testId } from '../../../utils';

const Button = ({ disabled = false, id = '', onPress, tag, ...rest }) => {
  function handleClick() {
    // TODO: add traking service

    if (!tag) {
      throw new Error('props tag is required on Button for tracking event');
    }

    if (onPress && typeof onPress === 'function') {
      onPress();
    }
  }

  return (
    <TouchableWithoutFeedback
      {...rest}
      {...testId(id)}
      disabled={disabled}
      onPress={handleClick}
    >
      {rest.children}
    </TouchableWithoutFeedback>
  );
};

export { Button };
