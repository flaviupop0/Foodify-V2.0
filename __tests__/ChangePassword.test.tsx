/**
 * @format
 */

import 'react-native';
import React from 'react';
import ChangePassword from '../app/screens/ChangePassword/ChangePassword';
import SuccessChangePassword from '../app/screens/ChangePassword/SuccessChangePassword';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {it, jest, describe, expect} from '@jest/globals';

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

describe('ChangePassword Component', () => {
  it('should display CustomError component when error state is set', async () => {
    const {getByText, getByTestId} = render(
      <ChangePassword navigation={mockNavigation} />,
    );

    const nextButton = getByText('Next');

    fireEvent.press(nextButton);

    await waitFor(() => {
      expect(getByTestId('error-message')).toBeTruthy();
    });

    expect(getByText('All fields must be completed')).toBeTruthy();
  });
});
