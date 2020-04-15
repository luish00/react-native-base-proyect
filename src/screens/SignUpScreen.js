import React from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginTop: 30,
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: 'blue',
    height: 40,
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fff',
  },
  textInput: {
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1,
  },
  textInputContainer: {
    paddingBottom: 18,
  },
});

class SignUpScreen extends React.PureComponent {
  render() {
    return (
      <KeyboardAvoidingView
        enabled
      >
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.textInputContainer}>
              <Text>First Name</Text>
              <TextInput
                returnKeyType="next"
                underlineColorAndroid="#e8e8e8"
              />
            </View>

            <View style={styles.textInputContainer}>
              <Text>Last Name</Text>
              <TextInput
                returnKeyType="next"
                underlineColorAndroid="#e8e8e8"
              />
            </View>

            <View style={styles.textInputContainer}>
              <Text>Email</Text>
              <TextInput
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="#e8e8e8"
              />
            </View>

            <View style={styles.textInputContainer}>
              <Text>Password</Text>
              <TextInput
                returnKeyType="next"
                secureTextEntry
                underlineColorAndroid="#e8e8e8"
              />
            </View>

            <View style={styles.textInputContainer}>
              <Text>Confirm Password</Text>
              <TextInput
                returnKeyType="go"
                secureTextEntry
                underlineColorAndroid="#e8e8e8"
              />
            </View>

            <TouchableWithoutFeedback>
              <View style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Sign Up</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default SignUpScreen;
