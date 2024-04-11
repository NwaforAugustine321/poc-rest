import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '@/redux/store';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const { token } = store.getState().auth;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any): Promise<any> => {
    return Promise.reject(error);
  }
);

export const get = async (
  path: string,
  options?: { [key: string]: any }
): Promise<any> => {
  try {
    const response = await api.get(path, {
      headers: {
        'content-type': 'application/json',
      },
      ...options,
    });
    return response.data.result ?? {};
  } catch (error: any) {
    throw (
      error?.response?.data?.result ?? error?.response?.data ?? error?.response
    );
  }
};

export const post = async (
  path: string,
  payload?: { [key: string]: any },
  options?: { [key: string]: any }
): Promise<any> => {
  try {
    const response = (await api.post(path, JSON.stringify(payload), {
      headers: {
        'content-type': 'application/json',
      },
      ...options,
    })) as any;
    return response.data.result ?? {};
  } catch (error: any) {
    throw (
      error?.response?.data?.result ?? error?.response?.data ?? error?.response
    );
  }
};
