export default () => ({
  ref: jest.fn(() => ({
    putFile: jest.fn(() => Promise.resolve({state: 'success'})),
    getDownloadURL: jest.fn(() =>
      Promise.resolve('https://mocked-url.com/image.jpg'),
    ),
    delete: jest.fn(() => Promise.resolve()),
  })),
});
