import React from 'react';
import Calendar, { CalendarProps } from '@components/Calendar/Calendar';
import {
  defMaxDate,
  defMinDate,
  defRange,
  holidays,
} from '@constants/constants';
import { CalendarTypes, WeekStart } from '@services/CalendarEnums';
import type { Meta, StoryObj } from '@storybook/react';

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
    isShowWeekDays: true,
    holidays: holidays,
    fillHolidayColor: '#aa6af4',
    fillTodayColor: '#007bff',
    startOfWeek: WeekStart.Monday,
    type: CalendarTypes.Month,
  },
  argTypes: {
    startOfWeek: {
      control: {
        type: 'select',
      },
      options: Object.values(WeekStart),
    },
    type: {
      control: {
        type: 'select',
      },
      options: Object.values(CalendarTypes),
    },
  },
  render: Template,
};

export const YearsTypeCalendar: Story = {
  args: {
    ...Basic.args,
    type: CalendarTypes.Yaer,
  },
  argTypes: {
    ...Basic.argTypes,
  },
  render: Template,
};

export const WeeksTypeCalendar: Story = {
  args: {
    ...Basic.args,
    type: CalendarTypes.Week,
    isDatepicker: true,
  },
  argTypes: {
    ...Basic.argTypes,
  },
  render: Template,
};

export const CalendarWithDatepicker = {
  args: {
    ...Basic.args,
    isDatepicker: true,
  },
  argTypes: {
    ...Basic.argTypes,
  },
  render: Template,
};

export const CalendarWithTodoList = {
  args: {
    ...Basic.args,
    isToDoList: true,
  },
  argTypes: {
    ...Basic.argTypes,
  },
  render: Template,
};

export const CalendarWithRangePicker = {
  args: {
    ...Basic.args,
    maxDate: defMaxDate,
    minDate: defMinDate,
    isDateRangePicker: true,
  },
  argTypes: {
    ...Basic.argTypes,
  },
  render: Template,
};

export const CalendarWithToDoAndDatepicker = {
  args: {
    ...Basic.args,
    isToDoList: true,
    isDatepicker: true,
    maxDate: defMaxDate,
    minDate: defMinDate,
  },
  argTypes: {
    ...Basic.argTypes,
  },
  render: Template,
};
