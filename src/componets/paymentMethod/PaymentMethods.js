import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { doLoadPaymentMethod } from '../../actions';

import { RadioButton, Shimmer } from '../common';
import { PaymentMethodCard } from './PaymentMethodCard';
import { PaymentMethodPaypal } from './PaymentMethodPaypal';
import { COLORS } from '../../assets/colors';
import I18n from '../../i18n';

const styles = StyleSheet.create({
  activityIndicator: {
    paddingBottom: 16,
    paddingLeft: 16,
  },

  flex1: {
    flex: 1,
  },

  messageText: {
    alignSelf: 'center',
    padding: 8,
  },

  messageTextError: {
    color: COLORS.errorColor,
  },

  radioButtonContainer: {
    flexDirection: 'row',
    paddingBottom: 16,
  },

  row: {
    flexDirection: 'row',
  },

  subTitleCard: {
    fontSize: 16,
    paddingBottom: 8,
  },

  titleCard: {
    fontSize: 24,
    paddingBottom: 16,
  },
});

const PaymentMethods = () => {
  const { t } = I18n;
  const dispatch = useDispatch();
  const store = useSelector((stores) => stores.paymentMethod);
  const [paymentMethod, setPaymentMethod] = useState(0);

  useEffect(() => {
    dispatch(doLoadPaymentMethod());
  }, []);

  function setPaymentMethodCard() {
    setPaymentMethod(0);
  }

  function setPaymentMethodPaypal() {
    setPaymentMethod(1);
  }

  function renderPaymentMethod() {
    return paymentMethod === 0
      ? <PaymentMethodCard /> : <PaymentMethodPaypal />;
  }

  return (
    <>
      <View style={styles.row}>
        <Text style={styles.subTitleCard}>
          {t('paymentMethodScreen.choosePaymentMethod')}
        </Text>

        <ActivityIndicator
          animating={store.loadingPaymentMethod}
          color={COLORS.secondaryColor}
          size="small"
          style={styles.activityIndicator}
        />
      </View>

      <Shimmer autoRun height={35} visible={!store.paymentMethodLoaded}>
        <View style={styles.radioButtonContainer}>
          <View style={styles.flex1}>
            <RadioButton
              checked={paymentMethod === 0}
              checkedColor={COLORS.secondaryDarkColor}
              label={t('paymentMethodScreen.creditDebitCard')}
              onPress={setPaymentMethodCard}
              tag="Payment method Credit/Debit"
            />
          </View>

          <View style={styles.flex1}>
            <RadioButton
              checked={paymentMethod === 1}
              checkedColor={COLORS.secondaryDarkColor}
              disabled
              label={t('paymentMethodScreen.paypal')}
              onPress={setPaymentMethodPaypal}
              tag="Payment method PayPal"
            />
          </View>
        </View>
      </Shimmer>

      {renderPaymentMethod()}

      <Text style={[styles.messageText, store.messageError
        && styles.messageTextError]}
      >
        {store.message || store.messageError}
      </Text>
    </>
  );
};

export { PaymentMethods };
