export const check = jest.fn(() => Promise.resolve('granted'));
export const request = jest.fn(() => Promise.resolve('granted'));

export const PERMISSIONS = {
  IOS: {
    LOCATION_WHEN_IN_USE: 'ios.permission.LOCATION_WHEN_IN_USE',
    CAMERA: 'ios.permission.CAMERA',
  },
  ANDROID: {
    CAMERA: 'android.permission.CAMERA',
    ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
  },
};

export const RESULTS = {
  UNAVAILABLE: 'unavailable',
  DENIED: 'denied',
  BLOCKED: 'blocked',
  GRANTED: 'granted',
  LIMITED: 'limited',
};
