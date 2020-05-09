import React from 'react';

import { CardView, ContainerView } from '../componets/common';
import {
  PaymentMethods,
} from '../componets/paymentMethod/PaymentMethods';

class PaymentMethodScreen extends React.PureComponent {
  render() {
    return (
      <ContainerView>
        <CardView>
          <PaymentMethods />
        </CardView>
      </ContainerView>
    );
  }
}

export default PaymentMethodScreen;
