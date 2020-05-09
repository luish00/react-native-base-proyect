import React from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS } from '../assets/colors';
import { hideAlertConfirm } from '../actions';

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.overlayModal,
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999,
  },

  messageCard: {
    color: COLORS.primaryText,
    fontSize: 20,
    letterSpacing: 1.5,
    paddingBottom: 18,
  },

  modalContent: {
    backgroundColor: COLORS.white,
    elevation: 8,
    padding: 16,
    width: '90%',
  },

  positiveButton: {
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'center',
    margin: 16,
    paddingRight: 16,
    width: '100%',
  },

  positiveButtonText: {
    color: COLORS.secondaryDarkColor,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },

  titleCard: {
    color: COLORS.primaryText,
    fontSize: 28,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
});

const AlertConfirm = () => {
  const dispatch = useDispatch();
  const store = useSelector((stores) => stores.alertConfirm);

  function onPressPositive() {
    dispatch(hideAlertConfirm());
  }

  function rendenModal() {
    Keyboard.dismiss();

    return store.show
      ? (
        <View style={styles.container}>
          <View style={styles.modalContent}>
            <Text style={styles.titleCard}>{store.title}</Text>

            <Text>{store.message}</Text>

            <View style={styles.positiveButton}>
              <TouchableNativeFeedback onPress={onPressPositive} tag="asd">
                <Text style={styles.positiveButtonText}>
                  {store.primaryButtonText}
                </Text>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      )
      : null;
  }

  return (
    <>
      {rendenModal()}
    </>
  );
};

export { AlertConfirm };
