export const holidays = [
  {
    title: 'holiday',
    date: new Date('2024-09-20'),
  },
  {
    title: 'holiday',
    date: new Date('2024-09-12'),
  },
  {
    title: 'holiday',
    date: new Date('2024-10-11'),
  },
  {
    title: 'hb modsen',
    date: new Date('2024-07-28'),
  },
];

export const weekdaysSundayStart = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
export const weekdaysMondayStart = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const defMinDate = new Date(1920, 0, 1).getTime();
export const defMaxDate = new Date(2120, 11, 30).getTime();
export const defRange: [number, number] = [1920, 2120];

export const FIRST_DAY_OFFSET = 2;
export const DAYS_IN_A_WEEK = 7;
export const AVAILABLE_NUMBER_DAYS = 5;

export const countMonths = 12;
export const maxYearLength = 4;

export const FIRST_MONTH_INDEX = 0;
export const LAST_MONTH_INDEX = countMonths - 1;
export const INITIAL_WEEK_OFFSET = 0;
export const MAX_DAYS_IN_A_MONTH = 32;

export const maxLengthTask = 40;

export const titleTaskStorage = 'tasks';
