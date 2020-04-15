import React, { useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import DrawerMenu from './componets/navigations/DrawerMenu';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

import { startup } from './actions';

const Stack = createStackNavigator();

const AppRouter = () => {
  const dispatch = useDispatch();
  const store = useSelector((session) => session, shallowEqual);

  useEffect(() => {
    dispatch(startup());
  }, []);

  const publicRoutes = (
    <NavigationContainer initialRouteName="Login">
      <Stack.Navigator>
        <Stack.Screen component={LoginScreen} name="Login" />
        <Stack.Screen component={SignUpScreen} name="SignUp" />
      </Stack.Navigator>
    </NavigationContainer>
  );

  const privateRoutes = <DrawerMenu />;

  function startApp() {
    const { session } = store;

    if (!session.startup) {
      return <View />;
    }

    return (
      <>
        {session.token ? privateRoutes : publicRoutes}
      </>
    );
  }

  return startApp();
};

export { AppRouter };
