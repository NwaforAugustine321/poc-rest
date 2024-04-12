import {
  AuthState,
  IReduxLogin,
  IReduxSelectedRole,
} from '@/interfaces/auth.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  selectedRole: '',
  name: '',
  email: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IReduxLogin>): void => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
      (state.email = action.payload.email), (state.name = action.payload.name);
    },
    setSelectedRole: (
      state,
      action: PayloadAction<IReduxSelectedRole>
    ): void => {
      state.selectedRole = action.payload.selectedRole;
    },
    logout: (state, action: PayloadAction<void>): void => {
      state.isAuthenticated = false;
      state.token = '';
      state.email = '';
      state.name = '';
    },
  },
});

export const { login, setSelectedRole, logout } = authSlice.actions;

export default authSlice.reducer;
