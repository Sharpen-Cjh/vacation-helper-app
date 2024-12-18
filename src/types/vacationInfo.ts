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
  id: number;
  start: string;
  end: string;
  annualLeaveDays: number;
  underOneYearAnnualLeaveDays: number;
  title: string;
  user?: User;
  isHoliday?: boolean;
  shareWithGroup?: boolean;
};

type VacationInfoFormProps = {
  onSubmit: (event: FormEvent) => void;

  vacationInfo: VacationInfo;
  setVacationInfo: (
    vacationInfo: Partial<VacationInfoFormProps['vacationInfo']>
  ) => void;
  onClose: () => void;
};

interface Holiday {
  locdate: number; // YYYYMMDD 형식의 날짜
  dateName: string; // 휴일 이름
  isHoliday: 'Y' | 'N'; // 휴일 여부 ('Y' or 'N')
  seq?: number; // 순서 정보 (선택 사항)
}

// holidays 데이터 배열 타입
type Holidays = Holiday[];

export type { User, VacationInfo, VacationInfoFormProps, Holidays };
