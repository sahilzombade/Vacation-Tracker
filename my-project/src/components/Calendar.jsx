import React from 'react';
import Calendar from 'react-calendar';
import { format, parse } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import './ColoredCalendar.css'; // Custom CSS for coloring dates

const ColoredCalendar = ({ dates }) => {
  const convertDateFormat = (dateStr) => {
    const [day, month, year] = dateStr.split('-');
    return `${year}-${month}-${day}`;
  };

  const dateClasses = (date) => {
    const dateString = format(date, 'yyyy-MM-dd');

    if (dates.approved.map(convertDateFormat).includes(dateString)) {
      return 'highlight highlight-green';
    } else if (dates.planned.map(convertDateFormat).includes(dateString)) {
      return 'highlight highlight-blue';
    } else if (dates.pending.map(convertDateFormat).includes(dateString)) {
      return 'highlight highlight-red';
    }
    return '';
  };

  return (
    <Calendar
      tileClassName={({ date }) => dateClasses(date)}
    />
  );
};

export default ColoredCalendar;
