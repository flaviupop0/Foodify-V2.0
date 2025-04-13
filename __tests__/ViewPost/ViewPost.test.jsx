import {jest, it, expect} from '@jest/globals';
import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import ViewPost from '../../app/screens/ViewPost/ViewPost';
import * as utilities from '../../app/screens/ViewPost/utilities';
import {useSelector} from 'react-redux';

jest.mock('@react-native-firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
  getDoc: jest.fn(() =>
    Promise.resolve({
      data: () => ({
        id: 'post1',
        title: 'Delicious Recipe',
        recipe: 'This is a test recipe.',
        datePosted: '2025-04-13T12:00:00Z',
        likes: [],
        savedBy: [],
        comments: [],
        pictures: [
          'https://example.com/photo1.jpg',
          'https://example.com/photo2.jpg',
        ],
        postedBy: 'user1',
      }),
    }),
  ),
  doc: jest.fn(),
  updateDoc: jest.fn(() => Promise.resolve(true)), // Optionally mock `doc` function if you use it directly
}));

const mockPostData = {
  id: 'post1',
  title: 'Delicious Recipe',
  recipe: 'This is a test recipe.',
  datePosted: '2025-04-13T12:00:00Z',
  likes: [],
  savedBy: [],
  comments: [],
  pictures: [
    'https://example.com/photo1.jpg',
    'https://example.com/photo2.jpg',
  ],
  postedBy: 'user1',
};

const mockCurrentUserData = {
  userName: 'Current User',
  profilePicture: 'https://example.com/current-user.jpg',
};

useSelector.mockReturnValue({
  ...mockCurrentUserData,
});
const mockRoute = {
  params: {
    postData: mockPostData,
    userData: mockCurrentUserData,
  },
};

const mockNavigation = {
  goBack: jest.fn(),
  navigate: jest.fn(),
  setParams: jest.fn(params => {
    mockRoute.params = {
      ...mockRoute.params,
      ...params,
    };
  }),
};

it('renders correctly', () => {
  const {getByText} = render(
    <ViewPost navigation={mockNavigation} route={mockRoute} />,
  );
  expect(getByText('Delicious Recipe')).toBeTruthy();
  expect(getByText('This is a test recipe.')).toBeTruthy();
  expect(getByText('0 Comments')).toBeTruthy();
  expect(getByText('0 Likes')).toBeTruthy();
});

it('handles like button press', async () => {
  const {getByText, getByTestId} = render(
    <ViewPost navigation={mockNavigation} route={mockRoute} />,
  );

  const likePostSpy = jest.spyOn(utilities, 'likePost');

  const likeButton = getByTestId('likeButton');
  fireEvent.press(likeButton);

  expect(likePostSpy).toHaveBeenCalledWith(
    'post1',
    'user1',
    false,
    mockCurrentUserData,
    mockNavigation,
    mockRoute.params,
  );

  await waitFor(() => {
    expect(mockRoute.params.postData.likes.length).toBe(1);
  });
  expect(getByText('1 Like')).toBeTruthy();
});
