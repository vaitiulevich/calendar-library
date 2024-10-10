import { IHoliday } from '@components/Calendar/Calendar';
import { isDateEqual, isHoliday, isWeekday } from '@utils/CalendarDayTypes';

export const getDayClass = (
  day: Date,
  currentDate: Date,
  today: Date,
  minDate?: number,
  maxDate?: number,
  isShowWeekDays?: boolean,
  holidays?: IHoliday[],
  selectedDay?: Date | null,
  startDate?: Date,
  endDate?: Date,
  isRange?: boolean,
) => {
  const isCurrentMonthDay = day.getMonth() === currentDate.getMonth();
  const isDisabled =
    !isCurrentMonthDay ||
    (minDate ? day.getTime() < minDate : false) ||
    (maxDate ? day.getTime() > maxDate : false);

  const rangeDisabled = day.getFullYear() !== currentDate.getFullYear();

  const isHolidayDate = isHoliday(day, holidays);
  const isWeekDay = isShowWeekDays ? isWeekday(day) : false;
  const isToday = isDateEqual(day, today);
  const isSelected = isDateEqual(day, selectedDay);
  const isStartDate = isDateEqual(day, startDate);
  const isEndDate = isDateEqual(day, endDate);

  const className = setDayClass(
    isToday,
    isWeekDay,
    isHolidayDate,
    isSelected,
    isDisabled,
    isRange ? isRange : false,
    isStartDate,
    isEndDate,
  );

  return { isDisabled, className, rangeDisabled };
};

export const setDayClass = (
  isToday: boolean,
  isWeekDay: boolean,
  isHolidayDate: boolean,
  isSelected: boolean,
  isDisabled: boolean,
  isRange: boolean,
  isStartDate: boolean,
  isEndDate: boolean,
) => {
  return [
    'day-button',
    isToday ? 'today' : '',
    isWeekDay ? 'weekday' : '',
    isHolidayDate ? 'holiday' : '',
    isSelected ? 'selected' : '',
    isDisabled ? 'disabled' : '',
    isRange ? 'in-range' : '',
    isStartDate ? 'start-range' : '',
    isEndDate ? 'end-range' : '',
  ].join(' ');
};
