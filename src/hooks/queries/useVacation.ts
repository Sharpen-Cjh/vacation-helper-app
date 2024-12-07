import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createVacationInfoApi,
  deleteVacationInfoApi,
  getAllVacationInfoApi,
  getGroupVacationsApi,
  updateVacationInfoApi,
  getHolidaysApi
} from '@/src/api/vacationInfo';
import queryClient from '@/src/api/queryClient';
import { UseMutationCustomOptions } from '@/src/types/common';
import { VacationInfo } from '@/src/types/vacationInfo';

function useGetHolidays(year: number) {
  return useQuery({
    queryKey: ['vacation', 'getHolidays', year],
    queryFn: () => getHolidaysApi(year),
    refetchOnReconnect: true
  });
}

function useGetAllVacationInfo() {
  return useQuery({
    queryKey: ['vacation', 'getAllVacationInfo'],
    queryFn: getAllVacationInfoApi,
    refetchOnReconnect: true
  });
}

function useGetGroupVacations(groupId: number | null) {
  return useQuery({
    queryKey: ['vacation', 'getGroupVacations', groupId],
    queryFn: () => getGroupVacationsApi(groupId),
    enabled: !!groupId,
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
      queryClient.invalidateQueries({ queryKey: ['auth', 'getProfile'] });
    },
    onError(error) {
      console.log(error);
    },
    ...mutationOptions
  });
}

function useUpdateVacationInfo(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: (updatedVacationInfo: VacationInfo) => {
      return updateVacationInfoApi(updatedVacationInfo.id, updatedVacationInfo);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['vacation', 'getAllVacationInfo']
      });
      queryClient.invalidateQueries({ queryKey: ['auth', 'getProfile'] });
    },
    onError(error) {
      console.log(error);
    },
    ...mutationOptions
  });
}

function useDeleteVacationInfo(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: (id: number) => deleteVacationInfoApi(id),
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

function useVacation(groupId: number | null, year?: number) {
  const getAllVacationQuery = useGetAllVacationInfo();
  const postVacationInfoMutation = usePostVacationInfo();
  const updateVacationInfoMutation = useUpdateVacationInfo();
  const deleteVacationInfoMutation = useDeleteVacationInfo();
  const getGroupVacationsQuery = useGetGroupVacations(groupId);
  const getHolidaysQuery = useGetHolidays(year as number);

  return {
    getAllVacationQuery,
    postVacationInfoMutation,
    updateVacationInfoMutation,
    deleteVacationInfoMutation,
    getGroupVacationsQuery,
    getHolidaysQuery
  };
}

export default useVacation;
