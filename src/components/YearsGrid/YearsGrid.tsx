import React from 'react';
import { CalendarTypeProps } from '@components/CalendarMonth/CalendarMonth';
import DaysGrid from '@components/DaysGrid/DaysGrid';
import { defRange, months } from '@constants/constants';
import useUpdateDaysForMonth from '@hooks/useUpdateDaysForMonth';
import { WeekStart } from '@services/CalendarEnums';
import { useCalendarContext } from '@store/CalendarContext';

import { MonthTitle, YearButton, YearsGridWrapper } from './styled';

const YearsGrid: React.FC<CalendarTypeProps> = ({
  minDate,
  maxDate,
  fillTodayColor,
  fillHolidayColor,
  isShowWeekDays,
  holidays,
  startOfWeek = WeekStart.Monday,
  rangeYears = defRange,
  handleDayClick,
  selectedDay,
  tasks,
  isInRange,
  startDate,
  endDate,
}) => {
  const { currentDate, today } = useCalendarContext();
  const renderYears = () => {
    return months.map((month, index) => {
      const thisMonthDate = new Date(currentDate.getFullYear(), index, 1);
      const days = useUpdateDaysForMonth(
        rangeYears ?? defRange,
        startOfWeek,
        thisMonthDate,
        currentDate,
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
            tasks={tasks}
            startOfWeek={startOfWeek}
            handleDayClick={handleDayClick}
            selectedDay={selectedDay}
            isInRange={isInRange}
            startDate={startDate}
            endDate={endDate}
          />
        </YearButton>
      );
    });
  };

  return <YearsGridWrapper>{renderYears()}</YearsGridWrapper>;
};

export default YearsGrid;
