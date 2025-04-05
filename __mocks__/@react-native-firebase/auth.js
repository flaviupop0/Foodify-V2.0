const mockFirebaseUser = {
  uid: 'mock-uid',
  email: 'test@example.com',
  emailVerified: true,
  getIdToken: jest.fn(() => Promise.resolve('mocked-token')),
  reauthenticateWithCredential: jest.fn(() => Promise.resolve()),
  updatePassword: jest.fn(() => Promise.resolve()),
};

const mockUpdateEmail = jest.fn();
const mockSendEmailVerification = jest.fn(() => Promise.resolve());

const mockAuth = {
  currentUser: mockFirebaseUser,
  onIdTokenChanged: jest.fn(callback => {
    callback(mockFirebaseUser);
    return jest.fn();
  }),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve()),
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve()),
  sendPasswordResetEmail: jest.fn(() => Promise.resolve()),
  signOut: jest.fn(() => Promise.resolve()),
  EmailAuthProvider: {
    credential: jest.fn((email, password) => ({
      email,
      password,
    })),
  },
};

const auth = () => mockAuth;

auth.EmailAuthProvider = {
  credential: jest.fn((email, password) => ({
    email,
    password,
    __mock: true,
  })),
};

module.exports = {
  __esModule: true,
  default: auth,
  updateEmail: mockUpdateEmail,
  sendEmailVerification: mockSendEmailVerification,

  _mockFirebaseUser: mockFirebaseUser,
  _mockUpdateEmail: mockUpdateEmail,
  _mockSendEmailVerification: mockSendEmailVerification,
};
