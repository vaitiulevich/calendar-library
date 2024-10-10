import React, { memo } from 'react';
import { IHoliday } from '@components/Calendar/Calendar';
import Weekdays from '@components/Weekdays/Weekdays';
import { defMaxDate, defMinDate } from '@constants/constants';
import { WeekStart } from '@services/CalendarEnums';
import { useCalendarContext } from '@store/CalendarContext';
import { Task } from '@store/ToDoContext';
import { getDayClass } from '@utils/daysTypesUtils';

import { DayButton, DaysGridContainer, TaskIndicator } from './styled';

interface IDays {
  days: Date[];
  currentDate: Date;
  today: Date;
  minDate?: number;
  maxDate?: number;
  fillTodayColor?: string;
  fillHolidayColor?: string;
  isShowWeekDays?: boolean;
  holidays?: IHoliday[];
  startOfWeek?: string;
  handleDayClick?: (date: Date | null) => void;
  selectedDay?: Date | null;
  tasks?: { [key: string]: Task[] };
  isInRange?: (date: string) => boolean;
  startDate?: Date;
  endDate?: Date;
}

const DaysGrid = ({
  days,
  currentDate,
  today,
  minDate = defMinDate,
  maxDate = defMaxDate,
  fillTodayColor = '#007bff',
  fillHolidayColor = '#007bff',
  isShowWeekDays,
  holidays,
  startOfWeek = WeekStart.Monday,
  handleDayClick,
  selectedDay,
  tasks,
  isInRange,
  startDate,
  endDate,
}: IDays) => {
  const renderDays = () => {
    const { handleSetMonth, handleSetYear } = useCalendarContext();
    return days.map((day, index) => {
      const dateString = day.toDateString();
      const hasTasks = tasks ? tasks.hasOwnProperty(dateString) : false;
      const isRange = isInRange ? isInRange(dateString) : false;

      const { isDisabled, className, rangeDisabled } = getDayClass(
        day,
        currentDate,
        today,
        minDate,
        maxDate,
        isShowWeekDays,
        holidays,
        selectedDay,
        startDate,
        endDate,
        isRange,
      );
      const daySelectValue =
        selectedDay && day.getTime() === selectedDay?.getTime() ? null : day;
      const handleDaySelect = () => {
        if (handleDayClick) {
          handleDayClick(daySelectValue);
          if (isDisabled) {
            handleSetMonth(day.getMonth());
            handleSetYear(day.getFullYear());
          }
        }
      };

      return (
        <DayButton
          key={index}
          className={className}
          filltoday={fillTodayColor}
          fillholiday={fillHolidayColor}
          disabled={rangeDisabled}
          onClick={handleDaySelect}
        >
          {day.getDate()}
          {hasTasks && <TaskIndicator filltoday={fillTodayColor} />}
        </DayButton>
      );
    });
  };

  return (
    <>
      <Weekdays startOfWeek={startOfWeek} />
      <DaysGridContainer>{renderDays()}</DaysGridContainer>
    </>
  );
};

export default memo(DaysGrid);
