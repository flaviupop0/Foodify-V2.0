export default {
  openPicker: jest.fn(() =>
    Promise.resolve({
      path: 'mocked/path/image.jpg',
      mime: 'image/jpeg',
      width: 400,
      height: 300,
    }),
  ),
  openCamera: jest.fn(() =>
    Promise.resolve({
      path: 'mocked/path/camera-image.jpg',
      mime: 'image/jpeg',
      width: 800,
      height: 600,
    }),
  ),
  clean: jest.fn(() => Promise.resolve()),
  cropImage: jest.fn(() =>
    Promise.resolve({
      path: 'mocked/path/cropped.jpg',
      width: 200,
      height: 200,
    }),
  ),
};
