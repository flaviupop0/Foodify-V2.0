import auth from '@react-native-firebase/auth';

const handleChangePassword = async (
  newPassword: string,
  confirmPassword: string,
  currentPassword: string,
) => {
  if (!newPassword.trim() || !confirmPassword.trim() || !currentPassword) {
    return false;
  }
  if (newPassword !== confirmPassword) {
    return 'Password must match';
  }

  const user = auth().currentUser;

  if (!user || !user.email) {
    return 'User not found';
  }

  const credential = auth.EmailAuthProvider.credential(
    user.email,
    currentPassword,
  );

  try {
    await user.reauthenticateWithCredential(credential);

    if (newPassword !== currentPassword) {
      await user?.updatePassword(newPassword);
      return true;
    }
    return 'password different';
  } catch (error: any) {
    if (error.code === 'auth/invalid-credential') {
      return 'Current password is incorrect';
    } else if (error.code === 'auth/weak-password') {
      return 'Password weak';
    }
    return error.code;
  }
};
export default handleChangePassword;
