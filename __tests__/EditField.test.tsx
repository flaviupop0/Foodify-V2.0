import React from 'react';
import 'react-native';
import EditFieldScreen from '../app/screens/EditFieldScreen/EditFieldScreen';
import {it, jest, describe, expect} from '@jest/globals';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import auth, {updateEmail} from '@react-native-firebase/auth';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const route = {
  params: {
    fieldName: 'Email',
    initialValue: 'test@gmail.com',
    onSave: jest.fn(),
    fieldUpdate: 'email',
  },
};

describe('Edit field is rendered correctly with email props', () => {
  it('should render correctly when changing email', () => {
    render(<EditFieldScreen route={route} navigation={mockNavigation} />);
  });

  it('should go back when pressing on back button', () => {
    const {getByTestId} = render(
      <EditFieldScreen route={route} navigation={mockNavigation} />,
    );
    const goBackButton = getByTestId('backButton');
    fireEvent.press(goBackButton);
    expect(mockNavigation.goBack).toBeCalled();
  });

  it('should make the password visible when pressing on the visibility button', () => {
    const {getByTestId} = render(
      <EditFieldScreen route={route} navigation={mockNavigation} />,
    );
    const visibilityButton = getByTestId('setPasswordVisibleButton');
    const input = getByTestId('passwordInput');

    fireEvent.press(visibilityButton);
    expect(input.props.secureTextEntry).toBe(false);

    fireEvent.press(visibilityButton);
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('should show error when handleSave is called with empty value field', async () => {
    const {getByTestId, getByText, queryByTestId} = render(
      <EditFieldScreen route={route} navigation={mockNavigation} />,
    );
    const input = getByTestId('valueField');
    const button = getByTestId('saveButton');
    fireEvent.changeText(input, '');
    await fireEvent.press(button);

    expect(getByTestId('customError')).toBeTruthy();
    expect(getByText('Email cannot be empty'));
  });

  it('shows error when password is incorrect', async () => {
    const mockUser = auth().currentUser!;
    (mockUser.reauthenticateWithCredential as any).mockRejectedValueOnce({
      code: 'auth/wrong-password',
    });
    const {getByTestId, getByText} = render(
      <EditFieldScreen route={route} navigation={mockNavigation} />,
    );

    const input = getByTestId('passwordInput');
    const button = getByTestId('saveButton');

    fireEvent.changeText(input, 'wrongPassword');
    await fireEvent.press(button);

    await waitFor(() => {
      expect(getByTestId('customError')).toBeTruthy();
      expect(getByText('Your current password is wrong'));
    });
  });

  it('updates email and sends verification', async () => {
    const mockUser = auth().currentUser!;
    (mockUser.reauthenticateWithCredential as any).mockResolvedValueOnce({});
    (mockUser.getIdToken as any).mockResolvedValueOnce('mock-token');

    const {getByTestId} = render(
      <EditFieldScreen route={route} navigation={mockNavigation} />,
    );

    fireEvent.changeText(getByTestId('valueField'), 'newemail@example.com');
    fireEvent.changeText(getByTestId('passwordInput'), 'correctPassword');

    await fireEvent.press(getByTestId('saveButton'));

    await waitFor(() => {
      expect(mockUser.reauthenticateWithCredential).toHaveBeenCalled();
      expect(updateEmail).toHaveBeenCalled();
    });
  });

  it('throws error if email already in use', async () => {
    const mockUser = auth().currentUser!;
    (mockUser.reauthenticateWithCredential as any).mockResolvedValueOnce({});
    (updateEmail as any).mockRejectedValueOnce({
      code: 'auth/email-already-in-use',
    });
    (mockUser.getIdToken as any).mockResolvedValueOnce('mock-token');

    const {getByTestId, getByText} = render(
      <EditFieldScreen route={route} navigation={mockNavigation} />,
    );

    fireEvent.changeText(getByTestId('valueField'), 'newemail@example.com');
    fireEvent.changeText(getByTestId('passwordInput'), 'correctPassword');

    await fireEvent.press(getByTestId('saveButton'));

    await waitFor(() => {
      expect(getByTestId('customError')).toBeTruthy();
      expect(
        getByText('The email address is already in use by another account'),
      );
    });
  });
});
