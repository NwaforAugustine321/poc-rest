export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  selectedRole: string;
  name: string;
  email: string;
}

export interface IReduxLogin {
  token: string;
  isAuthenticated: boolean;
  name: string;
  email: string;
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


export interface IQuery {
  title: string;
  artist: string;
  year: string;
}