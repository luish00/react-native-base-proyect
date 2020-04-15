import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { doLogin } from '../../actions';

import { Input } from '../common/Input';
import I18n from '../../i18n';

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
    fontSize: 16,
  },

  loginImagen: {
    backgroundColor: 'blue',
    height: 100,
    marginBottom: 30,
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

const LoginFrom = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = I18n;

  function goRegisterScreen() {
    props.navigation.navigate('SignUp');
  }

  function onLogIn() {
    dispatch(doLogin({ email, password }));
  }

  return (
    <>
      <Input
        keyboardType="email-address"
        label={t('loginScreen.email')}
        onChangeText={setEmail}
        returnKeyType="next"
        style={styles.textInputContainer}
        value={email}
      />

      <Input
        label={t('loginScreen.password')}
        onChangeText={setPassword}
        returnKeyType="go"
        secureTextEntry
        style={styles.textInputContainer}
        value={password}
      />

      <TouchableWithoutFeedback onPress={onLogIn}>
        <View style={styles.loginButton}>
          <Text style={styles.loginButtonText}>
            {t('loginScreen.login')}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={goRegisterScreen}>
        <Text style={styles.textSinUp}>
          {t('loginScreen.signUp')}
        </Text>
      </TouchableWithoutFeedback>
    </>
  );
};

export { LoginFrom };
