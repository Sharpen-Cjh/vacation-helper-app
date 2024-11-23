type UserProfile = {
  id: number;
  name: string;
  email: string;
  additionalUnderOneYearLeaveAdded: number;
  availableAnnualLeaves: number;
  availableUnderOneYearLeaves: number;
  newRecruitsMode: boolean;
  dateOfJoining: Date;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date;
};

export { UserProfile };
