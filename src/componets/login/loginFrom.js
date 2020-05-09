import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { doLogin } from '../../actions';

import { COLORS } from '../../assets/colors';
import { Input, TouchableButton } from '../common';
import I18n from '../../i18n';
import { isValidEmail } from '../../utils/common';
import { Button } from '../common/traking';

const styles = StyleSheet.create({
  activityIndicator: {
    alignItems: 'center',
    color: COLORS.loading,
  },

  container: {
    marginHorizontal: 30,
    marginTop: 30,
  },

  errorColor: {
    alignSelf: 'center',
    color: COLORS.errorColor,
    paddingTop: 22,
  },

  loginButton: {
    alignItems: 'center',
    backgroundColor: COLORS.secondaryDarkColor,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
  },

  loginButtonDisabled: {
    alignItems: 'center',
    backgroundColor: COLORS.btnDisabled,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
  },

  loginButtonText: {
    color: COLORS.buttonTextWhite,
    fontSize: 16,
  },

  loginImagen: {
    backgroundColor: COLORS.blue,
    height: 100,
    marginBottom: 30,
  },

  textAccount: {
    alignSelf: 'center',
    fontSize: 13,
    paddingTop: 20,
  },

  textInputContainer: {
    paddingBottom: 18,
  },

  textSinUp: {
    color: '#4285f4',
    fontSize: 13,
  },

});

const LoginFrom = (props) => {
  const store = useSelector(({ session }) => session);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = I18n;

  function goRegisterScreen() {
    props.navigation.tag('Move to Sign up screen').navigate('Sign Up');
  }

  function isButtonEnabled() {
    return (isValidEmail(email) && password && !store.loading);
  }

  function onLogIn() {
    if (isButtonEnabled()) {
      dispatch(doLogin({ email, password }));
    }
  }

  return (
    <>
      <Input
        editable={!store.loading}
        id="email"
        keyboardType="email-address"
        label={t('loginScreen.email')}
        leftIcon="email"
        onChangeText={setEmail}
        placeholder={t('loginScreen.emailPlaceholder')}
        returnKeyType="next"
        style={styles.textInputContainer}
        value={email}
      />

      <Input
        editable={!store.loading}
        id="password"
        label={t('loginScreen.password')}
        leftIcon="lock"
        onChangeText={setPassword}
        placeholder={t('loginScreen.password')}
        returnKeyType="go"
        secureTextEntry
        style={styles.textInputContainer}
        value={password}
      />

      <TouchableButton
        disabled={!isButtonEnabled()}
        id="btnLogin"
        loading={store.loading}
        onPress={onLogIn}
        tag="Login with email"
        text={t('loginScreen.login')}
      />

      <Button id="btnSignUp" onPress={goRegisterScreen} tag="Sign up">
        <Text style={styles.textAccount}>
          {`${t('loginScreen.createAccount')} `}
          <Text style={styles.textSinUp}>
            {t('loginScreen.signUp')}
          </Text>
        </Text>
      </Button>

      <Text style={styles.errorColor}>
        {store.errorLogin}
      </Text>

    </>
  );
};

export { LoginFrom };
