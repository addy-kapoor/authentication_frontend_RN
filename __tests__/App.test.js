/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {it} from '@jest/globals';
import renderer from 'react-test-renderer';
import {createNativeStackNavigator} from '@react-navigation/stack';

it('renders correctly', () => {
  renderer.create(<App />);
});

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn(() => ({
    Navigator: 'Navigator',
    Screen: 'Screen',
  })),
}));
