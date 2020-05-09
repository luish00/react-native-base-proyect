import React, { useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import BottomTab from './componets/navigations/BottomTab';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/ProfileScreen';

import { startup } from './actions';
import { AlertConfirm } from './componets/AlertConfirm';
import { SnackBar } from './componets/common/SnackBar';

const Stack = createStackNavigator();

const AppRouter = () => {
  const dispatch = useDispatch();
  const store = useSelector((stores) => stores.session, shallowEqual);

  useEffect(() => {
    dispatch(startup());
  }, [store.startup]);

  const publicRoutes = (
    <NavigationContainer initialRouteName="Login">
      <Stack.Navigator>
        <Stack.Screen
          component={LoginScreen}
          name="Login"
          options={{
            header: () => <View />,
          }}
        />

        <Stack.Screen component={SignUpScreen} name="Sign Up" />

        <Stack.Screen component={ProfileScreen} name="Profile" />
      </Stack.Navigator>
    </NavigationContainer>
  );

  const privateRoutes = (
    <>
      <BottomTab />

      <SnackBar />

      <AlertConfirm />
    </>
  );

  function startApp() {
    if (!store.startup) {
      return <View />;
    }

    return (
      <>
        {store.token ? privateRoutes : publicRoutes}
      </>
    );
  }

  return startApp();
};

export { AppRouter };
