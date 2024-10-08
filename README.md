# Calendar Library

A flexible and customizable calendar component built with React. This library provides various views and features, including date range selection, to-do lists, and holiday marking.

## Table of Contents

- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)

## Demo

You can see the calendar in action at the following link: <a href="">Live Demo</a>.

## Installation

To install the calendar library, use npm or yarn:

```bash
npm install datepicker-calendar-library
```

or

```bash
yarn add datepicker-calendar-library
```

## Usage

To use the calendar component in your React application, import it.

```bash

import React from 'react';
import Calendar from 'datepicker-calendar-library';

const App = () => {
return (
<Calendar />
);
};

export default App;

```

##Props

| Prop Name           | Type               | Description                                                                                                                         |
| ------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `type`              | `string`           | Type of calendar view (month, week, year).                                                                                          |
| `maxDate`           | `Date`             | The maximum selectable date.                                                                                                        |
| `minDate`           | `Date`             | The minimum selectable date.                                                                                                        |
| `isShowWeekDays`    | `boolean`          | Show or hide week days.                                                                                                             |
| `isToDoList`        | `boolean`          | Enable to-do list feature.                                                                                                          |
| `isDatepicker`      | `boolean`          | Enable date picker feature.                                                                                                         |
| `isDateRangePicker` | `boolean`          | Enable date range selection.                                                                                                        |
| `holidays`          | `Array`            | Array of holiday dates to highlight.Must contain an array consisting of holidays with the structure :{ title: string; date: Date; } |
| `fillHolidayColor`  | `string`           | Color to fill holiday dates.                                                                                                        |
| `fillTodayColor`    | `string`           | Color to fill today dates.                                                                                                          |
| `startOfWeek`       | `string`           | Define the starting day of the week (e.g., Sunday).                                                                                 |
| `rangeYears`        | `[number, number]` | Declare minimum and maximum year boundaries [startYear,endYear]                                                                     |

##Examples

Basic Calendar

```tsx
<Calendar maxDate={defMaxDate} minDate={defMinDate} isShowWeekDays={false} />
```

Calendar with Combined Views

```tsx
<Calendar
  isToDoList={true}
  isDatepicker={true}
  isDateRangePicker={true}
  maxDate={defMaxDate}
  minDate={defMinDate}
/>
```

Calendar with Range Picker

```tsx
<Calendar maxDate={defMaxDate} minDate={defMinDate} isDateRangePicker={true} />
```

Calendar with Holidays

```tsx
<Calendar holidays={holidays} fillHolidayColor="#aa6af4" />
```

Calendar with Weekdays

```tsx
<Calendar isShowWeekDays={true} />
```
