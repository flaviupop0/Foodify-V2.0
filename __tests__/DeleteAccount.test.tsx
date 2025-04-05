import React from 'react';
import 'react-native';
import DeleteAccount from '../app/screens/DeleteAccount/DeleteAccount';
import DeleteAccountSecondStep from '../app/screens/DeleteAccount/DeleteAccountSecondStep';
import DeleteAccountThirdStep from '../app/screens/DeleteAccount/DeleteAccountThirdStep';
import {it, jest, describe} from '@jest/globals';
import {render} from '@testing-library/react-native';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
};

describe('All 3 parts are rendered', () => {
  it('should render correctly delete account', () => {
    render(<DeleteAccount navigation={mockNavigation} />);
  });

  it('should render correctly second delete account', () => {
    render(<DeleteAccountSecondStep navigation={mockNavigation} />);
  });

  it('should render correctly third delete account', () => {
    render(<DeleteAccountThirdStep />);
  });
});
