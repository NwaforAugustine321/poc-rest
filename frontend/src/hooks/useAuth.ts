import { useDispatch } from 'react-redux';
import { post } from '@/utils/axios';
import { AuthState, ILogin, ISignup } from '@/interfaces/auth.interface';
import { setSelectedRole, login, logout } from '@/redux/reducers/auth.reducer';
import { useAppSelector } from './storeshooks';
import { RootState } from '@/redux/store';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated, selectedRole } = useAppSelector(
    (state: RootState): AuthState => state.auth
  );

  const loginAccount = async (payload: ILogin): Promise<void> => {
    try {
      const response = await post('/users/login', payload);
      const { token, name, email } = response.data;
      dispatch(
        login({
          isAuthenticated: true,
          token,
          name,
          email,
        })
      );
    } catch (error) {
      throw error;
    }
  };

  const signup = async (payload: ISignup): Promise<any> => {
    try {
      return await post('/users/signup', payload);
    } catch (error) {
      throw error;
    }
  };

  const logoutAccount = async (): Promise<void> => {
    try {
      dispatch(logout());
    } catch (error) {
      throw error;
    }
  };

  const setSignupSelectedRole = async (role: string): Promise<void> => {
    try {
      dispatch(
        setSelectedRole({
          selectedRole: role,
        })
      );
    } catch (error) {
      throw error;
    }
  };

  console.log(token);

  return {
    user: {
      isAuthenticated,
      selectedRole,
      token,
    },
    login: loginAccount,
    logout: logoutAccount,
    signup,
    setSignupSelectedRole,
  };
};
