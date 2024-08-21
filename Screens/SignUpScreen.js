import React from 'react';
import {
  TouchableOpacity,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {Formik} from 'formik';
import * as Yup from 'yup';

const logo = require('../assets/logo.png');

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be 10 digits')
    .required('Phone Number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function SignUpScreen() {
  const navigation = useNavigation();

  const handleSignUpPress = async values => {
    const {fullName, email, phoneNumber, password} = values;
    try {
      const response = await fetch('http://192.168.1.4:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          phoneNo: phoneNumber,
          fullName: fullName,
        }),
      });
      if (response.ok) {
        const data = await response.text();
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Sign Up Successful',
          text2: 'You have signed up successfully.',
        });
      } else {
        const errorMessage = await response.text();
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Issue in SignUp',
          text2: errorMessage,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Network Error',
        text2: 'An unexpected error occurred. Please try again.',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={logo} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>Sign Up</Text>
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            phoneNumber: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSignUpPress}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.inputView}>
              <TextInput
                style={[
                  styles.input,
                  errors.fullName && touched.fullName && {borderColor: 'red'},
                ]}
                placeholder="Full Name"
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
                autoCorrect={false}
                autoCapitalize="words"
                placeholderTextColor="black"
              />
              {errors.fullName && touched.fullName && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}
              <TextInput
                style={[
                  styles.input,
                  errors.email && touched.email && {borderColor: 'red'},
                ]}
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="black"
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <TextInput
                style={[
                  styles.input,
                  errors.phoneNumber &&
                    touched.phoneNumber && {borderColor: 'red'},
                ]}
                placeholder="Phone Number"
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="phone-pad"
                placeholderTextColor="black"
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}
              <TextInput
                style={[
                  styles.input,
                  errors.password && touched.password && {borderColor: 'red'},
                ]}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                autoCorrect={false}
                autoCapitalize="none"
                placeholderTextColor="black"
              />
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <View style={styles.buttonView}>
                <Pressable style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>SIGN UP</Text>
                </Pressable>
              </View>
            </View>
          )}
        </Formik>

        <View style={styles.footerView}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signup}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 50,
  },
  image: {
    height: 130,
    width: 130,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    paddingVertical: 20,
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
    paddingTop: 20,
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
    fontSize: 12,
  },
});
