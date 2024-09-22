export interface ICalendar {
  getDaysInMonth(date: Date, startOfWeek: string): Date[];
}
export enum WeekStart {
  Sunday = 'sunday',
  Monday = 'monday',
}

export class BaseCalendar implements ICalendar {
  getDaysInMonth(date: Date, startOfWeek: string): Date[] {
    const days: Date[] = [];
    const year = date.getFullYear();
    const month = date.getMonth();

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
