import { useQuery } from '@tanstack/react-query';
import { getAllVacationInfoApi } from '@/src/api/vacationInfo';

function useGetAllVacationInfo() {
  return useQuery({
    queryKey: ['vacation', 'getAllVacationInfo'],
    queryFn: getAllVacationInfoApi,
    refetchOnReconnect: true
  });
}

function useVacation() {
  const getAllVacationQuery = useGetAllVacationInfo();

  return {
    getAllVacationQuery
  };
}

export default useVacation;
