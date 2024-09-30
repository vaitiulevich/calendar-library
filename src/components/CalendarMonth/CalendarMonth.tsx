import { memo, useCallback, useMemo } from 'react';
import React from 'react';
import { IHoliday } from '@components/Calendar/Calendar';
import { WeekStart } from '@services/CalendarEnums';
import DaysGrid from '@components/DaysGrid/DaysGrid';
import Navigation from '@components/Navigation/Navigation';
import { defRange } from '@constants/constants';
import { useCalendarContext } from '@store/CalendarContext';
import { getDaysInMonth } from '@utils/getDaysInMonth';

interface CalendarMonthProps {
  minDate?: number;
  maxDate?: number;
  fillTodayColor?: string;
  fillHolidayColor?: string;
  isShowWeekDays?: boolean;
  holidays?: IHoliday[];
  startOfWeek?: string;
  rangeYears?: [number, number];
}

const CalendarMonth = ({
  minDate,
  maxDate,
  fillTodayColor,
  fillHolidayColor,
  isShowWeekDays,
  holidays,
  startOfWeek = WeekStart.Monday,
  rangeYears = defRange,
}: CalendarMonthProps) => {
  const { currentDate, today, handleSetMonth, handleSetYear } =
    useCalendarContext();

  const updateDaysForMonth = useCallback(
    (date: Date) => {
      return getDaysInMonth(date, WeekStart.Monday, rangeYears);
    },
    [startOfWeek, rangeYears],
  );

  const days = useMemo(
    () => updateDaysForMonth(currentDate),
    [currentDate, updateDaysForMonth],
  );
  return (
    <>
      <Navigation
        currentDate={currentDate}
        onSetMonth={handleSetMonth}
        onSetYear={handleSetYear}
        rangeYears={rangeYears}
      />
      <DaysGrid
        days={days}
        startOfWeek={startOfWeek}
        holidays={holidays}
        currentDate={currentDate}
        today={today}
        minDate={minDate}
        maxDate={maxDate}
        fillTodayColor={fillTodayColor}
        fillHolidayColor={fillHolidayColor}
        isShowWeekDays={isShowWeekDays}
      />
    </>
  );
};

export default memo(CalendarMonth);
