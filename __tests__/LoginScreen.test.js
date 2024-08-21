import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import LoginScreen from '../Screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('axios', () => ({
  post: jest.fn(),
}));

const setup = () => {
  const utils = render(
    <NavigationContainer>
      <LoginScreen />
    </NavigationContainer>,
  );
  return {...utils};
};

describe('LoginScreen', () => {
  it('calls navigation.navigate on press', () => {
    const {getByTestId} = setup();
    const signUpButton = getByTestId('signUpButton');
    fireEvent.press(signUpButton);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('SignUp');
  });
});

describe('handleLoginPress', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls axios.post with correct URL and data', async () => {
    const {getByTestId} = setup();
    const logInButton = getByTestId('loginButton');
    fireEvent.press(logInButton);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      'http://192.168.1.4:8080/auth/login',
      {
        email: '',
        password: '',
      },
    );
  });

  it('navigates to Home screen and stores token in AsyncStorage on successful login', async () => {
    const {getByTestId} = setup();
    const logInButton = getByTestId('loginButton');
    const token = 'some-token';
    axios.post.mockResolvedValueOnce({data: {token}});
    fireEvent.press(logInButton);
    await new Promise(setImmediate);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('Home');
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('authToken', token);
  });

  it('sets error message on failed login', async () => {
    const {getByTestId, getByText} = setup();
    const logInButton = getByTestId('loginButton');
    axios.post.mockRejectedValueOnce(new Error('Login failed'));
    fireEvent.press(logInButton);
    const errorMessage = await waitFor(() =>
      getByText('Login failed. Please check your credentials and try again.'),
    );
    expect(errorMessage).toBeTruthy();
  });
});
