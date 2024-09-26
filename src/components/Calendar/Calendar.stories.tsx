import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Calendar from './Calendar';
import { holidays } from '@constants/constants';
import { CalendarTypes, WeekStart } from '@services/CalendarEnums';

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
    maxDate: new Date('01.09.2024'),
    minDate: new Date('01.10.2024'),
    isShowWeekDays: false,
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
