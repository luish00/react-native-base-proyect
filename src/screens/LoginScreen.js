import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import AuthContext from '../../AuthContext';
import { LoginFrom } from '../componets/login/loginFrom';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginTop: 30,
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: 'blue',
    height: 40,
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fff',
  },
  loginImagen: {
    backgroundColor: 'blue',
    height: 100,
    marginBottom: 30,
  },
  textInput: {
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1,
  },
  textInputContainer: {
    paddingBottom: 18,
  },
  textSinUp: {
    color: '#4285f4',
    fontSize: 18,
    paddingTop: 15,
  },
});

class LoginScreen extends React.PureComponent {
  render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        keyboardVerticalOffset={10}
      >
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.container}>
            <Image style={styles.loginImagen} />

            <LoginFrom context={this.context} navigation={navigation} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

LoginScreen.contextType = AuthContext;

export default LoginScreen;
