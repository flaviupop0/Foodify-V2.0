import React from 'react';
import 'react-native';
import DeleteAccount from '../app/screens/DeleteAccount/DeleteAccount';
import DeleteAccountSecondStep from '../app/screens/DeleteAccount/DeleteAccountSecondStep';
import DeleteAccountThirdStep from '../app/screens/DeleteAccount/DeleteAccountThirdStep';
import {it, jest, describe, expect} from '@jest/globals';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import * as deleteUtils from '../app/screens/DeleteAccount/utilities';
import auth from '@react-native-firebase/auth';

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

describe('Delete account is called when pressing on close the app button', () => {
  it('should call delete account function', () => {
    const {getByTestId} = render(<DeleteAccountThirdStep />);
    const deleteAccount = jest.spyOn(deleteUtils, 'deleteAccount');

    const button = getByTestId('deleteButton');
    fireEvent.press(button);

    expect(deleteAccount).toBeCalled();
  });
});

describe('Delete account works correctly', () => {
  it('should navigate back when pressing on go back button', () => {
    const {getByTestId} = render(<DeleteAccount navigation={mockNavigation} />);
    const backButton = getByTestId('backButton');
    fireEvent.press(backButton);

    expect(mockNavigation.goBack).toBeCalled();
  });

  it('should change the visibility of password both cases', () => {
    const {getByTestId} = render(<DeleteAccount navigation={mockNavigation} />);
    const passwordButton = getByTestId('changePasswordVisibilityButton');
    const input = getByTestId('passwordInput');

    fireEvent.press(passwordButton);
    expect(input.props.secureTextEntry).toBe(false);

    fireEvent.press(passwordButton);
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('should give an error if password not correct', async () => {
    const {getByTestId, getByText} = render(
      <DeleteAccount navigation={mockNavigation} />,
    );
    const button = getByTestId('nextButton');

    fireEvent.press(button);
    await waitFor(() => {
      expect(getByTestId('customError')).toBeTruthy();
    });
    expect(getByText('You must introduce your password')).toBeTruthy();
  });

  it('throws error when current password is wrong', async () => {
    const mockUser = auth().currentUser!;
    (mockUser.reauthenticateWithCredential as any).mockRejectedValueOnce({
      code: 'auth/invalid-credential',
    });

    const {getByTestId, getByText} = render(
      <DeleteAccount navigation={mockNavigation} />,
    );

    fireEvent.changeText(getByTestId('passwordInput'), 'wrongPass');
    fireEvent.press(getByTestId('nextButton'));

    await waitFor(() => {
      expect(getByTestId('customError')).toBeTruthy();
      expect(getByText('Current password is incorrect'));
    });
  });

  it('navigates when password is correct', async () => {
    const mockUser = auth().currentUser!;
    (mockUser.reauthenticateWithCredential as any).mockResolvedValue({});
    (mockUser.updatePassword as any).mockResolvedValue({});
    const {getByTestId} = render(<DeleteAccount navigation={mockNavigation} />);

    fireEvent.changeText(getByTestId('passwordInput'), 'correctPassword');
    await fireEvent.press(getByTestId('nextButton'));

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalled();
    });
  });

  it('should go back if i press either on x either on cancel button', () => {
    const {getByTestId} = render(
      <DeleteAccountSecondStep navigation={mockNavigation} />,
    );
    const goBack = jest.spyOn(deleteUtils, 'goBack');
    const xButton = getByTestId('goBackButton');
    const cancelButton = getByTestId('cancelButton');

    fireEvent.press(xButton);
    expect(goBack).toBeCalled();

    fireEvent.press(cancelButton);
    expect(goBack).toBeCalledTimes(2);
  });

  it('should navigate when pressing on confirm button', () => {
    const {getByTestId} = render(
      <DeleteAccountSecondStep navigation={mockNavigation} />,
    );
    const confirmButton = getByTestId('confirmButton');

    fireEvent.press(confirmButton);
    expect(mockNavigation.navigate).toBeCalled();
  });
});
