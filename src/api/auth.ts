import axiosInstance from './axios';
import { getEncryptStorage } from '../utils';
import type { UserProfile } from '../types/auth';
type RequestUser = {
  email: string;
  password: string;
};

const postSignup = async ({ email, password }: RequestUser): Promise<void> => {
  const { data } = await axiosInstance.post('/auth/signup', {
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
  const { data } = await axiosInstance.post('/auth/signin', {
    email,
    password
  });
  return data;
};

const getProfile = async (): Promise<UserProfile> => {
  const { data } = await axiosInstance.get('/auth/me');
  return data as UserProfile;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');
  const { data } = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  });
  return data;
};

const logout = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};

const deleteAccount = async (): Promise<void> => {
  await axiosInstance.delete('/auth/me');
};

export {
  postSignup,
  postLogin,
  getAccessToken,
  logout,
  getProfile,
  deleteAccount
};
export type { RequestUser, ResponseToken, UserProfile };
