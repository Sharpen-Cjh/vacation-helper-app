import axiosInstance from './axios';

const getUserGroupListAPI = async () => {
  const { data } = await axiosInstance.get('group/my-groups');
  return data;
};

const getGroupByIdAPI = async (groupID: string) => {
  const { data } = await axiosInstance.get(`group/${groupID}`);
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

const leaveGroupAPI = async (groupID: string) => {
  const { data } = await axiosInstance.delete(`group/${groupID}/leave`);
  return data;
};

type UpdatedGroupInfo = {
  groupID: string;
  groupName: string;
};

const updateGroupInfoAPI = async ({ groupID, groupName }: UpdatedGroupInfo) => {
  const { data } = await axiosInstance.put(`/group/${groupID}/update`, {
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
