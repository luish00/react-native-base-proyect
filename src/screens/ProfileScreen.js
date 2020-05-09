import React from 'react';
import { connect } from 'react-redux';
import { ContainerView, CardView } from '../componets/common';
import { ProfileForm } from '../componets/profile/ProfileForm';

import { useNavigationTrakcer } from '../componets/common/traking';
import { loadSignup } from '../actions';

class ProfileScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.navigationTracker = useNavigationTrakcer(props.navigation);
    this.route = props.route;
  }

  componentDidMount() {
    this.props.loadSignup();
  }

  render() {
    return (
      <ContainerView>
        <CardView>
          <ProfileForm
            navigation={this.navigationTracker}
            route={this.route}
          />
        </CardView>
      </ContainerView>
    );
  }
}

export default connect(null, { loadSignup })(ProfileScreen);
