import { ICalendar } from '@services/CalendarService';

export class HighlightTodayDecorator implements ICalendar {
  constructor(private calendar: ICalendar) {}

  getDaysInMonth(
    date: Date,
    startOfWeek: string,
    minDate?: Date,
    maxDate?: Date,
    rangeYears?: [number, number],
  ): Date[] {
    const days = this.calendar.getDaysInMonth(
      date,
      startOfWeek,
      minDate,
      maxDate,
      rangeYears,
    );

    const today = new Date();

    return days.map((day) => {
      if (
        day.getDate() === today.getDate() &&
        day.getMonth() === today.getMonth() &&
        day.getFullYear() === today.getFullYear()
      ) {
        console.log('today', day);
      }
      return day;
    });
  }
}
