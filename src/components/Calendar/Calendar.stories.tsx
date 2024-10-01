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

const meta: Meta<typeof Calendar> = {
  title: 'Calendar',
  component: Calendar,
  argTypes: {
    fillTodayColor: { control: 'color' },
    onClick: { action: 'clicked' },
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

const TemplateWithInput = (args: CalendarProps) => {
  const CalendarWithInput = withDatepicker(Calendar);
  return (
    <ErrorBoundary>
      <CalendarProvider initialDate={new Date()}>
        <CalendarWithInput {...args} />
      </CalendarProvider>
    </ErrorBoundary>
  );
};

export const Basic: Story = {
  args: {
    label: 'Basic',
    maxDate: defMaxDate,
    minDate: defMinDate,
    rangeYears: defRange,
    isShowWeekDays: false,
  },
  render: Template,
};

export const CalendarWithDateInput: Story = {
  render: TemplateWithInput,
};

export const CalendarWithWeekdays: Story = {
  args: {
    ...Basic.args,
    label: 'CalendarWithWeekdays',
    isShowWeekDays: true,
  },
  render: Template,
};

export const YearsTypeCalendar: Story = {
  args: {
    ...Basic.args,
    label: 'YearsTypeCalendar',
    type: CalendarTypes.Yaer,
  },
  render: Template,
};

export const WeeksTypeCalendar: Story = {
  args: {
    ...Basic.args,
    label: 'WeeksTypeCalendar',
    type: CalendarTypes.Week,
  },
  render: Template,
};

export const StartWeekOnSunday: Story = {
  args: {
    ...Basic.args,
    label: 'StartWeekOnSunday',
    startOfWeek: WeekStart.Sunday,
  },
  render: Template,
};

export const CalendarWithHolidays: Story = {
  args: {
    ...Basic.args,
    holidays: holidays,
    fillHolidayColor: '#aa6af4',
    label: 'CalendarWithHolidays',
  },
  render: Template,
};
