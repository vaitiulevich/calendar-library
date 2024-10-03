import { memo } from 'react';
import React from 'react';
import { DayButton, DaysGridContainer, TaskIndicator } from './styled';
import { IHoliday } from '@components/Calendar/Calendar';
import Weekdays from '@components/Weekdays/Weekdays';
import { WeekStart } from '@services/CalendarEnums';
import { isDateEqual, isHoliday, isWeekday } from '@utils/CalendarDayTypes';
import { defMaxDate, defMinDate } from '@constants/constants';

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
  tasks?: { [key: string]: string[] };
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
      const isCurrentMonthDay = day.getMonth() === currentDate.getMonth();
      const isDisabled =
        !isCurrentMonthDay ||
        day.getFullYear() !== currentDate.getFullYear() ||
        day.getTime() < minDate ||
        day.getTime() > maxDate;

      const isHolidayDate = isHoliday(day, holidays);
      const isWeekDay = isShowWeekDays && isWeekday(day);
      const isToday = isDateEqual(day, today);
      const isSelected = isDateEqual(day, selectedDay);

      const dateString = day.toDateString();
      const hasTasks = tasks ? tasks.hasOwnProperty(dateString) : false;

      const isRange = isInRange ? isInRange(dateString) : false;
      const isStartDate = isDateEqual(day, startDate);
      const isEndDate = isDateEqual(day, endDate);

      const className = [
        'day-button',
        isToday ? 'today' : '',
        isWeekDay ? 'weekday' : '',
        isHolidayDate ? 'holiday' : '',
        isSelected ? 'selected' : '',
        isDisabled ? 'disabled' : '',
        isRange ? 'in-range' : '',
        isStartDate ? 'start-range' : '',
        isEndDate ? 'end-range' : '',
      ].join(' ');

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
