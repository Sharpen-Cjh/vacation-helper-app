import {
  createGroupAPI,
  getUserGroupListAPI,
  getGroupByIdAPI,
  joinGroupAPI,
  leaveGroupAPI,
  updateGroupInfoAPI
} from '@/src/api/group';
import queryClient from '@/src/api/queryClient';
import { useQuery, useMutation } from '@tanstack/react-query';

function useGetUserGroupList() {
  return useQuery({
    queryKey: ['group', 'getUserGroupList'],
    queryFn: getUserGroupListAPI,
    refetchOnReconnect: true
  });
}

function useGetGroupById(groupId: string | null) {
  return useQuery({
    queryKey: ['group', 'getGroupById', groupId],
    queryFn: () => (groupId ? getGroupByIdAPI(groupId) : null),
    enabled: !!groupId
  });
}

function useCreateGroup() {
  return useMutation({
    mutationFn: createGroupAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['group', 'getUserGroupList']
      });
    }
  });
}

function useUpdateGroupInfo() {
  return useMutation({
    mutationFn: updateGroupInfoAPI,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['group', 'getUserGroupList']
      });
      queryClient.invalidateQueries({
        queryKey: ['group', 'getGroupById', variables.groupID]
      });
    }
  });
}

function useJoinGroup() {
  return useMutation({
    mutationFn: joinGroupAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['group', 'getUserGroupList']
      });
    }
  });
}

function useLeaveGroup() {
  return useMutation({
    mutationFn: leaveGroupAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['group', 'getUserGroupList']
      });
    }
  });
}

function useGroupInfo(groupId: string | null = null) {
  const getUserGroupListQuery = useGetUserGroupList();
  const createGroupMutation = useCreateGroup();
  const updateGroupInfoMutation = useUpdateGroupInfo();
  const joinGroupMutation = useJoinGroup();
  const leaveGroupMutation = useLeaveGroup();
  const getGroupByIdQuery = useGetGroupById(groupId);

  return {
    getUserGroupListQuery,
    createGroupMutation,
    updateGroupInfoMutation,
    joinGroupMutation,
    leaveGroupMutation,
    getGroupByIdQuery
  };
}

export default useGroupInfo;
