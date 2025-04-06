import {
  getUserData,
  getAllPosts,
} from '../../app/screens/UserProfile/utilities';
import firestore from '@react-native-firebase/firestore';
import mockFirestore from 'firestore-jest-mock/mocks/firestore';

jest.mock('@react-native-firebase/firestore', () => () => mockFirestore);

describe('getUserData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return user data if document exists', async () => {
    const userData = {name: 'John Doe'};
    const getMock = jest.fn().mockResolvedValue({
      exists: true,
      data: () => userData,
    });
    const docMock = jest.fn(() => ({get: getMock}));
    const collectionMock = jest.fn(() => ({doc: docMock}));
    firestore().collection = collectionMock;

    const result = await getUserData('userID');

    expect(collectionMock).toHaveBeenCalledWith('users');
    expect(docMock).toHaveBeenCalledWith('userID');
    expect(result).toEqual(userData);
  });

  it('should return null if document does not exist', async () => {
    const getMock = jest.fn().mockResolvedValue({exists: false});
    const docMock = jest.fn(() => ({get: getMock}));
    const collectionMock = jest.fn(() => ({doc: docMock}));
    firestore().collection = collectionMock;

    const result = await getUserData('nonexistent');
    expect(result).toBeNull();
  });

  it('should return null on error', async () => {
    const error = new Error('Test error');
    const getMock = jest.fn().mockRejectedValue(error);
    const docMock = jest.fn(() => ({get: getMock}));
    const collectionMock = jest.fn(() => ({doc: docMock}));
    firestore().collection = collectionMock;

    const result = await getUserData('userID');
    expect(result).toBeNull();
  });
});

describe('getAllPosts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return posts array if posts are found', async () => {
    const postsSnapshot = {
      forEach: callback => {
        [
          {id: '1', title: 'Post 1'},
          {id: '2', title: 'Post 2'},
        ].forEach(post => {
          callback({id: post.id, data: () => ({title: post.title})});
        });
      },
    };

    // Create the chain for orderBy -> limit -> get manually
    const getMock = jest.fn().mockResolvedValue(postsSnapshot);
    const limitMock = jest.fn(() => ({get: getMock}));
    const orderByMock = jest.fn(() => ({limit: limitMock}));

    // Now set up the chain from the collection("users").doc(userID).collection("posts")
    const postsCollectionMock = {
      orderBy: orderByMock,
    };

    // For the inner document chain:
    const docMock = jest.fn(() => ({
      collection: jest.fn(() => postsCollectionMock),
    }));

    // For the outer chain starting at "users"
    const collectionMock = jest.fn(() => ({doc: docMock}));

    // Override firestore().collection to return our chain
    firestore().collection = collectionMock;

    const result = await getAllPosts('userID');

    expect(collectionMock).toHaveBeenCalledWith('users');
    expect(docMock).toHaveBeenCalledWith('userID');
    expect(orderByMock).toHaveBeenCalledWith('datePosted', 'desc');
    expect(result).toEqual([
      {id: '1', title: 'Post 1'},
      {id: '2', title: 'Post 2'},
    ]);
  });

  it('should return an empty array on error', async () => {
    const getMock = jest.fn().mockRejectedValue(new Error('Test error'));
    const limitMock = jest.fn(() => ({get: getMock}));
    const orderByMock = jest.fn(() => ({limit: limitMock}));
    const postsCollectionMock = jest.fn(() => ({orderBy: orderByMock}));
    const docMock = jest.fn(() => ({
      collection: jest.fn(() => postsCollectionMock),
    }));
    const collectionMock = jest.fn(() => ({doc: docMock}));
    firestore().collection = collectionMock;

    const result = await getAllPosts('userID');
    expect(result).toEqual([]);
  });
});
