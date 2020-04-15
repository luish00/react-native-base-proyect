/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View } from 'react-native'
import { Provider } from 'react-redux';

import { initializeStore } from './src/sagas/store';
import { AppRouter } from './src/AppRouter';

const App = () => (
  <Provider store={initializeStore()}>
    <AppRouter />
  </Provider>
);

export default App;
