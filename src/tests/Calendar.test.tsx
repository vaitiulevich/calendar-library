import React from 'react';
import Calendar from '@components/Calendar/Calendar';
import { IHoliday } from '@components/Calendar/Calendar';
import { CalendarProvider } from '@store/CalendarContext';
import { ToDoListProvider } from '@store/ToDoContext';
import { render, screen } from '@testing-library/react';
import { getDayClass } from '@utils/daysTypesUtils';

test('renders currect month', () => {
  render(
    <CalendarProvider initialDate={new Date()}>
      <ToDoListProvider>
        <Calendar rangeYears={[2020, 2030]} />
      </ToDoListProvider>
    </CalendarProvider>,
  );
  const nowMonth = new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  expect(screen.getByText(nowMonth)).toBeInTheDocument();
});

test('returns today class for the current date', () => {
  const today = new Date();
  const { className } = getDayClass(today, today, today);

  expect(className).toContain('today');
});

test('returns holiday class for holidays', () => {
  const holidays: IHoliday[] = [
    { title: 'New Year', date: new Date(2024, 0, 1) },
  ];
  const holidayDate = new Date(2024, 0, 1);
  const { className } = getDayClass(
    holidayDate,
    holidayDate,
    holidayDate,
    undefined,
    undefined,
    false,
    holidays,
  );

  expect(className).toContain('holiday');
});

test('returns disabled class for days outside min and max date', () => {
  const minDate = new Date(2024, 10, 1).getTime();
  const maxDate = new Date(2024, 10, 31).getTime();
  const outsideDate = new Date(2024, 9, 30);

  const { className, isDisabled } = getDayClass(
    outsideDate,
    outsideDate,
    outsideDate,
    minDate,
    maxDate,
  );

  expect(className).toContain('disabled');
  expect(isDisabled).toBe(true);
});
