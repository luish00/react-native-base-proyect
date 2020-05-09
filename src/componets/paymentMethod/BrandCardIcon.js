import React from 'react';
import { Image, StyleSheet } from 'react-native';

import visaIcon from '../../assets/paymentMethod/card-visa.png';
import masterCardIcon from '../../assets/paymentMethod/card-master-card.png';
import discoverIcon from '../../assets/paymentMethod/card-discover.png';
import amexIcon from '../../assets/paymentMethod/card-amex.png';

const styles = StyleSheet.create({
  image: {
    width: 80,
  },
});

const BrandCardIcon = ({ brand, cardNumber }) => {
  function isAmex() {
    const REGEX_AMEX = /^3[47]/;
    return REGEX_AMEX.test(cardNumber);
  }

  function isVisa() {
    const REGEX_VISA = /^4/;
    return REGEX_VISA.test(cardNumber);
  }

  function isMasterCard() {
    const REGEX_MASTER_CARD = /^5[1-5]/;
    return REGEX_MASTER_CARD.test(cardNumber);
  }

  /* eslint-disable max-len */
  function isDiscover() {
    const REGEX_DISCOVER = /^(6011|6221 2[6-9]|6221 3|622[2-8]|6229 [01]|6229 2[0-5]|6226 4[4-9]|65)/;
    return REGEX_DISCOVER.test(cardNumber);
  }

  function brandDefault() {
    let branIcon = visaIcon;

    switch (brand) {
      case 'amex':
        branIcon = amexIcon;
        break;
      case 'discover':
        branIcon = discoverIcon;
        break;
      case 'mastercard':
        branIcon = masterCardIcon;
        break;

      default:
    }

    return <Image resizeMode="center" source={branIcon} style={styles.image} />;
  }

  function icon() {
    if (brand) {
      return brandDefault();
    }

    if (!cardNumber) {
      return null;
    }

    if (isAmex()) {
      return (
        <Image resizeMode="center" source={amexIcon} style={styles.image} />
      );
    }

    if (isVisa()) {
      return (
        <Image resizeMode="center" source={visaIcon} style={styles.image} />
      );
    }

    if (isMasterCard()) {
      return (
        <Image resizeMode="center" source={masterCardIcon} style={styles.image} />
      );
    }

    if (isDiscover()) {
      return (
        <Image resizeMode="center" source={discoverIcon} style={styles.image} />
      );
    }

    return null;
  }

  return icon();
};

export { BrandCardIcon };
