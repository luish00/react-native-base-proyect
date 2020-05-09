import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 3,
    elevation: 5,
    padding: 8,
  },
});

const CardView = (props) => (
  <View style={[styles.card, { ...props.style }]}>
    {props.children}
  </View>
);

export { CardView };
