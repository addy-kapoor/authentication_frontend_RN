import React, {useState} from 'react';
import {
  TouchableOpacity,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logo = require('../assets/logo.png');

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const handleLoginPress = async () => {
    try {
      const response = await axios.post('http://192.168.1.4:8080/auth/login', {
        email: username,
        password: password,
      });
      const {token} = response.data;
      console.log('Login successful, token:', token);
      await AsyncStorage.setItem('authToken', token);
      navigation.navigate('Home');
      console.log('after navigation');
    } catch (error) {
      console.error(
        'Login failed:',
        error.response ? error.response.data : error.message,
      );
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={logo}
        style={styles.image}
        resizeMode="contain"
        testID="logo"
      />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="EMAIL OR USERNAME"
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.input}
          placeholder="PASSWORD"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor="black"
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.buttonView}>
        <Pressable
          style={styles.button}
          onPress={handleLoginPress}
          testID="loginButton">
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
      </View>

      <View style={styles.footerView}>
        <Text style={styles.footerText}>Don't Have an Account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          testID="signUpButton">
          <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 70,
  },
  image: {
    height: 160,
    width: 170,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    paddingVertical: 40,
    color: 'red',
  },
  inputView: {
    gap: 15,
    width: '100%',
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 7,
    color: 'black',
  },
  button: {
    backgroundColor: 'red',
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonView: {
    width: '100%',
    paddingHorizontal: 50,
    paddingTop: 10,
  },
  footerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  footerText: {
    color: 'gray',
  },
  signup: {
    color: 'red',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  errorText: {
    color: 'red',
    padding: 10,
    textAlign: 'center',
  },
});
