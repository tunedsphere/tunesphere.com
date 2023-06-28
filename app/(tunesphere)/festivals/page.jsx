"use client";
import '@styles/globals.css';

import React, { useState } from 'react';
import { Calendar } from '@ui/Calendar/calendar';
import { addMonths, isSameMonth } from 'date-fns';
import EventForm from '@ui/Calendar/EventForm';
import { Button } from '@components/ui/button';

const FestivalPage = () => {
  const [isEventFormVisible, setEventFormVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);


  const handleDayClick = (day) => {
    setSelectedDate(day);
  };


  const handleEventFormClick = () => {
    setEventFormVisible(!isEventFormVisible);
  };

  const closeEventForm = () => {
    setEventFormVisible(false);
  };


  return (
    <main className="">
            <div className="py-8 flex justify-between gap-4">

        <Button
        className='float-right right-0'
      variant="outline"
       onClick={handleEventFormClick}>Add Event</Button>
       
      </div>
      <div className='left-gradient'> </div>
     
      <div className='flex justify-center'>
      <Calendar
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        onDayClick={handleDayClick}
      />
</div>
     

{isEventFormVisible && <EventForm closeEventForm={closeEventForm} addEvent={setEvents} />}
    </main>
  );
};

export default FestivalPage;