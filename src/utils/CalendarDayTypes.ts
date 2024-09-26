import { IHoliday } from '@components/Calendar/Calendar';

// export const isDateWithinRange = (
//   day: Date,
//   minDate?: Date,
//   maxDate?: Date,
// ): boolean => {
//   return (!minDate || day >= minDate) && (!maxDate || day <= maxDate);
// };

export const isHoliday = (day: Date, holidays?: IHoliday[]): boolean => {
  return (
    holidays?.some((item) => {
      const holidayDate = new Date(item.date);
      return holidayDate.toDateString() === day.toDateString();
    }) ?? false
  );
};

export const isWeekday = (day: Date): boolean => {
  return day.getDay() === 0 || day.getDay() === 6;
};
