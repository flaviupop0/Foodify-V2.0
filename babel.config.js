module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-react',
    '@babel/preset-typescript',
    '@babel/preset-env',
  ],
  plugins: [
    'react-native-reanimated/plugin',
    '@babel/plugin-transform-react-jsx',
  ],
};
