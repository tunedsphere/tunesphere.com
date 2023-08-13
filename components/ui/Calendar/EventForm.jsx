"use client"

import React, { useEffect, useRef, useState } from "react"
import CountryComponent from "@/components/Country/CountryComponent"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { format, isAfter, isBefore, isValid, parse } from "date-fns"
import { DayPicker } from "react-day-picker"

const EventForm = ({ closeEventForm }) => {
  const [selectedRange, setSelectedRange] = useState()
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")

  const handleFromChange = (e) => {
    setFromValue(e.target.value)
    const date = parse(e.target.value, "y-MM-dd", new Date())
    if (!isValid(date)) {
      return setSelectedRange({ from: undefined, to: undefined })
    }
    if (selectedRange?.to && isAfter(date, selectedRange.to)) {
      setSelectedRange({ from: selectedRange.to, to: date })
    } else {
      setSelectedRange({ from: date, to: selectedRange?.to })
    }
  }

  const handleToChange = (e) => {
    setToValue(e.target.value)
    const date = parse(e.target.value, "y-MM-dd", new Date())

    if (!isValid(date)) {
      return setSelectedRange({ from: selectedRange?.from, to: undefined })
    }
    if (selectedRange?.from && isBefore(date, selectedRange.from)) {
      setSelectedRange({ from: date, to: selectedRange.from })
    } else {
      setSelectedRange({ from: selectedRange?.from, to: date })
    }
  }

  const handleRangeSelect = (range) => {
    setSelectedRange(range)
    if (range?.from) {
      setFromValue(format(range.from, "y-MM-dd"))
    } else {
      setFromValue("")
    }
    if (range?.to) {
      setToValue(format(range.to, "y-MM-dd"))
    } else {
      setToValue("")
    }
  }

  const eventFormRef = useRef(null)
  const [event, setEvent] = useState({
    title: "",
    date: new Date(),
    location: "",
    description: "",
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setEvent({ ...event, [name]: value })
  }

  const handleDateChange = (date) => {
    setEvent({ ...event, date: date })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    // Add the event to the events array
    const newEvent = { ...event }
    addEvent((prevEvents) => [...prevEvents, newEvent])
    // Reset the form
    setEvent({
      title: "",
      date: new Date(),
      location: "",
      description: "",
    })
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeEventForm()
      }
    }

    const handleClickOutside = (event) => {
      if (
        eventFormRef.current &&
        !eventFormRef.current.contains(event.target)
      ) {
        closeEventForm()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [closeEventForm])

  return (
    <div className="fixed inset-0 z-9999 bg-black bg-opacity-50">
      <div
        ref={eventFormRef}
        id="event-form"
        className="bottom-0 left-2 right-2 z-10000 mx-auto my-auto mt-36 flex max-w-[calc(100%-8px)] flex-col justify-center overflow-y-auto rounded-lg border border-accent-3 bg-accent-1 md:bottom-auto md:top-1/4 md:max-w-2xl"
      >
        <div className="flex flex-none flex-row-reverse items-center border-b border-accent-2 p-2">
          <Button
            id="cancel-button"
            variant="outline"
            aria-label="Cancel"
            type="button"
            tabindex="-1"
            className="mr-2 rounded-[4px] p-3 px-1 text-xs font-medium text-textlow after:content-['close'] hover:bg-accent-1 hover:text-texthigh md:after:content-['Esc']"
            onClick={closeEventForm}
          ></Button>
        </div>
        <div className="">
          <form
            className="border-1 align-center relative divide-y p-4 text-texthigh"
            onSubmit={handleSubmit}
          >
            <div className="p-4">
              <Label className="ml-2 p-2 font-bold underline decoration-theme underline-offset-4">
                Tittle :
              </Label>
              <Input
                id="event-title"
                className="bg-inherit p-4 text-texthigh outline-none"
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
                    className="input-reset pa2 ma black ba bg-white"
                  />
                  {" – "}
                  <input
                    size={10}
                    placeholder="To Date"
                    value={toValue}
                    onChange={handleToChange}
                    className="input-reset pa2 black ba bg-white"
                  />
                </form>
              }
            />

            <div className="p-4">
              <Label className="ml-2 p-2 font-bold underline decoration-theme underline-offset-4">
                Location:
              </Label>
              <div className="flex flex-col items-center justify-center">
                <p>All Countries</p>
                <CountryComponent></CountryComponent>
              </div>
            </div>
            <div className="p-4">
              <Label className="ml-2 p-2 font-bold underline decoration-theme underline-offset-4">
                Description :
              </Label>
              <Textarea
                id="event-description"
                className="mt-2 min-h-[200px] overflow-y-auto bg-inherit p-4 text-texthigh outline-none"
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

            <Button
              className="flex w-1/4 justify-center"
              variant="outline"
              type="submit"
            >
              Add Event
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EventForm
