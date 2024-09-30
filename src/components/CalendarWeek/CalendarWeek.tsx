import { memo, useCallback, useMemo, useState } from 'react';
import React from 'react';
import { IHoliday } from '@components/Calendar/Calendar';
import { WeekStart } from '@services/CalendarEnums';
import DaysGrid from '@components/DaysGrid/DaysGrid';
import { defRange } from '@constants/constants';
import { useCalendarContext } from '@store/CalendarContext';
import { getDaysInMonth } from '@utils/getDaysInMonth';
import NavigationWeek from '@components/NavigationWeek/NavigationWeek';

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
  const { currentDate, today, handleSetMonth } = useCalendarContext();

  const updateDaysForMonth = useCallback(
    (date: Date) => {
      return getDaysInMonth(date, WeekStart.Monday, rangeYears);
    },
    [startOfWeek, rangeYears],
  );

  const [weekOffset, setWeekOffset] = useState(() => {
    const today = new Date();
    return Math.ceil(today.getDate() / 7);
  });

  const days = useMemo(
    () => updateDaysForMonth(currentDate),
    [currentDate, handleSetMonth],
  );

  const handleSetWeek = useCallback((week: number) => {
    setWeekOffset(week);
  }, []);

  const weeks = useMemo(() => {
    const weekChunks: Date[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weekChunks.push(days.slice(i, i + 7));
    }
    return weekChunks;
  }, [days]);

  return (
    <>
      <NavigationWeek
        currentDate={currentDate}
        rangeYears={rangeYears}
        handleSetMonth={handleSetMonth}
        handleSetWeek={handleSetWeek}
        weekOffset={weekOffset}
        weeks={weeks}
      />
      <DaysGrid
        days={weeks[weekOffset]}
        minDate={minDate}
        maxDate={maxDate}
        currentDate={currentDate}
        today={today}
        fillHolidayColor={fillHolidayColor}
        fillTodayColor={fillTodayColor}
        holidays={holidays}
        isShowWeekDays={isShowWeekDays}
      />
    </>
  );
};

export default memo(CalendarMonth);
