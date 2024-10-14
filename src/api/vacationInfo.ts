import axiosInstance from './axios';
import type { VacationInfo } from '../types/vacationInfo';

const createVacationInfoApi = async (newVacationInfo: VacationInfo) => {
  const { data } = await axiosInstance.post('/vacation-info', newVacationInfo);
  return data;
};

const getAllVacationInfoApi = async () => {
  const { data } = await axiosInstance.get('/vacation-info');
  return data;
};

const getGroupVacationsApi = async (groupId: number) => {
  const { data } = await axiosInstance.get(`/vacation-info/group/${groupId}`);
  return data;
};

const updateVacationInfoApi = async (
  id: number,
  newVacationInfo: VacationInfo
) => {
  const { data } = await axiosInstance.put(
    `/vacation-info/${id}`,
    newVacationInfo
  );
  return data;
};

const deleteVacationInfoApi = async (id: number) => {
  const { data } = await axiosInstance.delete(`/vacation-info/${id}`);
  return data;
};

const getHolidays = async (year: number) => {
  const { data } = await axiosInstance.get(`/holidays`, {
    params: {
      year
    }
  });
  return data;
};

export {
  createVacationInfoApi,
  getAllVacationInfoApi,
  getGroupVacationsApi,
  updateVacationInfoApi,
  deleteVacationInfoApi,
  getHolidays
};
