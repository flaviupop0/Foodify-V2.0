/**
 * @format
 */

import 'react-native';
import React from 'react';
import ChangePassword from '../app/screens/ChangePassword/ChangePassword';
import SuccessChangePassword from '../app/screens/ChangePassword/SuccessChangePassword';
import {render} from '@testing-library/react-native';
import {it, jest} from '@jest/globals';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

it('renders correctly', () => {
  render(<ChangePassword navigation={mockNavigation} />);
});

it('renders correctly the success change password', () => {
  render(<SuccessChangePassword navigation={mockNavigation} />);
});
