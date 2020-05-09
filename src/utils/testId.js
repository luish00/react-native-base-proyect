import { Platform } from 'react-native';

export function testId(id) {
  if (!id) {
    return {};
  }

  return Platform.OS === 'android'
    ? { accessibilityLabel: id, accessible: true }
    : { testID: id };
}
