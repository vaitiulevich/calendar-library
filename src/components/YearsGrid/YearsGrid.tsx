import React, { useCallback, useMemo } from 'react';
import { MonthTitle, YearButton, YearsGridWrapper } from './styled';
import { months } from '@constants/constants';
import { WeekStart } from '@services/CalendarEnums';
import DaysGrid from '@components/DaysGrid/DaysGrid';
import { useCalendarContext } from '@store/CalendarContext';
import { getDaysInMonth } from '@utils/getDaysInMonth';
import { IHoliday } from '@components/Calendar/Calendar';

interface YearsGridProps {
  fillTodayColor?: string;
  fillHolidayColor?: string;
  startOfWeek: string;
  rangeYears?: [number, number];
  isShowWeekDays?: boolean;
  minDate?: number;
  maxDate?: number;
  holidays?: IHoliday[];
}

const YearsGrid: React.FC<YearsGridProps> = ({
  fillHolidayColor,
  fillTodayColor,
  isShowWeekDays,
  startOfWeek,
  rangeYears,
  minDate,
  maxDate,
  holidays,
}) => {
  const { currentDate, today } = useCalendarContext();
  const updateDaysForMonth = useCallback(
    (date: Date) => {
      return getDaysInMonth(date, WeekStart.Monday, rangeYears);
    },
    [startOfWeek, rangeYears],
  );
  const renderYears = () => {
    return months.map((month, index) => {
      const thisMonthDate = new Date(currentDate.getFullYear(), index, 1);
      const days = useMemo(
        () => updateDaysForMonth(thisMonthDate),
        [currentDate],
      );
      return (
        <YearButton key={month}>
          <MonthTitle>{month}</MonthTitle>
          <DaysGrid
            currentDate={thisMonthDate}
            fillTodayColor={fillTodayColor}
            fillHolidayColor={fillHolidayColor}
            isShowWeekDays={isShowWeekDays}
            holidays={holidays}
            maxDate={maxDate}
            minDate={minDate}
            today={today}
            days={days}
          />
        </YearButton>
      );
    });
  };

  return <YearsGridWrapper>{renderYears()}</YearsGridWrapper>;
};

export default YearsGrid;
