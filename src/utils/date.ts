import { VacationInfo } from '../types/vacationInfo';

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const getAllDatesInRange = (startDate: string, endDate: string): string[] => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dates.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

const formatVacationDataForMarkedDates = (vacations: VacationInfo[]) => {
  const markedDates: Record<string, VacationInfo[]> = {};

  vacations.forEach((vacation) => {
    const { start, end } = vacation;
    const datesInRange = getAllDatesInRange(start, end);

    datesInRange.forEach((date) => {
      if (!markedDates[date]) {
        markedDates[date] = [];
      }
      markedDates[date].push(vacation);
    });
  });

  return markedDates;
};

const calculateAvailableUnderOneYearLeaves = (joiningDate: Date | null) => {
  if (!joiningDate) return 0;

  const currentDate = new Date();
  const joiningDateObj = new Date(joiningDate);

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const diffInMilliseconds = currentDate.getTime() - joiningDateObj.getTime();
  const diffInDays = Math.floor(diffInMilliseconds / millisecondsPerDay);

  // 입사 후 1년 미만의 경우, 매 30일마다 1일의 연차 산정
  if (diffInDays < 365) {
    return Math.floor(diffInDays / 30); // 30일마다 1일의 연차
  } else {
    // 1년 이상 근무 시, 기본 연차 15일을 부여하고 그 이후 매 2년마다 1일 추가
    const basicLeaves = 15; // 첫 해의 기본 연차 수
    const additionalYears = Math.floor((diffInDays - 365) / 730);
    const totalLeaves = basicLeaves + additionalYears;
    return Math.min(totalLeaves, 25);
  }
};

export interface AnnualLeaveInfoFormData {
  newRecruitsMode: boolean;
  dateOfJoining: string;
  availableAnnualLeaves: number | '';
  availableUnderOneYearLeaves: number | '';
}
const updateAvailableUnderOneYearLeaves = (dateOfJoining: Date) => {
  const availableUnderOneYearLeaves = dateOfJoining
    ? calculateAvailableUnderOneYearLeaves(new Date(dateOfJoining))
    : 0;

  return availableUnderOneYearLeaves;
};

export {
  formatDate,
  formatVacationDataForMarkedDates,
  updateAvailableUnderOneYearLeaves
};
