import { IHoliday } from '@components/Calendar/Calendar';

export const isHoliday = (day: Date, holidays?: IHoliday[]): boolean => {
  return (
    holidays?.some((item) => {
      const holidayDate = new Date(item.date);
      return isDateEqual(holidayDate, day);
    }) ?? false
  );
};

export const isWeekday = (day: Date): boolean => {
  return day.getDay() === 0 || day.getDay() === 6;
};

export const isDateEqual = (
  date1: Date | undefined,
  date2: Date | undefined | null,
): boolean => {
  return date1 && date2 ? date1.toDateString() === date2.toDateString() : false;
};
