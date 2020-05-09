import React, { useEffect, useCallback } from 'react';
import { Animated, Dimensions, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { COLORS } from '../../assets/colors';

const vw = Dimensions.get('window').width;

const styles = StyleSheet.create({
  alert: {
    height: 60,
    justifyContent: 'center',
    padding: 12,
    position: 'absolute',
    width: vw,
    zIndex: 66,
  },

  alertText: {
    color: COLORS.white,
    textAlign: 'center',
  },
});

let alertTop = new Animated.Value(-90);
const SnackBar = ({ size = -90 }) => {
  const store = useSelector((stores) => stores.snackBar);

  useEffect(() => {
    alertTop = new Animated.Value(size);
  }, []);

  const slideAlertDown = useCallback(() => {
    Animated.timing(alertTop, {
      duration: 300,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  });

  const slideAlertUp = useCallback(() => {
    Animated.timing(alertTop, {
      duration: 300,
      toValue: size,
      useNativeDriver: false,
    }).start();
  });

  useEffect(() => {
    const action = store.show ? slideAlertDown : slideAlertUp;

    action();
  }, [store]);

  return (
    <>
      <Animated.View
        style={[
          styles.alert,
          {
            backgroundColor: store.color,
            top: alertTop,
          },
        ]}
      >
        <Text style={styles.alertText}>
          {store.message}
        </Text>
      </Animated.View>
    </>
  );
};

export { SnackBar };
