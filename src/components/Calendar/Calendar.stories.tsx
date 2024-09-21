import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Calendar from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Calendar',
  component: Calendar,
  argTypes: {
    textColor: { control: 'color' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Basic: Story = {
  args: {
    label: 'Basic',
    type: 'basic',
  },
};

// export const Secondary: Story = {
//   args: {
//     ...Primary.args,
//     type: 'secondary',
//     label: 'Secondar',
//   },
// };
