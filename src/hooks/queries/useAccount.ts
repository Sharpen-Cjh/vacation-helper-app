import { useMutation } from '@tanstack/react-query';
import { patchAvailableAnnualLeave, patchNickname } from '@/src/api/account';

import { UseMutationCustomOptions } from '@/src/types/common';
import queryClient from '@/src/api/queryClient';

function useUpdateNickname(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: patchNickname,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['auth', 'getProfile'] });
    },
    ...mutationOptions
  });
}

function useUpdateAnnualLeave(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: (variables: {
      updatedAvailableAnnualLeave: number;
      updatedAvailableUnderOneYearLeaves: number;
      dateOfJoining: Date;
      newRecruitsMode: boolean;
    }) =>
      patchAvailableAnnualLeave(
        variables.updatedAvailableAnnualLeave,
        variables.updatedAvailableUnderOneYearLeaves,
        variables.dateOfJoining,
        variables.newRecruitsMode
      ),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['auth', 'getProfile'] });
    },
    ...mutationOptions
  });
}

export { useUpdateNickname, useUpdateAnnualLeave };
