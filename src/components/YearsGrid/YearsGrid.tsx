import React, { useEffect, useMemo, useState } from 'react';
import { MonthTitle, YearButton, YearsGridWrapper } from './styled';
import { months } from '@constants/constants';
import { WeekStart } from '@services/CalendarEnums';
import { useCalendar } from '@utils/useCalendar';
import DaysGrid from '@components/DaysGrid/DaysGrid';

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
  const [daysByMonth, setDaysByMonth] = useState<Date[][]>([]);

  useEffect(() => {
    const newDaysByMonth = months.map((_, index) => {
      const thisMonthDate = new Date(currentYear, index, 1);
      // const { days } = useCalendar(thisMonthDate, WeekStart.Monday);
      // return days;
    });
    // setDaysByMonth(newDaysByMonth);
  }, [currentYear]);
  const renderYears = () => {
    console.log('ss', daysByMonth);
    return months.map((month, index) => {
      const thisMonthDate = new Date(currentYear, index, 1);
      return (
        <YearButton key={month}>
          <MonthTitle>{month}</MonthTitle>
          {daysByMonth.length > 0 && (
            <DaysGrid
              currentDate={thisMonthDate}
              fillTodayColor={fillTodayColor}
              fillHolidayColor={fillHolidayColor}
              today={today}
              days={daysByMonth[index]}
            />
          )}
        </YearButton>
      );
    });
  };

  return <YearsGridWrapper>{renderYears()}</YearsGridWrapper>;
};

export default YearsGrid;
