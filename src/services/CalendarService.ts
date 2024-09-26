import { useState } from 'react';

export interface ICalendar {
  getDaysInMonth(
    date: Date,
    startOfWeek: string,
    minDate?: Date,
    maxDate?: Date,
    rangeYears?: [number, number],
  ): Date[];
}
export enum WeekStart {
  Sunday = 'sunday',
  Monday = 'monday',
}

export class BaseCalendar implements ICalendar {
  getDaysInMonth(
    date: Date,
    startOfWeek: string,
    minDate?: Date,
    maxDate?: Date,
    rangeYears?: [number, number],
  ): Date[] {
    const days: Date[] = [];
    let year = date.getFullYear();
    let month = date.getMonth();

    // if (rangeYears) {
    //   const [minYear, maxYear] = rangeYears;
    //   if (year < minYear) {
    //     year = minYear;
    //   } else if (year > maxYear) {
    //     year = maxYear;
    //   }
    // }

    if (rangeYears) {
      if (year < rangeYears[0] || year > rangeYears[1]) {
        console.log(year < rangeYears[0] || year > rangeYears[1]);

        year = rangeYears[0];
        month = 0;
      }
    }

    //   if (year < rangeYears[0] || year > rangeYears[1]) {
    //     year = rangeYears[0];
    //     month = 0; // Январь
    //   }
    // }

    console.log(year);

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const firstDayOfWeek = firstDay.getDay() - 2;
    const lastDayPrevMonth = new Date(year, month, 0);

    const typeOffset = startOfWeek === WeekStart.Monday ? 0 : 1;

    const countDayPrevMonthDisplay = firstDayOfWeek >= -1 ? firstDayOfWeek : 5;
    const offset = lastDayPrevMonth.getDate() - countDayPrevMonthDisplay;

    for (let i = offset - typeOffset; i <= lastDayPrevMonth.getDate(); i++) {
      if (countDayPrevMonthDisplay + typeOffset > 5) {
        break;
      }
      const day = new Date(year, month - 1, i);
      days.push(day);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const day = new Date(year, month, i);
      days.push(day);
    }

    for (
      let i = 1;
      i <= (lastDay.getDay() !== 0 ? 7 - lastDay.getDay() : 0) - typeOffset;
      i++
    ) {
      const day = new Date(year, month + 1, i);
      days.push(day);
    }
    return days;
  }
}
