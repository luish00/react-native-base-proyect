import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../../screens/HomeScreen';

import { CustomDrawerContent } from './CustomDrawerContent';
import { DrawerLeftButton } from './DrawerLeftButton';

const styles = StyleSheet.create({
  menuItem: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

// Documentantion link https://reactnavigation.org/docs/drawer-navigator/
export default function DrawerMenu() {
  function NotificationsScreen({ navigation }) {
    return (
      <View style={styles.menuItem}>
        <Button onPress={navigation.goBack} title="Go back home" />
      </View>
    );
  }

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
        <Drawer.Screen component={NotificationsScreen} name="Notifications" />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
