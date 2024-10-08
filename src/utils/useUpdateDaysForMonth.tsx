import { useCallback,useEffect, useState } from 'react';
import { getDaysInMonth } from '@utils/getDaysInMonth';

const useUpdateDaysForMonth = (
  rangeYears: [number, number],
  startOfWeek: string,
  thisMonthDate: Date | null,
  currentDate: Date,
) => {
  const [days, setDays] = useState<Date[]>([]);

  const updateDaysForMonth = useCallback(
    (date: Date) => {
      const daysInMonth = getDaysInMonth(date, startOfWeek, rangeYears);
      setDays(daysInMonth);
    },
    [startOfWeek, rangeYears],
  );

  useEffect(() => {
    updateDaysForMonth(thisMonthDate ?? currentDate);
  }, [currentDate, startOfWeek, rangeYears]);

  return days;
};

export default useUpdateDaysForMonth;
