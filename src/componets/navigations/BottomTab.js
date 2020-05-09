import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

import HomeScreen from '../../screens/HomeScreen';
import PaymentMethodScreen from '../../screens/PaymentMethodScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import QuizScreen from '../../screens/QuizScreen';

import { COLORS } from '../../assets/colors';

// Documentantion link https://reactnavigation.org/docs/tab-based-navigation
export default function DrawerMenu() {
  const routeNameRef = useRef();
  const navigationRef = useRef();
  const Tab = createBottomTabNavigator();

  function HomeStackScreen() {
    const Stack = createStackNavigator();

    return (
      <Stack.Navigator>
        <Stack.Screen component={HomeScreen} name="Home" />
      </Stack.Navigator>
    );
  }

  function SettingsStackScreen() {
    const Stack = createStackNavigator();

    return (
      <Stack.Navigator>
        <Stack.Screen component={SettingsScreen} name="Settings" />

        <Stack.Screen component={PaymentMethodScreen} name="Payment Method" />
      </Stack.Navigator>
    );
  }

  // Gets the current screen from navigation state
  const getActiveRouteName = (state) => {
    const route = state.routes[state.index];

    if (route.state) {
      // Dive into nested navigators
      return getActiveRouteName(route.state);
    }

    return route.name;
  };

  function onStateChange(state) {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = getActiveRouteName(state);

    if (previousRouteName !== currentRouteName) {
      // Change this line to use another Mobile analytics SDK
    }

    // Save the current route name for later comparision
    routeNameRef.current = currentRouteName;
  }

  function tabBarIcon(navigation) {
    function options({ focused, color }) {
      let iconName;

      switch (navigation.route.name) {
        case 'Home': {
          iconName = focused ? 'home' : 'home-outline';
          break;
        }

        case 'Quiz': {
          iconName = focused ? 'water' : 'water-outline';
          break;
        }

        case 'Settings': {
          iconName = focused ? 'settings' : 'settings-outline';
          break;
        }

        default:
          iconName = '';
      }

      return (
        <Icon
          color={focused ? COLORS.secondaryColor : color}
          name={iconName}
          type="material-community"
        />
      );
    }

    return { tabBarIcon: options };
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={onStateChange}
    >
      <Tab.Navigator initialRouteName="Home" screenOptions={tabBarIcon}>
        <Tab.Screen component={HomeStackScreen} name="Home" />

        <Tab.Screen component={QuizScreen} name="Quiz" />

        <Tab.Screen component={SettingsStackScreen} name="Settings" />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
