import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { doCheckEmail } from '../../actions';

import { COLORS } from '../../assets/colors';
import { Input, TouchableButton } from '../common';
import { isValidEmail } from '../../utils/common';
import I18n from '../../i18n';

const styles = StyleSheet.create({
  errorMessage: {
    alignSelf: 'flex-end',
    color: COLORS.red,
    fontSize: 12,
    marginBottom: 16,
    marginTop: -28,
  },

  flex1: {
    flex: 1,
  },

  headerCotainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 16,
  },

  imageLogo: {
    alignSelf: 'center',
    backgroundColor: COLORS.primaryColor,
    height: 100,
    marginBottom: 30,
    resizeMode: 'center',
    width: '100%',
  },

  nextButton: {
    alignItems: 'center',
    backgroundColor: COLORS.secondaryDarkColor,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
  },

  nextButtonDisabled: {
    alignItems: 'center',
    backgroundColor: COLORS.btnDisabled,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
  },

  nextButtonText: {
    color: COLORS.buttonTextWhite,
    fontSize: 16,
  },

  row: {
    flexDirection: 'row',
  },

  titleCard: {
    fontSize: 24,
    paddingBottom: 16,
    textAlign: 'center',
  },
});

const SignUpFrom = ({ navigation }) => {
  const signUpStore = useSelector((state) => state.signUp);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { t } = I18n;
  const emailError = t('signUpScreen.emailError');
  const passwordError = t('signUpScreen.passwordError');
  const passwordLength = t('signUpScreen.passwordLength');

  function isButtonEnabled() {
    return (isValidEmail(email) && password && passwordConfirm
    && password === passwordConfirm
    && !signUpStore.isError && errors.length === 0);
  }

  function goToQuiz() {
    const isValid = isButtonEnabled();

    if (isValid) {
      navigation.tag('Go to Quiz Screen').navigate('Profile', {
        email,
        password,
      });
    }
  }

  function handleErrors(currentError) {
    if (!errors.includes(currentError)) {
      errors.push(currentError);
    }
  }

  function errorEmailConfirm() {
    return {
      emailFormat: emailError,
    };
  }

  function validEmailConfirm() {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(email) || !email.length) {
      handleErrors(emailError);
      return 'emailFormat';
    }

    setErrors(errors.filter((error) => error !== emailError));

    dispatch(doCheckEmail({ user: email.toLowerCase() }));
    return '';
  }

  function errorPassword() {
    return {
      passwordLength,
    };
  }

  function validPassword() {
    if (password.length < 4) {
      handleErrors(passwordLength);
      return 'passwordLength';
    }
    setErrors(errors.filter((error) => error !== passwordLength));

    return '';
  }

  function errorPasswordConfirm() {
    return {
      notMatch: passwordError,
    };
  }

  function validPasswordConfirm() {
    if (password !== passwordConfirm) {
      handleErrors(passwordError);
      return 'notMatch';
    }
    setErrors(errors.filter((error) => error !== passwordError));

    return '';
  }

  function rightIcon() {
    if (!email || signUpStore.checkingEmailUser || !signUpStore.validEmail) {
      return '';
    }

    return signUpStore.isError ? 'close' : 'done';
  }

  function rightIconColor() {
    return signUpStore.isError ? COLORS.red : COLORS.green;
  }

  return (
    <>
      <View style={styles.headerCotainer}>
        <Image style={styles.imageLogo} />
      </View>

      <View style={[styles.row, styles.flex1]}>
        <Input
          errors={errorEmailConfirm()}
          keyboardType="email-address"
          label={t('profileScreen.user')}
          onChangeText={setEmail}
          onError={validEmailConfirm}
          placeholder={t('loginScreen.emailPlaceholder')}
          required
          rightIcon={rightIcon()}
          rightIconColor={rightIconColor()}
          styleContainer={styles.flex1}
          value={email}
        />

        <ActivityIndicator animating={signUpStore.checkingEmailUser} />
      </View>

      {signUpStore.isError && (
        <Text style={styles.errorMessage}>
          {`${signUpStore.checkEmailError}`}
        </Text>
      )}

      <Input
        errors={errorPassword()}
        label={t('loginScreen.password')}
        onChangeText={setPassword}
        onError={validPassword}
        placeholder={t('loginScreen.password')}
        required
        secureTextEntry
        value={password}
      />

      <Input
        errors={errorPasswordConfirm()}
        label={t('signUpScreen.confirmPassword')}
        onChangeText={setPasswordConfirm}
        onError={validPasswordConfirm}
        placeholder={t('signUpScreen.confirmPassword')}
        required
        returnKeyType="go"
        secureTextEntry
        value={passwordConfirm}
      />

      <TouchableButton
        disabled={!isButtonEnabled() || signUpStore.checkingEmailUser}
        onPress={goToQuiz}
        tag="Sign up next"
        text={t('buttonText.next')}
      />
    </>
  );
};

export { SignUpFrom };
