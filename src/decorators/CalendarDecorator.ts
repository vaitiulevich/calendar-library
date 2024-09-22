import { ICalendar } from '@services/CalendarService';

export class HighlightTodayDecorator implements ICalendar {
  constructor(private calendar: ICalendar) {}

  getDaysInMonth(date: Date, startOfWeek: string): Date[] {
    const days = this.calendar.getDaysInMonth(date, startOfWeek);
    return days;
  }
}
