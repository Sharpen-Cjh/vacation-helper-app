import { useMutation, useQuery } from '@tanstack/react-query';

import {
  getAccessToken,
  getProfile,
  logout,
  postLogin,
  postSignup
} from '@/src/api/auth';
import {
  UseMutationCustomOptions,
  UseQueryCustomOptions
} from '@/src/types/common';
import { removeEncryptStorage, setEncryptStorage } from '@/src/utils';
import { removeHeader, setHeader } from '@/src/utils/headers';
import { useEffect } from 'react';
import queryClient from '@/src/api/queryClient';

function useSignUp(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess({ accessToken, refreshToken }) {
      setEncryptStorage('refreshToken', refreshToken);
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    onSettled() {
      queryClient.refetchQueries({ queryKey: ['auth', 'getAccessToken'] });
      queryClient.invalidateQueries({ queryKey: ['auth', 'getProfile'] });
    },
    ...mutationOptions
  });
}

function useGetRefreshToken() {
  const { isSuccess, data, isError } = useQuery({
    queryKey: ['auth', 'getAccessToken'],
    queryFn: getAccessToken,
    staleTime: 1000 * 60 * 27,
    refetchInterval: 1000 * 60 * 27,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage('refreshToken', data.refreshToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage('refreshToken');
    }
  }, [isError]);

  return { isSuccess, isError };
}

function useGetProfile(queryOptions?: UseQueryCustomOptions) {
  return useQuery({
    queryKey: ['auth', 'getProfile'],
    queryFn: getProfile,
    ...queryOptions
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage('refreshToken');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    ...mutationOptions
  });
}

function useAuth() {
  const signupMutation = useSignUp();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess
  });

  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  return {
    signupMutation,
    loginMutation,
    isLogin,
    getProfileQuery,
    logoutMutation
  };
}

export default useAuth;
