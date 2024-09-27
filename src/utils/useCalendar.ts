import { useCallback, useEffect, useState, useMemo } from 'react';
import { CalendarTypes, WeekStart } from '@services/CalendarEnums';
import { getDaysInMonth } from '@utils/getDaysInMonth';

export const useCalendar = (
  initialDate: Date,
  startOfWeek: WeekStart,
  minDate?: Date,
  maxDate?: Date,
  rangeYears?: [number, number],
) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [weekOffset, setWeekOffset] = useState(() => {
    const today = new Date();
    return Math.floor(today.getDate() / 7) + 1;
  });

  const updateDaysForMonth = useCallback(
    (date: Date) => {
      return getDaysInMonth(date, startOfWeek, rangeYears);
    },
    [startOfWeek, rangeYears],
  );

  const days = useMemo(
    () => updateDaysForMonth(currentDate),
    [currentDate, updateDaysForMonth],
  );

  const weeks = useMemo(() => {
    const weekChunks: Date[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weekChunks.push(days.slice(i, i + 7));
    }
    return weekChunks;
  }, [days]);

  const handleSetMonth = useCallback((selectMonth: number) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate.getFullYear(), selectMonth, 1);
      return newDate;
    });
  }, []);

  const handleSetYear = useCallback((selectYear: number) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(selectYear, prevDate.getMonth(), 1);
      return newDate;
    });
  }, []);

  const handleSetWeek = useCallback((week: number) => {
    setWeekOffset(week);
  }, []);

  return {
    currentDate,
    days,
    handleSetMonth,
    handleSetYear,
    handleSetWeek,
    weekOffset,
    weeks,
  };
};
