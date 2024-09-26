import React, { useEffect, useMemo, useState } from 'react';
import { YearButton, YearsGridWrapper } from './styled';
import Days from '@components/MonthGrid/MonthGrid';
import { BaseCalendar } from '@services/CalendarService';
import { months } from '@constants/constants';
import { WeekStart } from '@services/CalendarEnums';

interface YearsGridProps {
  today: Date;
  currentYear: number;
  rangeYears: [number, number];
  handleSetYear: (year: number) => void;
}

const YearsGrid: React.FC<YearsGridProps> = ({
  today,
  currentYear,
  handleSetYear,
}) => {
  const baseCalendar = useMemo(() => new BaseCalendar(), []);

  const daysInMonths = useMemo(() => {
    return months.map((_, index) => {
      return baseCalendar.getDaysInMonth(
        new Date(currentYear, index, 1),
        WeekStart.Monday,
      );
    });
  }, [currentYear, baseCalendar]);

  const renderYears = () => {
    return months.map((month, index) => (
      <YearButton key={month} onClick={() => handleSetYear(currentYear)}>
        {month}
        <Days
          currentDate={new Date(currentYear, index, 1)}
          today={today}
          days={daysInMonths[index]}
        />
      </YearButton>
    ));
  };

  return <YearsGridWrapper>{renderYears()}</YearsGridWrapper>;
};

export default YearsGrid;
