import { FormEvent } from 'react';

type User = {
  id: number;
  name: string;
  additionalUnderOneYearLeaveAdded: number;
  availableAnnualLeaves: number;
  availableUnderOneYearLeaves: number;
  createdAt: Date;
  dateOfJoining: Date;
  deletedAt: Date | null;
  email: string;
  newRecruitsMode: boolean;
  updatedAt: Date;
};

type VacationInfo = {
  id?: number;
  start: string;
  end: string;
  annualLeaveDays?: number;
  underOneYearAnnualLeaveDays?: number;
  title: string;
  user?: User;
  isHoliday?: boolean;
  shareWithGroup: boolean;
};

type VacationInfoFormProps = {
  onSubmit: (event: FormEvent) => void;

  vacationInfo: VacationInfo;
  setVacationInfo: (
    vacationInfo: Partial<VacationInfoFormProps['vacationInfo']>
  ) => void;
  onClose: () => void;
};

type Holiday = {
  locdate: number;
  dateName: string;
};

export type { User, VacationInfo, VacationInfoFormProps, Holiday };
