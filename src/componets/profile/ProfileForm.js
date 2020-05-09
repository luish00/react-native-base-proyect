import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';

import { doSignup } from '../../actions';

import { COLORS } from '../../assets/colors';
import { CustomPicker, DatePicker, Input, TouchableButton } from '../common';
import { testOnlyLetters } from '../../utils/common';
import I18n from '../../i18n';

const styles = StyleSheet.create({
  errorMessage: {
    color: COLORS.red,
    fontSize: 16,
    marginBottom: 10,
    paddingTop: 8,
    textAlign: 'center',
  },

  headerCotainer: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  imageLogo: {
    alignSelf: 'center',
    backgroundColor: COLORS.primaryColor,
    height: 100,
    marginBottom: 30,
    resizeMode: 'center',
    width: 150,
  },

  titleCard: {
    color: COLORS.primaryText,
    fontSize: 24,
    letterSpacing: 1.3,
    marginBottom: 16,
    textAlign: 'center',
  },
});

const now = new Date();

const ProfileForm = ({ route }) => {
  const profileStore = useSelector((state) => state.signUp);
  const dispatch = useDispatch();

  const minDate =
    new Date(now.getFullYear() - 16, now.getMonth(), now.getDate());
  const { t } = I18n;
  const { email, password } = route.params;

  const [errors, setErrors] = useState('');
  const [fullName, setfullName] = useState('');
  const [gender, setGender] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [date, setDate] = useState(minDate);

  const ageError = t('profileScreen.ageError');
  const nameFormatError = t('profileScreen.nameFormatError');

  function handleErrors(currentError) {
    if (errors !== currentError) {
      setErrors(currentError);
    }
  }

  function validAge() {
    const today = Moment(new Date());
    const birthDate = Moment(new Date(date));
    const diff = today.diff(birthDate, 'years', true);

    return diff >= 15;
  }

  function isButtonEnabled() {
    const isAgeValid = validAge();

    return (
      fullName.length
      && gender.length
      && isAgeValid
      && addressLine1.length
      && addressLine2.length
      && !errors.length
    );
  }

  function validName() {
    const isNameValid = fullName && testOnlyLetters(fullName);

    if (!isNameValid) {
      handleErrors(nameFormatError);
      return 'nameFormat';
    }

    setErrors('');

    return '';
  }

  function onLogIn() {
    const profileValues = {
      addressLine1,
      addressLine2,
      birthDate: date.toLocaleDateString(),
      confirmPassword: password,
      email: email.toLowerCase(),
      fullName,
      gender,
      password,
    };

    setErrors('');
    dispatch(doSignup(profileValues));
  }

  return (
    <>
      <View style={styles.headerCotainer}>
        <Image style={styles.imageLogo} />

        <Text style={styles.titleCard}>{t('profileScreen.welcome')}</Text>
      </View>

      <Input
        errors={{ nameFormat: nameFormatError }}
        label={t('profileScreen.name')}
        leftIcon="user-circle"
        leftIconType="font-awesome"
        onChangeText={setfullName}
        onError={validName}
        placeholder={t('profileScreen.name')}
        value={fullName}
      />

      <DatePicker
        date={date}
        display="spinner"
        error={validAge() ? '' : ageError}
        label={t('profileScreen.birthdate')}
        leftIcon="birthday-cake"
        leftIconType="font-awesome"
        setDate={setDate}
        tag="Birth Date"
      />

      <CustomPicker
        items={[
          { label: t('profileScreen.female'), value: 'F' },
          { label: t('profileScreen.male'), value: 'M' },
        ]}
        leftIcon="genderless"
        leftIconType="font-awesome"
        onSelected={setGender}
        value={gender}
      />

      <Input
        label={t('profileScreen.addressLine')}
        leftIcon="address-book"
        leftIconType="font-awesome"
        onChangeText={setAddressLine1}
        placeholder={t('profileScreen.addressLine')}
        required
        value={addressLine1}
      />

      <Input
        label={t('profileScreen.addressLineTwo')}
        leftIcon="address-book"
        leftIconType="font-awesome"
        onChangeText={setAddressLine2}
        placeholder={t('profileScreen.addressLineTwo')}
        required
        value={addressLine2}
      />

      <TouchableButton
        disabled={!isButtonEnabled()}
        loading={profileStore.savingProfile}
        onPress={onLogIn}
        tag="Profile go shopping!"
        text={t('buttonText.goShopping')}
      />

      {profileStore.isError && (
        <Text style={styles.errorMessage}>
          {profileStore.errorMessage}
        </Text>
      )}
    </>
  );
};

export { ProfileForm };
