export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  selectedRole: string;
}

export interface IReduxLogin {
  token: string;
  isAuthenticated: boolean;
}

export interface IReduxSelectedRole {
  selectedRole: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISignup {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface IVerification {
  code: string;
  email: string;
}
