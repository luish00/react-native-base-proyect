import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import {
  doSavePaymentMethod,
  cardNumberChanged,
  expirationDateChanged,
  cvvChanged,
} from '../../actions';

import { Input, TouchableButton } from '../common';
import I18n from '../../i18n';

import { BrandCardIcon } from './BrandCardIcon';
import { doNothing } from '../../utils';

const styles = StyleSheet.create({
  cardNumberContainer: {
    flexDirection: 'row',
  },

  flex1: {
    flex: 1,
  },

  inpExpirationDate: {
    flex: 1,
    marginRight: 16,
  },

  row: {
    flexDirection: 'row',
  },
});

const PaymentMethodCard = () => {
  const store = useSelector((stores) => stores.paymentMethod);
  const dispatch = useDispatch();
  const { t } = I18n;

  function cardformat(rawValue) {
    const value = rawValue.replace(/ /g, '');

    try {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const matches = v.match(/\d{4,16}/g);
      const match = matches && (matches[0] || '');
      const parts = [];

      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }

      if (parts.length) {
        return parts.join(' ');
      }
    } catch (_) {
      doNothing();
    }

    return value;
  }

  function testOnlyNumber(value) {
    const REGEX_NUMBER = /^[0-9]+$/;

    return REGEX_NUMBER.test(value) || !value;
  }

  function onCarNumberChange(value) {
    const cleanValue = value.replace(/ /g, '');

    if (!testOnlyNumber(cleanValue)) {
      return;
    }

    const cardMask = cardformat(cleanValue);
    dispatch(cardNumberChanged(cardMask));
  }

  function onCardNumberFocus() {
    if (store.cardNumber.indexOf('*') > -1) {
      onCarNumberChange('');
    }
  }

  function onExpirationDateChange(value) {
    const cleanValue = value.replace('/', '');

    if (!testOnlyNumber(cleanValue)) {
      return;
    }

    if (cleanValue.length <= 2) {
      dispatch(expirationDateChanged(value));

      return;
    }

    const expirationDate = `${cleanValue.slice(0, 2)}/${cleanValue.slice(2)}`;
    dispatch(expirationDateChanged(expirationDate));
  }

  function onCvvChange(value) {
    dispatch(cvvChanged(value));
  }

  function onCvvFocus() {
    if (store.cvv.indexOf('*') > -1) {
      onCvvChange('');
    }
  }

  function isAmex() {
    const REGEX_AMEX = /^3[47]/;
    return REGEX_AMEX.test(store.cardNumber);
  }

  function isValidNumberCard() {
    const cleanValue = store.cardNumber.replace(/ /g, '');
    let cardLength = 16;
    if (isAmex()) {
      cardLength = 15;
    }

    return cleanValue.length === cardLength
      && testOnlyNumber(cleanValue);
  }

  function onErrorNumberCard() {
    if (isValidNumberCard()) {
      return null;
    }

    return 'invalidCard';
  }

  function isValidExpirationCard() {
    const { expirationDate } = store;

    if (expirationDate.length !== 5) {
      return false;
    }

    const [month, year] = expirationDate.split('/');
    const yearNow =
      parseInt(new Date().getFullYear().toString().substring(2), 0);

    return month <= 12 && year >= yearNow;
  }

  function onErrorExpirationDate() {
    if (isValidExpirationCard()) {
      return null;
    }

    return 'invalidExpiration';
  }

  function isValidCvv() {
    const cvvLength = isAmex() ? 4 : 3;

    return store.cvv.length === cvvLength && testOnlyNumber(store.cvv);
  }

  function onErrorCvv() {
    if (isValidCvv()) {
      return null;
    }

    return 'invalidCvv';
  }

  function isValidForm() {
    return isValidNumberCard() && isValidExpirationCard() && isValidCvv();
  }

  function handleSavePaymentMethod() {
    const { cardNumber, cvv, expirationDate } = store;
    const startYear = new Date().getFullYear().toString().substring(2);
    const [month, endYear] = expirationDate.split('/');
    const expYear = `${startYear}${endYear}`;

    const payload = {
      cvc: cvv,
      expMonth: parseInt(month, 0),
      expYear: parseInt(expYear, 0),
      id: store.id,
      number: cardNumber.replace(/ /g, ''),
    };

    dispatch(doSavePaymentMethod(payload));
  }

  return (
    <>
      <View style={styles.row}>
        <Input
          editable={!store.loadingSave && !store.id}
          errors={{
            invalidCard: t('paymentMethodScreen.invalidCardNumber'),
          }}
          keyboardType="number-pad"
          label={t('paymentMethodScreen.cardNumber')}
          maxLength={19}
          onChangeText={onCarNumberChange}
          onError={onErrorNumberCard}
          onFocus={onCardNumberFocus}
          placeholder="XXXX XXXX XXXX XXXX"
          shimmer={!store.paymentMethodLoaded}
          styleContainer={styles.flex1}
          value={store.cardNumber}
        />

        <BrandCardIcon brand={store.brand} cardNumber={store.cardNumber} />
      </View>

      <View style={styles.cardNumberContainer}>
        <Input
          editable={!store.loadingSave && !store.id}
          errors={{
            invalidExpiration: t('paymentMethodScreen.invalid'),
          }}
          keyboardType="number-pad"
          label={t('paymentMethodScreen.expirationDate')}
          maxLength={5}
          onChangeText={onExpirationDateChange}
          onError={onErrorExpirationDate}
          placeholder={t('paymentMethodScreen.expirationDateHit')}
          shimmer={!store.paymentMethodLoaded}
          style={styles.inpExpirationDate}
          styleContainer={styles.flex1}
          value={store.expirationDate}
        />

        <Input
          editable={!store.loadingSave && !store.id}
          errors={{
            invalidCvv: t('paymentMethodScreen.invalid'),
          }}
          keyboardType="number-pad"
          label={t('paymentMethodScreen.cvv')}
          maxLength={isAmex() ? 4 : 3}
          onChangeText={onCvvChange}
          onError={onErrorCvv}
          onFocus={onCvvFocus}
          placeholder={isAmex() ? '****' : '***'}
          secureTextEntry
          shimmer={!store.paymentMethodLoaded}
          style={styles.inpExpirationDate}
          styleContainer={styles.flex1}
          value={store.cvv}
        />
      </View>

      <TouchableButton
        disabled={!isValidForm() || store.loadingPaymentMethod || store.id}
        loading={store.loadingSave}
        onPress={handleSavePaymentMethod}
        tag="Save payment method"
        text={t('paymentMethodScreen.savePaymentMethod')}
      />
    </>
  );
};

export { PaymentMethodCard };
