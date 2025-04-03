/**
 * @format
 */

import 'react-native';
import React from 'react';
import ChangePassword from '../app/screens/ChangePassword/ChangePassword';
import SuccessChangePassword from '../app/screens/ChangePassword/SuccessChangePassword';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {it, jest, describe, expect} from '@jest/globals';
import {successChangedPassword} from '../app/screens/ChangePassword/assets';
import auth from '@react-native-firebase/auth';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
};

it('renders correctly', () => {
  render(<ChangePassword navigation={mockNavigation} />);
});

describe('Sucess Change Password', () => {
  it('renders all UI elements correctly', () => {
    const {getByTestId} = render(
      <SuccessChangePassword navigation={mockNavigation} />,
    );
    expect(getByTestId('successContainer')).toBeTruthy();

    //title
    const titleText = getByTestId('titleText');
    expect(titleText.props.children).toBe(
      'Your password has been changed successfully',
    );

    //image
    const image = getByTestId('successImage');
    expect(image.props.source).toBe(successChangedPassword);

    //button
    expect(getByTestId('navigationButton')).toBeTruthy();
    const buttonText = getByTestId('buttonText');
    expect(buttonText.props.children).toBe('Go to settings');
  });

  it('should navigate when press on button', () => {
    const {getByTestId} = render(
      <SuccessChangePassword navigation={mockNavigation} />,
    );
    const button = getByTestId('navigationButton');
    fireEvent.press(button);

    expect(mockNavigation.reset).toBeCalled();
  });
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

  it('should navigate back when pressing on the back button on header', () => {
    const {getByTestId} = render(
      <ChangePassword navigation={mockNavigation} />,
    );

    const backButton = getByTestId('backButton');
    fireEvent.press(backButton);

    expect(mockNavigation.goBack).toBeCalled();
  });

  it('should display the UI correctly', () => {
    const {getByTestId} = render(
      <ChangePassword navigation={mockNavigation} />,
    );

    //title
    const headerTitle = getByTestId('headerTitle');
    expect(headerTitle.props.children).toBe(
      'Your new password must be different from previously used password',
    );

    //text inputs and visibility password button
    expect(getByTestId('currentPasswordInput')).toBeTruthy();
    expect(getByTestId('visibilityCurrentButton')).toBeTruthy();
    expect(getByTestId('newPasswordInput')).toBeTruthy();
    expect(getByTestId('visibilityNewButton')).toBeTruthy();
    expect(getByTestId('confirmPasswordInput')).toBeTruthy();
    expect(getByTestId('visibilityConfirmButton')).toBeTruthy();

    //change password button
    expect(getByTestId('changePasswordButton')).toBeTruthy();
  });

  it('should change the state correctly when pressing on the visibility buttons', () => {
    const {getByTestId} = render(
      <ChangePassword navigation={mockNavigation} />,
    );
    const textInput = getByTestId('currentPasswordInput');
    expect(textInput.props.secureTextEntry).toBe(true);

    const visiblityButton = getByTestId('visibilityCurrentButton');
    fireEvent.press(visiblityButton);
    expect(textInput.props.secureTextEntry).toBe(false);

    fireEvent.press(visiblityButton);
    expect(textInput.props.secureTextEntry).toBe(true);

    const textInput2 = getByTestId('newPasswordInput');
    expect(textInput2.props.secureTextEntry).toBe(true);

    const visiblityButton2 = getByTestId('visibilityNewButton');
    fireEvent.press(visiblityButton2);
    expect(textInput2.props.secureTextEntry).toBe(false);

    fireEvent.press(visiblityButton2);
    expect(textInput2.props.secureTextEntry).toBe(true);

    const textInput3 = getByTestId('confirmPasswordInput');
    expect(textInput3.props.secureTextEntry).toBe(true);

    const visiblityButton3 = getByTestId('visibilityConfirmButton');
    fireEvent.press(visiblityButton3);
    expect(textInput3.props.secureTextEntry).toBe(false);

    fireEvent.press(visiblityButton3);
    expect(textInput3.props.secureTextEntry).toBe(true);
  });

  it('throws error when password dont match', async () => {
    const {getByTestId, getByText} = render(
      <ChangePassword navigation={mockNavigation} />,
    );
    const textInput = getByTestId('currentPasswordInput');
    const textInput2 = getByTestId('newPasswordInput');
    const textInput3 = getByTestId('confirmPasswordInput');
    const changePasswordButton = getByTestId('changePasswordButton');

    fireEvent.changeText(textInput, 'test');
    fireEvent.changeText(textInput2, 'test1');
    fireEvent.changeText(textInput3, 'test2');
    fireEvent.press(changePasswordButton);
    await waitFor(() => {
      expect(getByTestId('error-message')).toBeTruthy();
    });
    expect(getByText('Password must match')).toBeTruthy();
  });

  it('throws error when current password is wrong', async () => {
    const mockUser = auth().currentUser!;
    (mockUser.reauthenticateWithCredential as any).mockRejectedValueOnce({
      code: 'auth/invalid-credential',
    });

    const {getByTestId, getByText} = render(
      <ChangePassword navigation={mockNavigation} />,
    );

    fireEvent.changeText(getByTestId('currentPasswordInput'), 'wrongpass');
    fireEvent.changeText(getByTestId('newPasswordInput'), 'newpass123');
    fireEvent.changeText(getByTestId('confirmPasswordInput'), 'newpass123');

    fireEvent.press(getByTestId('changePasswordButton'));

    await waitFor(() => {
      expect(getByTestId('error-message')).toBeTruthy();
      expect(getByText('Current password is incorrect.')).toBeTruthy();
    });
  });

  it('throws error when new password is weak', async () => {
    const mockUser = auth().currentUser!;
    (mockUser.updatePassword as any).mockRejectedValueOnce({
      code: 'auth/weak-password',
    });

    const {getByTestId, getByText} = render(
      <ChangePassword navigation={mockNavigation} />,
    );

    fireEvent.changeText(getByTestId('currentPasswordInput'), 'wrongpass');
    fireEvent.changeText(getByTestId('newPasswordInput'), 'test');
    fireEvent.changeText(getByTestId('confirmPasswordInput'), 'test');

    fireEvent.press(getByTestId('changePasswordButton'));

    await waitFor(() => {
      expect(getByTestId('error-message')).toBeTruthy();
      expect(
        getByText(
          'The password must contain at least 8 characters, one uppercase character, one lowercase character and a special character/number',
        ),
      ).toBeTruthy();
    });
  });

  it('throws error when current password is identical to new', async () => {
    const {getByTestId, getByText} = render(
      <ChangePassword navigation={mockNavigation} />,
    );

    fireEvent.changeText(getByTestId('currentPasswordInput'), 'wrongpass');
    fireEvent.changeText(getByTestId('newPasswordInput'), 'wrongpass');
    fireEvent.changeText(getByTestId('confirmPasswordInput'), 'wrongpass');

    fireEvent.press(getByTestId('changePasswordButton'));

    await waitFor(() => {
      expect(getByTestId('error-message')).toBeTruthy();
      expect(
        getByText('Your new password must be different to the current one'),
      ).toBeTruthy();
    });
  });

  it('navigates when no errors are thrown (successful password change)', async () => {
    const mockUser = auth().currentUser!;
    (mockUser.reauthenticateWithCredential as any).mockResolvedValue({});
    (mockUser.updatePassword as any).mockResolvedValue({});

    const {getByTestId} = render(
      <ChangePassword navigation={mockNavigation} />,
    );

    fireEvent.changeText(getByTestId('currentPasswordInput'), 'oldpass123');
    fireEvent.changeText(getByTestId('newPasswordInput'), 'newpass456');
    fireEvent.changeText(getByTestId('confirmPasswordInput'), 'newpass456');

    await fireEvent.press(getByTestId('changePasswordButton'));

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalled();
    });
  });
});
