import axiosInstance from './axios';
import { getEncryptStorage } from '../utils';

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

type ResponseProfile = {
  id: number;
  name: string;
  email: string;
  additionalUnderOneYearLeaveAdded: number;
  availableAnnualLeaves: number;
  availableUnderOneYearLeaves: number;
  newRecruitsMode: boolean;
  dateOfJoining: Date;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date;
};

const getProfile = async (): Promise<ResponseProfile> => {
  const { data } = await axiosInstance.get('/auth/me');
  return data;
};

// const getUserInfoApi = async () => {
//   const { data } = await axiosInstance.get('/auth/user-info');
//   return data;
// };

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

export { postSignup, postLogin, getAccessToken, logout, getProfile };
export type { RequestUser, ResponseToken, ResponseProfile };
