import 'react-native';
import React from 'react';
import ProfileSettings from '../app/screens/ProfileSettings/ProfileSettings';
import {it, jest} from '@jest/globals';
import {render} from '@testing-library/react-native';
import {useSelector} from 'react-redux';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const mockProfilePicture = 'https://example.com/path/to/profile.jpg';
const mockDateOfBirth = new Date();
(useSelector as unknown as jest.Mock).mockReturnValue({
  profilePicture: mockProfilePicture,
  dateOfBirth: mockDateOfBirth,
});

it('renders correctly', () => {
  render(<ProfileSettings navigation={mockNavigation} />);
});
