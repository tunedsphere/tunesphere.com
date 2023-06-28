"use client";
import React, { useState, useEffect, useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import { Button } from '@components/ui/button';
import { Textarea } from '@components/ui/textarea';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { format, isAfter, isBefore, isValid, parse } from 'date-fns';
import CountryComponent from '@components/Country/CountryComponent'


const EventForm = ({ closeEventForm}) => {
  const [selectedRange, setSelectedRange] = useState();
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const handleFromChange = (e) => {
    setFromValue(e.target.value);
    const date = parse(e.target.value, 'y-MM-dd', new Date());
    if (!isValid(date)) {
      return setSelectedRange({ from: undefined, to: undefined });
    }
    if (selectedRange?.to && isAfter(date, selectedRange.to)) {
      setSelectedRange({ from: selectedRange.to, to: date });
    } else {
      setSelectedRange({ from: date, to: selectedRange?.to });
    }
  };

  const handleToChange = (e) => {
    setToValue(e.target.value);
    const date = parse(e.target.value, 'y-MM-dd', new Date());

    if (!isValid(date)) {
      return setSelectedRange({ from: selectedRange?.from, to: undefined });
    }
    if (selectedRange?.from && isBefore(date, selectedRange.from)) {
      setSelectedRange({ from: date, to: selectedRange.from });
    } else {
      setSelectedRange({ from: selectedRange?.from, to: date });
    }
  };

  const handleRangeSelect = (range) => {
    setSelectedRange(range);
    if (range?.from) {
      setFromValue(format(range.from, 'y-MM-dd'));
    } else {
      setFromValue('');
    }
    if (range?.to) {
      setToValue(format(range.to, 'y-MM-dd'));
    } else {
      setToValue('');
    }
  };

  const eventFormRef = useRef(null);
  const [event, setEvent] = useState({
    title: '',
    date: new Date(),
    location: '',
    description: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEvent({ ...event, [name]: value });
  };

  const handleDateChange = (date) => {
    setEvent({ ...event, date: date });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add the event to the events array
    const newEvent = { ...event };
    addEvent((prevEvents) => [...prevEvents, newEvent]);
    // Reset the form
    setEvent({
      title: '',
      date: new Date(),
      location: '',
      description: '',
    });
  };


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeEventForm();
      }
    };

    const handleClickOutside = (event) => {
      if (eventFormRef.current && !eventFormRef.current.contains(event.target)) {
        closeEventForm();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [closeEventForm]);

  return (
    <div className="z-9999 fixed inset-0 bg-black bg-opacity-50">
      <div
        ref={eventFormRef}
        id="event-form"
        className="overflow-y-auto z-10000 flex flex-col justify-center bottom-0 mt-36 right-2 left-2 my-auto mx-auto bg-accent1 rounded-lg border border-accent-3 md:max-w-2xl md:top-1/4 md:bottom-auto max-w-[calc(100%-8px)]"
      >
        <div className="flex flex-none flex-row-reverse items-center border-b border-accent2 p-2">
          <Button
            id="cancel-button"
            variant="outline"
            aria-label="Cancel"
            type="button"
            tabindex="-1"
            className="text-xs after:content-['close'] md:after:content-['Esc'] px-1 mr-2 rounded-[4px] p-3 font-medium hover:bg-accent1 hover:text-texthigh text-textlow"
            onClick={closeEventForm}
          ></Button>
        </div>
        <div className="">
          <form className="relative p-4 border-1 divide-y align-center text-texthigh" onSubmit={handleSubmit}>
              <div className="p-4">
                <Label className="ml-2 p-2 font-bold underline underline-offset-4 decoration-colortheme">
                  Tittle :
                </Label>
                <Input
                  id="event-title"
                  className="p-4 outline-none bg-inherit text-texthigh"
                  type="text"
                  name="title"
                  placeholder="Add a Title"
                  role="dialog"
                  autoCorrect="off"
                  spellCheck="false"
                  aria-expanded="true"
                  value={event.title}
                  onChange={handleInputChange}
                  required
                />
          
            </div>
            <Label>Date: </Label>
            <DayPicker
              mode="range"
              selected={selectedRange}
              onSelect={handleRangeSelect}
              footer={
                <form className="ma2">
                  <input
                    size={10}
                    placeholder="From Date"
                    value={fromValue}
                    onChange={handleFromChange}
                    className="input-reset pa2 ma bg-white black ba"
                  />
                  {' – '}
                  <input
                    size={10}
                    placeholder="To Date"
                    value={toValue}
                    onChange={handleToChange}
                    className="input-reset pa2 bg-white black ba"
                  />
                </form>
              }
            />

            <div className="p-4">
              <Label className="ml-2 p-2 font-bold underline underline-offset-4 decoration-colortheme">
                Location:</Label>
                <div className='flex justify-center flex-col items-center'>
						<p>All Countries</p>
						<CountryComponent></CountryComponent>
					</div>
              
            </div>
            <div className="p-4">
              <Label className="ml-2 font-bold p-2 underline underline-offset-4 decoration-colortheme">
                Description :
              </Label>
              <Textarea
                id="event-description"
                className="p-4 mt-2 min-h-[200px] outline-none bg-inherit text-texthigh overflow-y-auto"
                type="text"
                name="description"
                placeholder="Add a Description"
                role="dialog"
                autoCorrect="off"
                spellCheck="false"
                aria-expanded="true"
                value={event.description}
                onChange={handleInputChange}
                required
              ></Textarea>
            </div>

            <Button className="w-1/4 flex justify-center" variant="outline" type="submit">
              Add Event
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventForm;