
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface UserState {
  fullName: string;
  email: string;
  bio: string;
  avatar: string;
  token: string | null;
}

const initialState: UserState = {
  fullName: '',
  email: '',
  bio: '',
  avatar: '',
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.bio = action.payload.bio;
      state.avatar = action.payload.avatar;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
