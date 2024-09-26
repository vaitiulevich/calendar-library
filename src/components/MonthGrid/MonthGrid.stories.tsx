import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BaseCalendar } from '@services/CalendarService';
import MonthGrid from '@components/MonthGrid/MonthGrid';

const meta: Meta<typeof MonthGrid> = {
  title: 'DaysGrids',
  component: MonthGrid,
  argTypes: {
    fillTodayColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof MonthGrid>;
const baseCalendar = new BaseCalendar();
export const DaysGrid: Story = {
  args: {
    days: baseCalendar.getDaysInMonth(new Date(), 'monday'),
    currentDate: new Date(),
    today: new Date(),
  },
};
