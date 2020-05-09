import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../../screens/HomeScreen';

import { CustomDrawerContent } from './CustomDrawerContent';
import { DrawerLeftButton } from './DrawerLeftButton';
import PaymentMethodScreen from '../../screens/PaymentMethodScreen';

// Documentantion link https://reactnavigation.org/docs/drawer-navigator/
export default function DrawerMenu() {
  const Drawer = createDrawerNavigator();

  function drawerContent(props) {
    return (
      <CustomDrawerContent {...props} />
    );
  }

  function HomeStackScreen(props) {
    const Stack = createStackNavigator();

    return (
      <Stack.Navigator>
        <Stack.Screen
          component={HomeScreen}
          name="Home"
          options={{
            headerLeft: () => (
              <DrawerLeftButton drawerProps={{ ...props }} />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={drawerContent} initialRouteName="Home">
        <Drawer.Screen component={HomeStackScreen} name="Home" />
        <Drawer.Screen component={PaymentMethodScreen} name="Payment Method" />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
