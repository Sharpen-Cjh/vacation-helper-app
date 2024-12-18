type GroupMember = {
  email: string;
  id: string;
  name: string;
};

type GroupListItem = {
  creator: GroupMember;
  id: number;
  inviteCode: string;
  members: GroupMember[];
  name: string;
};

export { GroupMember, GroupListItem };
