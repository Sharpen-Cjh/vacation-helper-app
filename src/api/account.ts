import axiosInstance from './axios';

const patchNickname = async (newNickname: string) => {
  const { data } = await axiosInstance.patch('/users/me/nickname', {
    nickname: newNickname
  });
  return data;
};

const patchPassword = async (currentPassword: string, newPassword: string) => {
  await axiosInstance.patch('/users/me/password', {
    currentPassword,
    newPassword
  });
};

const patchAvailableAnnualLeave = async (
  updatedAvailableAnnualLeave: number,
  updatedAvailableUnderOneYearLeaves: number,
  dateOfJoining: Date,
  newRecruitsMode: boolean
) => {
  const { data } = await axiosInstance.patch(
    '/users/me/available-annual-leave',
    {
      availableAnnualLeaves: updatedAvailableAnnualLeave,
      availableUnderOneYearLeaves: updatedAvailableUnderOneYearLeaves,
      dateOfJoining,
      newRecruitsMode
    }
  );
  return data;
};

export { patchNickname, patchPassword, patchAvailableAnnualLeave };
