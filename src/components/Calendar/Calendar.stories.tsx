import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Calendar, { CalendarProps } from '@components/Calendar/Calendar';
import {
  defMaxDate,
  defMinDate,
  defRange,
  holidays,
} from '@constants/constants';

const meta: Meta<typeof Calendar> = {
  title: 'Calendar',
  component: Calendar,
  argTypes: {
    fillTodayColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

const Template = (args: CalendarProps) => <Calendar {...args} />;

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
  render: Template,
};

export const CalendarWithRangePicker = {
  args: {
    maxDate: defMaxDate,
    minDate: defMinDate,
    isDateRangePicker: true,
  },
  render: Template,
};

export const CalendarWithTodoList = {
  args: {
    isToDoList: true,
  },
  render: Template,
};

export const CalendarWithDatepicker = {
  args: {
    isDatepicker: true,
  },
  render: Template,
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
    type: 'year',
  },
  render: Template,
};

export const WeeksTypeCalendar: Story = {
  args: {
    ...Basic.args,
    type: 'week',
  },
  render: Template,
};

export const StartWeekOnSunday: Story = {
  args: {
    ...Basic.args,
    startOfWeek: 'sunday',
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
