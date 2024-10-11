import React from 'react';
import Calendar from '@components/Calendar/Calendar';
import { defRange } from '@constants/constants';
import withRangeByDate from '@decorators/withRangeByDates';
import { fireEvent, render, screen } from '@testing-library/react';

const MockComponent = () => <Calendar rangeYears={defRange} />;

const WrappedTestComponent = withRangeByDate(MockComponent);

describe('withRangeByDate HOC', () => {
  const mockHandleSelectDate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should select a date within the range', () => {
    const minDate = new Date(2024, 0, 1);
    const maxDate = new Date(2024, 11, 31);
    const initialDate = new Date(2024, 5, 15);

    render(
      <WrappedTestComponent
        handleSelectDate={mockHandleSelectDate}
        labelText="From:"
        minDate={minDate}
        maxDate={maxDate}
        value={initialDate}
      />,
    );

    const input = screen.getByLabelText('Choose Date') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '2024-06-15' } });
    expect(mockHandleSelectDate).toHaveBeenCalledWith(new Date('2024-06-15'));

    expect(mockHandleSelectDate).toHaveBeenCalledTimes(1);
  });

  test('should clamp date to minDate if selected date is before minDate', () => {
    const minDate = new Date(2024, 0, 1);
    const maxDate = new Date(2024, 11, 31);

    render(
      <WrappedTestComponent
        handleSelectDate={mockHandleSelectDate}
        labelText="From:"
        minDate={minDate}
        maxDate={maxDate}
        value={null}
      />,
    );

    const input = screen.getByLabelText('Choose Date') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '2023-12-31' } });
    expect(mockHandleSelectDate).toHaveBeenCalledWith(minDate);
  });

  test('should clamp date to maxDate if selected date is after maxDate', () => {
    const minDate = new Date(2024, 0, 1);
    const maxDate = new Date(2024, 11, 31);

    render(
      <WrappedTestComponent
        handleSelectDate={mockHandleSelectDate}
        labelText="To:"
        minDate={minDate}
        maxDate={maxDate}
        value={null}
      />,
    );

    const input = screen.getByLabelText('Choose Date') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '2025-01-01' } });
    expect(mockHandleSelectDate).toHaveBeenCalledWith(maxDate);
  });
});
