import React, { useEffect, useMemo } from 'react';
import { MonthTitle, YearButton, YearsGridWrapper } from './styled';
import { months } from '@constants/constants';
import { WeekStart } from '@services/CalendarEnums';
import { useCalendar } from '@utils/useCalendar';
import MonthGrid from '@components/MonthGrid/MonthGrid';

interface YearsGridProps {
  today: Date;
  currentYear: number;
  fillTodayColor?: string;
  fillHolidayColor?: string;
}

const YearsGrid: React.FC<YearsGridProps> = ({
  today,
  currentYear,
  fillHolidayColor,
  fillTodayColor,
}) => {
  const renderYears = () => {
    return months.map((month, index) => {
      const thisMonthDate = new Date(currentYear, index, 1);
      // console.log(thisMonthDate);

      const { days } = useCalendar(thisMonthDate, WeekStart.Monday);
      return (
        <YearButton key={month}>
          <MonthTitle>{month}</MonthTitle>
          <MonthGrid
            currentDate={thisMonthDate}
            fillTodayColor={fillTodayColor}
            fillHolidayColor={fillHolidayColor}
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
