import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

class HomeSreen extends React.PureComponent {
  render() {
    return (
      <View style={styles.content}>
        <Text>Home</Text>
      </View>
    );
  }
}

export default HomeSreen;
