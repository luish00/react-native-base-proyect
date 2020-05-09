import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { Button } from '../common/traking';

import paypayIcon from '../../assets/paymentMethod/paypal-icon.png';
import { COLORS } from '../../assets/colors';

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.secondaryDarkColor,
    borderRadius: 18,
    borderWidth: 2,
    marginLeft: 0,
    paddingRight: 16,
  },

  disabledButton: {
    backgroundColor: COLORS.gray,
    borderColor: COLORS.gray,
  },

  imagenContainer: {
    alignSelf: 'center',
    flex: 1,
    height: 50,
    width: 300,
  },
});

const PaymentMethodPaypal = () => (
  <Button disabled tag="Payment method PayPal">
    <View style={[styles.container, styles.disabledButton]}>
      <Image
        resizeMode="center"
        source={paypayIcon}
        style={styles.imagenContainer}
      />
    </View>
  </Button>
);

export { PaymentMethodPaypal };
