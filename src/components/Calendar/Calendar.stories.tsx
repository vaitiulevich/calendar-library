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
import withDatepicker from '@decorators/withDatepicker';
import { CalendarProvider } from '@store/CalendarContext';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import { ToDoListProvider } from '@store/ToDoContext';
import withToDoList from '@decorators/withToDoList';
import withDateRangePicker from '@decorators/withDateRange/withDateRangePicker';

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

const TemplateWithDatepicker = (args: CalendarProps) => {
  const CalendarWithInput = withDatepicker(Calendar);
  return (
    <ErrorBoundary>
      <CalendarProvider initialDate={new Date()}>
        <CalendarWithInput {...args} />
      </CalendarProvider>
    </ErrorBoundary>
  );
};

const TemplateWithTodoList = (args: CalendarProps) => {
  const CalendarWithInput = withToDoList(Calendar);
  return (
    <ErrorBoundary>
      <CalendarProvider initialDate={new Date()}>
        <ToDoListProvider>
          <CalendarWithInput {...args} />
        </ToDoListProvider>
      </CalendarProvider>
    </ErrorBoundary>
  );
};

const TemplateWithRangePicker = (args: CalendarProps) => {
  const CalendarWithRangePicker = withDateRangePicker(Calendar);
  return (
    <ErrorBoundary>
      <CalendarProvider initialDate={new Date()}>
        <CalendarWithRangePicker {...args} />
      </CalendarProvider>
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

export const CalendarWithRangePicker: Story = {
  args: {
    maxDate: defMaxDate,
    minDate: defMinDate,
  },
  render: TemplateWithRangePicker,
};

export const CalendarWithTodoList: Story = {
  render: TemplateWithTodoList,
};

export const CalendarWithDatepicker: Story = {
  render: TemplateWithDatepicker,
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
