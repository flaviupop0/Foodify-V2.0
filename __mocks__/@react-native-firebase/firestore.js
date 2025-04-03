export default () => ({
  collection: jest.fn(() => ({
    doc: jest.fn(() => ({
      get: jest.fn(() =>
        Promise.resolve({exists: true, data: () => ({mockField: 'value'})}),
      ),
      set: jest.fn(() => Promise.resolve()),
      update: jest.fn(() => Promise.resolve()),
      delete: jest.fn(() => Promise.resolve()),
      onSnapshot: jest.fn(success => {
        success({exists: true, data: () => ({mockField: 'live'})});
        return () => {}; // unsubscribe
      }),
    })),
    add: jest.fn(() => Promise.resolve({id: 'mock-doc-id'})),
    where: jest.fn(() => ({
      get: jest.fn(() =>
        Promise.resolve({
          docs: [{id: 'mock-id', data: () => ({mockField: 'value'})}],
        }),
      ),
    })),
  })),
});
