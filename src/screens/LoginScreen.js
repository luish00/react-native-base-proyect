import React from 'react';
import { Dimensions, Image, Text, StyleSheet, View } from 'react-native';

import { ContainerView, SnackBar } from '../componets/common';
import { LoginFrom } from '../componets/login/LoginFrom';
import { useNavigationTrakcer } from '../componets/common/traking';
import appjson from '../../app.json';
import { COLORS } from '../assets/colors';

const vh = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: vh - 100,
    justifyContent: 'center',
  },

  loginImagen: {
    alignSelf: 'center',
    backgroundColor: COLORS.primaryColor,
    height: 100,
    marginBottom: 30,
    resizeMode: 'center',
    width: '100%',
  },

  textSinUp: {
    color: '#4285f4',
    fontSize: 18,
    paddingTop: 15,
  },

  version: {
    alignSelf: 'flex-end',
  },
});

class LoginScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.navigationTracker = useNavigationTrakcer(props.navigation);
  }

  render() {
    return (
      <>
        <SnackBar />

        <ContainerView>

          <View style={styles.container}>
            <View>
              <Image
                resizeMode="center"
                style={styles.loginImagen}
              />

              <LoginFrom navigation={this.navigationTracker} />
            </View>
          </View>

          <Text style={styles.version}>v {appjson.versionName}</Text>
        </ContainerView>
      </>
    );
  }
}

export default LoginScreen;
