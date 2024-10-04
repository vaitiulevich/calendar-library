import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Calendar, { CalendarProps } from './Calendar';
import {
  defMaxDate,
  defMinDate,
  defRange,
  holidays,
} from '@constants/constants';
import { CalendarTypes, WeekStart } from '@services/CalendarEnums';
import { CalendarProvider } from '@store/CalendarContext';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import withCalendarViews from '@decorators/withCalendarViews';

interface ExtendedCalendarProps extends CalendarProps {
  useToDoList?: boolean;
  useDateRangePicker?: boolean;
  useDatepicker?: boolean;
}

const meta: Meta<typeof Calendar> = {
  title: 'Calendar',
  component: Calendar,
  argTypes: {
    fillTodayColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

const Template = (args: CalendarProps) => (
  <ErrorBoundary>
    <CalendarProvider initialDate={new Date()}>
      <Calendar {...args} />
    </CalendarProvider>
  </ErrorBoundary>
);

const TemplateWithCalendarViews = (args: ExtendedCalendarProps) => {
  const CalendarWithViews = withCalendarViews(Calendar);
  return (
    <ErrorBoundary>
      <CalendarWithViews {...args} />
    </ErrorBoundary>
  );
};

export const Basic: Story = {
  args: {
    maxDate: defMaxDate,
    minDate: defMinDate,
    rangeYears: defRange,
    isShowWeekDays: false,
  },
  render: Template,
};

export const CalendarWithCombineViews = {
  args: {
    isToDoList: true,
    isDatepicker: true,
    isDateRangePicker: true,
    maxDate: defMaxDate,
    minDate: defMinDate,
  },
  render: TemplateWithCalendarViews,
};

export const CalendarWithRangePicker = {
  args: {
    maxDate: defMaxDate,
    minDate: defMinDate,
    isDateRangePicker: true,
  },
  render: TemplateWithCalendarViews,
};

export const CalendarWithTodoList = {
  args: {
    isToDoList: true,
  },
  render: TemplateWithCalendarViews,
};

export const CalendarWithDatepicker = {
  args: {
    isDatepicker: true,
  },
  render: TemplateWithCalendarViews,
};

export const CalendarWithWeekdays: Story = {
  args: {
    ...Basic.args,
    isShowWeekDays: true,
  },
  render: Template,
};

export const YearsTypeCalendar: Story = {
  args: {
    ...Basic.args,
    type: CalendarTypes.Yaer,
  },
  render: Template,
};

export const WeeksTypeCalendar: Story = {
  args: {
    ...Basic.args,
    type: CalendarTypes.Week,
  },
  render: Template,
};

export const StartWeekOnSunday: Story = {
  args: {
    ...Basic.args,
    startOfWeek: WeekStart.Sunday,
  },
  render: Template,
};

export const CalendarWithHolidays: Story = {
  args: {
    ...Basic.args,
    holidays: holidays,
    fillHolidayColor: '#aa6af4',
  },
  render: Template,
};
