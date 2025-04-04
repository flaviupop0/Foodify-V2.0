import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  profile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.profile = action.payload;
    },
    updateUserProfilePicture(state, action) {
      if (state.profile) {
        state.profile.profilePicture = action.payload;
      }
    },
    clearUser(state) {
      state.profile = null;
    },
    updateUserProfile(state, action) {
      if (state.profile) {
        Object.assign(state.profile, action.payload);
      }
    },
  },
});

export const {setUser, updateUserProfilePicture, clearUser, updateUserProfile} =
  userSlice.actions;
export default userSlice.reducer;
