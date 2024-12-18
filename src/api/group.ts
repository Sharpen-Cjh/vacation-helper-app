import axiosInstance from './axios';

const getUserGroupListAPI = async () => {
  const { data } = await axiosInstance.get('group/my-groups');
  return data;
};

const getGroupByIdAPI = async (groupId: number) => {
  const { data } = await axiosInstance.get(`group/${groupId}`);
  return data;
};

const createGroupAPI = async (name: string) => {
  const { data } = await axiosInstance.post('group/create', { name });
  return data;
};

const joinGroupAPI = async (inviteCode: string) => {
  const { data } = await axiosInstance.post('group/join', { inviteCode });
  return data;
};

const leaveGroupAPI = async (groupId: number) => {
  const { data } = await axiosInstance.delete(`group/${groupId}/leave`);
  return data;
};

type UpdatedGroupInfo = {
  groupId: string;
  groupName: string;
};

const updateGroupInfoAPI = async ({ groupId, groupName }: UpdatedGroupInfo) => {
  const { data } = await axiosInstance.put(`/group/${groupId}/update`, {
    name: groupName
  });

  return data;
};

export {
  getUserGroupListAPI,
  getGroupByIdAPI,
  createGroupAPI,
  joinGroupAPI,
  leaveGroupAPI,
  updateGroupInfoAPI
};
