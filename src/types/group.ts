type GroupMember = {
  email: string;
  id: string;
  name: string;
};

type GroupListItem = {
  creator: GroupMember;
  id: string;
  inviteCode: string;
  members: GroupMember[];
  name: string;
};

export { GroupMember, GroupListItem };
