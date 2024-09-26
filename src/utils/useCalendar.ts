import { useCallback, useEffect, useState } from 'react';
import { WeekStart } from '@services/CalendarEnums';
import { getDaysInMonth } from '@utils/getDaysInMonth';

export const useCalendar = (
  initialDate: Date,
  startOfWeek: WeekStart,
  minDate?: Date,
  maxDate?: Date,
  rangeYears?: [number, number],
) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [days, setDays] = useState<Date[]>([]);

  const updateDaysForMonth = (date: Date) => {
    const newDays = getDaysInMonth(date, startOfWeek, rangeYears);
    setDays(newDays);
  };

  useEffect(() => {
    updateDaysForMonth(currentDate);
  }, [currentDate, startOfWeek, minDate, maxDate, rangeYears]);

  const handleSetMonth = useCallback((selectMonth: number) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate.getFullYear(), selectMonth, 1);
      updateDaysForMonth(newDate);
      return newDate;
    });
  }, []);

  const handleSetYear = useCallback((selectYear: number) => {
    console.log(selectYear);
    setCurrentDate((prevDate) => {
      const newDate = new Date(selectYear, prevDate.getMonth(), 1);
      updateDaysForMonth(newDate);
      return newDate;
    });
  }, []);

  return {
    currentDate,
    days,
    handleSetMonth,
    handleSetYear,
  };
};
