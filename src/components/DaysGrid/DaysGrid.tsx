import React, { memo } from 'react';
import { DayButton, DaysGridContainer, TaskIndicator } from './styled';
import { IHoliday } from '@components/Calendar/Calendar';
import Weekdays from '@components/Weekdays/Weekdays';
import { WeekStart } from '@services/CalendarEnums';
import { defMaxDate, defMinDate } from '@constants/constants';
import { getDayClass } from '@utils/daysTypesUtils';
import { Task } from '@store/ToDoContext';

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
  handleDayClick?: (date: Date) => void;
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
  fillHolidayColor,
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
    return days.map((day, index) => {
      const dateString = day.toDateString();
      const hasTasks = tasks ? tasks.hasOwnProperty(dateString) : false;
      const isRange = isInRange ? isInRange(dateString) : false;

      const { isDisabled, className } = getDayClass(
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

      return (
        <DayButton
          key={index}
          className={className}
          filltoday={fillTodayColor}
          fillholiday={fillHolidayColor}
          disabled={isDisabled}
          onClick={() => {
            if (!isDisabled && handleDayClick) {
              handleDayClick(day);
            }
          }}
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
