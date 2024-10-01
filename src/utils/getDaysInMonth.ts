import {
  AVAILABLE_NUMBER_DAYS,
  DAYS_IN_A_WEEK,
  FIRST_DAY_OFFSET,
} from '@constants/constants';
import { WeekStart } from '@services/CalendarEnums';

export const getDaysInMonth = (
  date: Date,
  startOfWeek: WeekStart,
  rangeYears?: [number, number],
): Date[] => {
  const days: Date[] = [];
  let year = date.getFullYear();
  let month = date.getMonth();

  if (rangeYears) {
    const isYearOutOfRange = year < rangeYears[0] || year > rangeYears[1];
    if (isYearOutOfRange) {
      year = rangeYears[0];
      month = 0;
    }
  }

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const firstDayOfWeek = firstDay.getDay() - FIRST_DAY_OFFSET;
  const lastDayPrevMonth = new Date(year, month, 0);

  const typeOffset = startOfWeek === WeekStart.Monday ? 0 : 1;

  const countDayPrevMonthDisplay =
    firstDayOfWeek >= -1 ? firstDayOfWeek : AVAILABLE_NUMBER_DAYS;
  const offset = lastDayPrevMonth.getDate() - countDayPrevMonthDisplay;

  const addDays = (monthOffset: number, start: number, end: number) => {
    for (let i = start; i <= end; i++) {
      const day = new Date(year, month + monthOffset, i);
      days.push(day);
    }
  };

  const isPrevMonthNeeded =
    countDayPrevMonthDisplay + typeOffset <= AVAILABLE_NUMBER_DAYS;

  if (isPrevMonthNeeded) {
    addDays(-1, offset - typeOffset, lastDayPrevMonth.getDate());
  }

  addDays(0, 1, lastDay.getDate());

  const daysInNextMonth =
    lastDay.getDay() !== 0 ? DAYS_IN_A_WEEK - lastDay.getDay() : 0;
  addDays(1, 1, daysInNextMonth - typeOffset);
  return days;
};
