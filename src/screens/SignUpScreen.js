import React from 'react';
import { connect } from 'react-redux';
import { ContainerView, CardView } from '../componets/common';
import { SignUpFrom } from '../componets/singUp/SignUpFrom';

import { cleanSignup } from '../actions';

import { useNavigationTrakcer } from '../componets/common/traking';

class SignUpScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.navigationTracker = useNavigationTrakcer(props.navigation);
  }

  componentWillUnmount() {
    this.props.cleanSignup();
  }

  render() {
    return (
      <ContainerView>
        <CardView>
          <SignUpFrom navigation={this.navigationTracker} />
        </CardView>
      </ContainerView>
    );
  }
}

export default connect(null, { cleanSignup })(SignUpScreen);
