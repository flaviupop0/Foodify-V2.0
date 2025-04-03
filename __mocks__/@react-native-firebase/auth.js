const mockFirebaseUser = {
  uid: 'mock-uid',
  email: 'test@example.com',
  emailVerified: true,
  getIdToken: jest.fn(() => Promise.resolve('mocked-token')),
};

export default () => ({
  currentUser: mockFirebaseUser,
  onIdTokenChanged: jest.fn(callback => {
    callback(mockFirebaseUser);
    return jest.fn(); // unsubscribe function
  }),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve()),
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve()),
  sendPasswordResetEmail: jest.fn(() => Promise.resolve()),
  signOut: jest.fn(() => Promise.resolve()),
});

export const sendEmailVerification = jest.fn(() => Promise.resolve());
