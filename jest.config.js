module.exports = {
  preset: 'react-native',
  collectCoverage: true,
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-community|expo|react-native-svg)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  coveragePathIgnorePatterns: [
    '/__mocks__/',
    '/node_modules/',
    '<rootDir>/android/',
    '<rootDir>/ios/',
    '<rootDir>/.github/',
    '<rootDir>/.bundle/',
  ],
};
