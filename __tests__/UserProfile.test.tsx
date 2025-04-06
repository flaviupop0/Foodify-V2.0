import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import UserProfile from '../app/screens/UserProfile/UserProfile';
import {getUserData, getAllPosts} from '../app/screens/UserProfile/utilities';
import {it, describe, expect, beforeEach} from '@jest/globals';

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('../app/screens/UserProfile/utilities', () => ({
  getUserData: jest.fn(() => Promise.resolve({})),
  getAllPosts: jest.fn(() => Promise.resolve([])),
}));

describe('UserProfile Component', () => {
  const mockNavigation = {
    goBack: jest.fn(),
    navigate: jest.fn(),
  };

  const mockRoute = {
    params: {
      userID: '123',
      fromSettings: true,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders the loader when isLoading is true', () => {
    const {getByTestId} = render(
      <UserProfile route={mockRoute} navigation={mockNavigation} />,
    );
    expect(getByTestId('CustomLoader')).toBeTruthy();
  });

  it('renders user data and posts when isLoading is false', async () => {
    const getUserDataSpy = jest.spyOn({getUserData}, 'getUserData');
    const getAllPostsSpy = jest.spyOn({getAllPosts}, 'getAllPosts');
    getUserDataSpy.mockResolvedValue({
      userName: 'JohnDoe',
      firstName: 'John',
      lastName: 'Doe',
      profilePicture: 'url-to-picture',
      posts: 5,
      followers: [1, 2],
      following: [3],
      bio: 'Hello, this is my bio!',
    });

    getAllPostsSpy.mockResolvedValue([
      {
        Comments: {},
        datePosted: '2025-04-05T10:33:32.000Z',
        id: 'TkTQR2zbXKztvZH84oFS',
        likes: [],
        pictures: [
          'https://firebasestorage.googleapis.com/v0/b/foodify-d46b8.appspot.com/o/posts%2F0DQccHVlXTSVw3IX6Rn0CtK8jkY2%2FfirstPost%2Fhamburger.jpg?alt=media&token=0c88d296-a324-44f5-add7-8bf00ddab4ca"',
        ],
        recipe: 'This is how i made my tasty hamburger:',
        title: 'Hamburger',
      },
    ]);

    const {getByText, getByTestId} = render(
      <UserProfile route={mockRoute} navigation={mockNavigation} />,
    );

    await waitFor(() => {
      expect(getByText('JohnDoe')).toBeTruthy();
      expect(getByText('Hello, this is my bio!')).toBeTruthy();
      expect(getByTestId('FlatList')).toBeTruthy();
    });
  });

  it('calls getUserData and getAllPosts with correct userID', async () => {
    const getUserDataSpy = jest.spyOn({getUserData}, 'getUserData');
    const getAllPostsSpy = jest.spyOn({getAllPosts}, 'getAllPosts');
    getUserDataSpy.mockResolvedValue(null);
    getAllPostsSpy.mockResolvedValue([]);

    render(<UserProfile route={mockRoute} navigation={mockNavigation} />);

    await waitFor(() => {
      expect(getUserDataSpy).toHaveBeenCalledWith('123');
      expect(getAllPostsSpy).toHaveBeenCalledWith('123');
    });
  });

  it('navigates back when the header back button is pressed', async () => {
    const getUserDataSpy = jest.spyOn({getUserData}, 'getUserData');
    const getAllPostsSpy = jest.spyOn({getAllPosts}, 'getAllPosts');
    getUserDataSpy.mockResolvedValue(null);
    getAllPostsSpy.mockResolvedValue([]);

    const {getByTestId} = render(
      <UserProfile route={mockRoute} navigation={mockNavigation} />,
    );

    fireEvent.press(getByTestId('backButton'));
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
