import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import I18n from '../../i18n';
import { doSaveQuiz, loadQuizAnswers } from '../../actions';
import { COLORS } from '../../assets/colors';
import { testOnlyNumber } from '../../utils/common';
import { DatePicker, TouchableButton, Input } from '../common';
import { getStorageData } from '../../utils';

const MAX_FREQUENCY = 40;
const MAX_LENGHT = 30;
const MIN_FREQUENCY = 1;
const MIN_LENGHT = 1;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    flex: 1,
  },

  datePicker: {
    alignItems: 'center',
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    marginTop: 15,
    width: '90%',
  },

  disclaimerText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },

  disclaimerView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },

  errorMessage: {
    paddingTop: 8,
    textAlign: 'center',
  },

  footer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
  },

  goButton: {
    alignItems: 'center',
    backgroundColor: COLORS.secondaryColor,
    borderRadius: 10,
    height: '40%',
    justifyContent: 'center',
    margin: 10,
    width: '90%',
  },

  groupNameText: {
    fontSize: 21,
  },

  groupNameView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },

  header: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: 100,
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingRight: 20,
  },

  logo: {
    backgroundColor: COLORS.primaryColor,
    height: 80,
    width: 180,
  },

  question: {
    marginTop: 15,
    width: '90%',
  },

  quiz: {
    flex: 1,
  },

  titleText: {
    color: COLORS.primaryText,
    fontSize: 18,
  },
});

let userId = null;

const QuizForm = () => {
  const { t } = I18n;

  const dispatch = useDispatch();
  const store = useSelector((state) => state.quiz);

  const [firstPeriod, setFirstPeriod] = useState(store.answers.firstPeriod);
  const [lastPeriod, setLastPeriod] = useState(store.answers.lastPeriod);
  const [
    periodFrequency,
    setFrequency,
  ] = useState(store.answers.periodFrequency);
  const [periodLenght, setLenght] = useState(store.answers.periodLenght);

  useEffect(() => {
    const { answers } = store;
    setFirstPeriod(answers.firstPeriod);
    setLastPeriod(answers.lastPeriod);
    setFrequency(answers.periodFrequency);
    setLenght(answers.periodLenght);
  }, [store.answers]);

  useEffect(() => {
    async function loadQuiz() {
      userId = await getStorageData('userId');
      dispatch(loadQuizAnswers({ userId }));
    }

    loadQuiz();
  }, []);

  async function onSubmit() {
    dispatch(doSaveQuiz({
      data: {
        firstPerDate: firstPeriod,
        lastPerDate: lastPeriod,
        mensesFrecuency: periodFrequency,
        periodTime: periodLenght,
      },
      userId,
    }));
  }

  function validateFrequency() {
    return periodFrequency
      && (periodFrequency < MIN_FREQUENCY
        || periodFrequency > MAX_FREQUENCY
        || !testOnlyNumber(periodFrequency));
  }

  function onValidateFrequency() {
    return !validateFrequency() ? '' : 'lenght';
  }

  function validateLenght() {
    return periodLenght
      && (periodLenght < MIN_LENGHT
        || periodLenght > MAX_LENGHT
        || !testOnlyNumber(periodLenght));
  }

  function onLenghtError() {
    return !validateLenght() ? '' : 'lenght';
  }

  function validateFields() {
    return !periodFrequency
      || validateFrequency()
      || !periodLenght
      || validateLenght();
  }

  function disabledForm() {
    return store.saveSuccesful || store.id;
  }

  function renderSaveButton() {
    if (disabledForm()) {
      return null;
    }

    return (
      <TouchableButton
        disabled={validateFields()}
        loading={store.saving}
        onPress={onSubmit}
        tag="SaveQuiz"
        text={t('quizScreen.save')}
      />
    );
  }

  return (
    <>
      <View style={styles.header}>
        <Image
          resizeMethod="resize"
          resizeMode="center"
          style={styles.logo}
        />

        <Text style={styles.titleText}>{t('quizScreen.title')}</Text>
      </View>

      <View style={styles.quiz}>
        <View style={styles.disclaimerView}>
          <Text numberOfLines={3} style={styles.disclaimerText}>
            {t('quizScreen.disclaimer')}
          </Text>
        </View>

        <DatePicker
          date={firstPeriod}
          disabled={disabledForm()}
          label={t('quizScreen.firstPeriod')}
          setDate={setFirstPeriod}
          shimmer={store.loading}
          style={styles.datePicker}
          tag="First Period Date"
        />

        <DatePicker
          date={lastPeriod}
          disabled={disabledForm()}
          label={t('quizScreen.lastPeriod')}
          setDate={setLastPeriod}
          shimmer={store.loading}
          style={styles.datePicker}
          tag="Last Period Date"
        />

        <Input
          editable={!disabledForm()}
          errors={{ lenght: I18n.t('quizScreen.frequencyErrorMsg') }}
          keyboardType="numeric"
          label={t('quizScreen.periodFrequency')}
          onChangeText={setFrequency}
          onError={onValidateFrequency}
          placeholder={t('quizScreen.days')}
          shimmer={store.loading}
          value={periodFrequency}
        />

        <Input
          editable={!disabledForm()}
          errors={{ lenght: I18n.t('quizScreen.lenghtErrorMsg') }}
          keyboardType="numeric"
          label={t('quizScreen.periodLenght')}
          onChangeText={setLenght}
          onError={onLenghtError}
          placeholder={t('quizScreen.days')}
          shimmer={store.loading}
          value={periodLenght}
        />
      </View>

      {renderSaveButton()}

      {/* TODO: Validar sí es error o mensaje para poner de color rojo */}
      <Text style={styles.errorMessage}>{store.message}</Text>
    </>
  );
};

export { QuizForm };
