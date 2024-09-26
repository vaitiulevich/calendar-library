import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import YearsGrid from './YearsGrid';

const meta: Meta<typeof YearsGrid> = {
  title: 'YearsGrids',
  component: YearsGrid,
};

export default meta;
type Story = StoryObj<typeof YearsGrid>;

export const DaysGrid: Story = {
  args: {
    currentDecade: new Date().getFullYear(),
    rangeYears: [2010, 2040],
    handleSetYear: (year) => {
      console.log(year);
    },
  },
};
