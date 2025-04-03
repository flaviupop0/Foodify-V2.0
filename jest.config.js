module.exports = {
  preset: 'react-native',
  collectCoverage: true,
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
};
