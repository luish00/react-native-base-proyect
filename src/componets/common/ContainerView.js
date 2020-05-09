import React from 'react';
import {
  KeyboardAvoidingView,
  // Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollView: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
});

const ContainerView = (props) => (
  <KeyboardAvoidingView
    // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    enabled
    style={styles.container}
  >
    <ScrollView keyboardShouldPersistTaps="always" style={styles.scrollView}>
      {props.children}
    </ScrollView>

  </KeyboardAvoidingView>
);

export { ContainerView };
