import React from 'react';
import { CalendarWrapper } from './styled';
import { CalendarTypes, WeekStart } from '@services/CalendarEnums';
import { defMaxDate, defMinDate, defRange } from '@constants/constants';
import CalendarMonth from '@components/CalendarMonth/CalendarMonth';
import CalendarWeek from '@components/CalendarWeek/CalendarWeek';
import CalendarYaer from '@components/CalendarYaer/CalendarYaer';
import { Task } from '../../store/ToDoContext';
import { CalendarProvider } from '@store/CalendarContext';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import withCalendarViews from '../../decorators/withCalendarViews';

export interface IHoliday {
  title: string;
  date: Date;
}
export interface CalendarProps {
  type?: 'month' | 'week' | 'year';
  fillTodayColor?: string;
  fillHolidayColor?: string;
  startOfWeek?: 'sunday' | 'monday';
  rangeYears: [number, number];
  minDate?: number;
  maxDate?: number;
  isShowWeekDays?: boolean;
  holidays?: IHoliday[];
  handleDayClick?: (day: Date) => void;
  selectedDay?: Date | null;
  tasks?: { [key: string]: Task[] };
  isInRange?: (date: string) => boolean;
  startDate?: Date;
  endDate?: Date;
}

const Calendar = ({
  type = 'month',
  minDate = defMinDate,
  maxDate = defMaxDate,
  startOfWeek = 'monday',
  rangeYears = defRange,
  fillTodayColor = '#007bff',
  fillHolidayColor,
  isShowWeekDays = false,
  holidays,
  handleDayClick,
  selectedDay,
  tasks,
  isInRange,
  startDate,
  endDate,
}: CalendarProps) => {
  const renderCalendarType = () => {
    switch (type) {
      case CalendarTypes.Month:
        return (
          <CalendarMonth
            minDate={minDate}
            maxDate={maxDate}
            startOfWeek={startOfWeek}
            isShowWeekDays={isShowWeekDays}
            fillHolidayColor={fillHolidayColor}
            fillTodayColor={fillTodayColor}
            holidays={holidays}
            rangeYears={rangeYears}
            handleDayClick={handleDayClick}
            selectedDay={selectedDay}
            tasks={tasks}
            isInRange={isInRange}
            startDate={startDate}
            endDate={endDate}
          />
        );
      case CalendarTypes.Week:
        return (
          <CalendarWeek
            minDate={minDate}
            maxDate={maxDate}
            startOfWeek={startOfWeek}
            isShowWeekDays={isShowWeekDays}
            fillHolidayColor={fillHolidayColor}
            fillTodayColor={fillTodayColor}
            holidays={holidays}
            rangeYears={rangeYears}
          />
        );
      case CalendarTypes.Yaer:
        return (
          <CalendarYaer
            minDate={minDate}
            maxDate={maxDate}
            startOfWeek={startOfWeek}
            isShowWeekDays={isShowWeekDays}
            fillHolidayColor={fillHolidayColor}
            fillTodayColor={fillTodayColor}
            holidays={holidays}
            rangeYears={rangeYears}
          />
        );
    }
  };

  return (
    <ErrorBoundary>
      <CalendarProvider initialDate={new Date()}>
        <CalendarWrapper>{renderCalendarType()}</CalendarWrapper>
      </CalendarProvider>
    </ErrorBoundary>
  );
};

export default withCalendarViews(Calendar);
