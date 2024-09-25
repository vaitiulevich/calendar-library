import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BaseCalendar } from '@services/CalendarService';
import Days from '@components/Days/Days';

const meta: Meta<typeof Days> = {
  title: 'DaysGrids',
  component: Days,
  argTypes: {
    fillTodayColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof Days>;
const baseCalendar = new BaseCalendar();
export const DaysGrid: Story = {
  args: {
    days: baseCalendar.getDaysInMonth(new Date(), 'monday'),
    currentDate: new Date(),
    today: new Date(),
  },
};
