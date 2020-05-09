import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { logOut } from '../actions';
import I18n from '../i18n';

import { useNavigationTrakcer } from '../componets/common/traking';
import { MenuItem } from '../componets/settings/MenuItem';

class SettingsScreen extends React.PureComponent {
  render() {
    const navigation = useNavigationTrakcer(this.props.navigation);

    return (
      <View>
        <MenuItem
          leftIcon="currency-usd"
          name={I18n.t('paymentMethodScreen.title')}
          navigation={navigation}
          route="Payment Method"
          tagButton="Payment method"
        />

        <MenuItem
          leftIcon="logout"
          name={I18n.t('homeScreen.logOut')}
          navigation={navigation}
          onPress={this.props.logOut}
          tagButton="Log out"
        />
      </View>
    );
  }
}

export default connect(null, { logOut })(SettingsScreen);
