import AsyncStorage from '@react-native-community/async-storage';

export async function getStorageData(key) {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (_) {
    return null;
  }

  return null;
}

export async function storeData({ data, key }) {
  AsyncStorage.setItem(key, JSON.stringify(data));
}

export function removeData(key) {
  return AsyncStorage.removeItem(key);
}
