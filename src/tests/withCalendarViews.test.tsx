import React from 'react';
import Calendar from '@components/Calendar/Calendar';
import { defRange } from '@constants/constants';
import withCalendarViews from '@decorators/withCalendarViews';
import { render, screen } from '@testing-library/react';

const MockComponent = () => <Calendar rangeYears={defRange} />;

const EnhancedComponent = withCalendarViews(MockComponent);

describe('withCalendarViews HOC', () => {
  test('renders the wrapped component with To-Do List enabled', () => {
    render(<EnhancedComponent rangeYears={defRange} isToDoList={true} />);

    expect(screen.getByText('Tasks for')).toBeInTheDocument();
  });

  test('renders the wrapped component with Date Range Picker enabled', () => {
    render(
      <EnhancedComponent rangeYears={defRange} isDateRangePicker={true} />,
    );

    expect(screen.getByText('From:')).toBeInTheDocument();
    expect(screen.getByText('To:')).toBeInTheDocument();
  });

  test('renders the wrapped component with Datepicker enabled', () => {
    render(<EnhancedComponent rangeYears={defRange} isDatepicker={true} />);

    expect(screen.getByText('Date:')).toBeInTheDocument();
  });
});
