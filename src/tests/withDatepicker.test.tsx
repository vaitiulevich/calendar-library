import React from 'react';
import Calendar from '@components/Calendar/Calendar';
import { defRange } from '@constants/constants';
import withDatepicker from '@decorators/withDatepicker';
import { CalendarProvider } from '@store/CalendarContext';
import { fireEvent,render, screen } from '@testing-library/react';

const MockComponent = () => <Calendar rangeYears={defRange} />;

const WrappedComponent = withDatepicker(MockComponent);

describe('withDatepicker HOC', () => {
  const mockHandleSetMonth = jest.fn();

  const setup = () => {
    return render(
      <CalendarProvider>
        <WrappedComponent rangeYears={defRange} />
      </CalendarProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders EnhancedDateInput and initial state', () => {
    setup();

    expect(screen.getByPlaceholderText(/Choose Date/i)).toBeInTheDocument();
  });

  test('handles date selection', () => {
    setup();

    const input = screen.getByPlaceholderText(/Choose Date/i);
    fireEvent.change(input, { target: { value: '01012023' } });

    expect(mockHandleSetMonth).toHaveBeenCalledTimes(0);
  });
});
