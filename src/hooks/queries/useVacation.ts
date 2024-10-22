import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createVacationInfoApi,
  getAllVacationInfoApi
} from '@/src/api/vacationInfo';
import queryClient from '@/src/api/queryClient';
import { UseMutationCustomOptions } from '@/src/types/common';

function useGetAllVacationInfo() {
  return useQuery({
    queryKey: ['vacation', 'getAllVacationInfo'],
    queryFn: getAllVacationInfoApi,
    refetchOnReconnect: true
  });
}

function usePostVacationInfo(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createVacationInfoApi,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['vacation', 'getAllVacationInfo']
      });
    },
    onError(error) {
      console.log(error);
    },
    ...mutationOptions
  });
}

function useVacation() {
  const getAllVacationQuery = useGetAllVacationInfo();
  const postVacationInfoMutation = usePostVacationInfo();

  return {
    getAllVacationQuery,
    postVacationInfoMutation
  };
}

export default useVacation;
