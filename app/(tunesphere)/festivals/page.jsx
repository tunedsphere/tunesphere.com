"use client"

import "@styles/globals.css"

import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/Calendar/calendar"
import EventForm from "@/components/ui/Calendar/EventForm"

const FestivalPage = () => {
  const [isEventFormVisible, setEventFormVisible] = useState(false)
  const [date, setDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [events, setEvents] = useState([])

  const handleDayClick = (day) => {
    setSelectedDate(day)
  }

  const handleEventFormClick = () => {
    setEventFormVisible(!isEventFormVisible)
  }

  const closeEventForm = () => {
    setEventFormVisible(false)
  }

  return (
    <main className="">
      <div className="flex justify-between gap-4 py-8">
        <Button
          className="right-0 float-right"
          variant="outline"
          onClick={handleEventFormClick}
        >
          Add Event
        </Button>
      </div>
      <div className="left-gradient"> </div>

      <div className="flex justify-center">
        <Calendar
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          onDayClick={handleDayClick}
        />
      </div>

      {isEventFormVisible && (
        <EventForm closeEventForm={closeEventForm} addEvent={setEvents} />
      )}
    </main>
  )
}

export default FestivalPage
