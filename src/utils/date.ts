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

export { formatDate, formatVacationDataForMarkedDates };
