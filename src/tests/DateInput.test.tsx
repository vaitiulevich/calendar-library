// DateInput.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DateInput from '@components/DateInput/DateInput';

describe('DateInput Component', () => {
  const mockHandleSelectDate = jest.fn();

  beforeEach(() => {
    render(
      <DateInput
        handleSelectDate={mockHandleSelectDate}
        labelText="Select Date"
      />,
    );
  });

  test('renders the label text', () => {
    expect(screen.getByText(/Select Date/i)).toBeInTheDocument();
  });

  test('handles input change and updates the value', () => {
    const input = screen.getByPlaceholderText(
      /Choose Date/i,
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: '01012023' } });

    expect(input.value).toBe('01/01/2023');
  });

  test('calls handleSelectDate with a valid date', () => {
    const input = screen.getByPlaceholderText(/Choose Date/i);

    fireEvent.change(input, { target: { value: '01012023' } });

    expect(mockHandleSelectDate).toHaveBeenCalledWith(new Date(2023, 0, 1));
  });

  test('clears input when clear button is clicked', () => {
    const input = screen.getByPlaceholderText(
      /Choose Date/i,
    ) as HTMLInputElement;
    const clearButton = screen.getByRole('button');

    fireEvent.change(input, { target: { value: '01012023' } });
    fireEvent.click(clearButton);

    expect(input.value).toBe('');
    expect(mockHandleSelectDate).toHaveBeenCalledWith(null);
  });
});
