import axiosInstance from './axios';
import { getEncryptStorage } from '../utils';

type RequestUser = {
  email: string;
  password: string;
};

const postSignup = async ({ email, password }: RequestUser): Promise<void> => {
  const { data } = await axiosInstance.post('/api/auth/signup', {
    email,
    password
  });
  return data;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

const postLogin = async ({
  email,
  password
}: RequestUser): Promise<ResponseToken> => {
  const { data } = await axiosInstance.post('/api/auth/signin', {
    email,
    password
  });
  return data;
};

type ResponseProfile = {
  id: string;
  email: string;
  nickname: string;
};

const getProfile = async (): Promise<ResponseProfile> => {
  const { data } = await axiosInstance.get('/api/auth/profile');
  return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');

  const { data } = await axiosInstance.get('/api/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  });

  return data;
};

const logout = async (): Promise<void> => {
  await axiosInstance.post('/api/auth/logout');
};

export { postSignup, postLogin, getProfile, getAccessToken, logout };
export type { RequestUser, ResponseToken, ResponseProfile };
