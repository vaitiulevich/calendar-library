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

export const Basic: Story = {
  args: {
    label: 'Basic',
    maxDate: defMaxDate,
    minDate: defMinDate,
    rangeYears: defRange,
    isShowWeekDays: false,
  },
  render: (args) => (
    <CalendarProvider initialDate={new Date()}>
      <Calendar {...args} />
    </CalendarProvider>
  ),
};

export const CalendarWithDateInput: Story = {
  render: (args: CalendarProps) => {
    const CalendarWithInput = withDatepicker(Calendar);
    return (
      <CalendarProvider initialDate={new Date()}>
        <CalendarWithInput {...args} />
      </CalendarProvider>
    );
  },
};

export const CalendarWithWeekdays: Story = {
  args: {
    ...Basic.args,
    label: 'CalendarWithWeekdays',
    isShowWeekDays: true,
  },
};

export const YaersTypeCalendar: Story = {
  args: {
    ...Basic.args,
    label: 'YaersTypeCalendar',
    type: CalendarTypes.Yaer,
  },
};

export const WeeksTypeCalendar: Story = {
  args: {
    ...Basic.args,
    label: 'WeeksTypeCalendar',
    type: CalendarTypes.Week,
  },
};

export const StartWeekOnSunday: Story = {
  args: {
    ...Basic.args,
    label: 'StartWeekOnSunday',
    startOfWeek: WeekStart.Sunday,
  },
};

export const CalendarWithHolidays: Story = {
  args: {
    ...Basic.args,
    holidays: holidays,
    fillHolidayColor: '#aa6af4',
    label: 'CalendarWithHolidays',
  },
};
