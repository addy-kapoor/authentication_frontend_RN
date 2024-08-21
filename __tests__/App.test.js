import 'react-native';
import React from 'react';
import App from '../App';
import {it} from '@jest/globals';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn(() => ({
    Navigator: 'Navigator',
    Screen: 'Screen',
  })),
}));

describe('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree[0].children.length).toBe(3);
  });
});

// global.fetch = jest.fn();

// // mocking an API success response once
// fetch.mockResponseIsSuccess = body => {
//   fetch.mockImplementationForOnce(() =>
//     Promise.resolve({json: () => Promise.resolve(JSON.parse(body))}),
//   );
// };

// // mocking an API failure response for once
// fetch.mockResponseIsFailure = error => {
//   fetch.mockImplementationForOnce(() => Promise.reject(error));
// };
