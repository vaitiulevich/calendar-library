import React from 'react';
import CalendarMonth from '@components/CalendarMonth/CalendarMonth';
import CalendarWeek from '@components/CalendarWeek/CalendarWeek';
import CalendarYaer from '@components/CalendarYaer/CalendarYaer';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import { defMaxDate, defMinDate, defRange } from '@constants/constants';
import { CalendarTypes, WeekStart } from '@services/CalendarEnums';

import withCalendarViews from '../../decorators/withCalendarViews';
import { Task } from '../../store/ToDoContext';
import { CalendarWrapper } from './styled';

export interface IHoliday {
  title: string;
  date: Date;
}
export interface CalendarProps {
  type?: CalendarTypes.Month | CalendarTypes.Week | CalendarTypes.Yaer;
  fillTodayColor?: string;
  fillHolidayColor?: string;
  startOfWeek?: WeekStart.Sunday | WeekStart.Monday;
  rangeYears: [number, number];
  minDate?: number;
  maxDate?: number;
  isShowWeekDays?: boolean;
  holidays?: IHoliday[];
  handleDayClick?: (day: Date | null) => void;
  selectedDay?: Date | null;
  tasks?: { [key: string]: Task[] };
  isInRange?: (date: string) => boolean;
  startDate?: Date;
  endDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({
  type = CalendarTypes.Month,
  minDate = defMinDate,
  maxDate = defMaxDate,
  startOfWeek = WeekStart.Monday,
  rangeYears = defRange,
  fillTodayColor = '#007bff',
  fillHolidayColor = '#007bff',
  isShowWeekDays = false,
  holidays,
  handleDayClick,
  selectedDay,
  tasks,
  isInRange,
  startDate,
  endDate,
}) => {
  const calendarProps = {
    minDate,
    maxDate,
    startOfWeek,
    isShowWeekDays,
    fillHolidayColor,
    fillTodayColor,
    holidays,
    rangeYears,
    handleDayClick,
    selectedDay,
    tasks,
    isInRange,
    startDate,
    endDate,
  };
  const renderCalendarType = () => {
    switch (type) {
      case CalendarTypes.Month:
        return <CalendarMonth {...calendarProps} />;
      case CalendarTypes.Week:
        return <CalendarWeek {...calendarProps} />;
      case CalendarTypes.Yaer:
        return <CalendarYaer {...calendarProps} />;
    }
  };

  return (
    <ErrorBoundary>
      <CalendarWrapper>{renderCalendarType()}</CalendarWrapper>
    </ErrorBoundary>
  );
};

export default withCalendarViews(Calendar);
