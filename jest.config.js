module.exports = {
  preset: 'react-native',
  transform: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  moduleNameMapper: {
    '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  setupFiles: ['<rootDir>/setup-jest.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-toast-message)/)',
  ],
};
