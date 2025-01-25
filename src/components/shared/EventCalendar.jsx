import React from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';

function EventCalendar({ events, onDateSelect }) {
  const tileClassName = ({ date }) => {
    const hasEvent = events?.some(
      event => 
        new Date(event.start_date) <= date && 
        new Date(event.end_date) >= date
    );
    
    return cn(
      'rounded-lg transition-all duration-200',
      hasEvent && 'bg-primary/20 font-bold text-primary hover:bg-primary/30'
    );
  };

  return (
    <Calendar
      className="w-full rounded-lg shadow-sm"
      tileClassName={tileClassName}
      onChange={onDateSelect}
    />
  );
}

export default EventCalendar;