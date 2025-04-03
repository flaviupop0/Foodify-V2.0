export default {
  getVersion: jest.fn(() => '1.0.0'),
  getBuildNumber: jest.fn(() => '100'),
  getSystemName: jest.fn(() => 'iOS'),
  getSystemVersion: jest.fn(() => '14.4'),
  getBrand: jest.fn(() => 'Apple'),
  getModel: jest.fn(() => 'iPhone 12'),
  getDeviceId: jest.fn(() => 'mock-device-id'),
  getUniqueId: jest.fn(() => 'mock-unique-id'),
  hasNotch: jest.fn(() => false),
};
