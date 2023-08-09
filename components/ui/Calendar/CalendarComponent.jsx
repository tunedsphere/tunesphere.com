import React, { useEffect } from "react"

import "./calendar.css"

const CalendarComponent = () => {
  useEffect(() => {
    function setupCalendar() {
      const monthEl = document.querySelector(".date")
      const prev = document.querySelector(".prev")
      const next = document.querySelector(".next")
      const weekdays = document.querySelector(".weekdays")
      const daysContainer = document.querySelector(".days")
      const todayBtn = document.querySelector(".today-btn")
      const dateInput = document.querySelector(".date-input")
      const gotoBtn = document.querySelector(".goto-btn")
      const eventDay = document.querySelector(".event-day")
      const eventDate = document.querySelector(".event-date")
      const eventsContainer = document.querySelector(".events")
      const addEventWrapper = document.querySelector(".add-event-wrapper")
      const addEventTitle = document.querySelector(".event-name")
      const addEventFrom = document.querySelector(".event-time-from")
      const addEventTo = document.querySelector(".event-time-to")
      const addEventCloseBtn = document.querySelector(".close")
      const addEventSubmit = document.querySelector(".add-event-btn")
      const addEventBtn = document.querySelector(".add-event")

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]

      let today = new Date()
      let month = today.getMonth()
      let year = today.getFullYear()
      let activeDay = today.getDate()
      let eventsArr = []

      function initCalendar() {
        monthEl.textContent = months[month] + " " + year
        weekdays.innerHTML = `
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        `

        const firstDay = new Date(year, month, 1).getDay()
        const daysInMonth = new Date(year, month + 1, 0).getDate()

        let daysHTML = ""
        for (let i = 0; i < firstDay; i++) {
          daysHTML += `<div class="day prev-date"></div>`
        }

        for (let day = 1; day <= daysInMonth; day++) {
          if (
            day === activeDay &&
            month === today.getMonth() &&
            year === today.getFullYear()
          ) {
            daysHTML += `<div class="day active">${day}</div>`
          } else {
            daysHTML += `<div class="day">${day}</div>`
          }
        }

        daysContainer.innerHTML = daysHTML

        getEvents()
        addListner()
      }

      function prevMonth() {
        month--
        if (month < 0) {
          month = 11
          year--
        }
        initCalendar()
      }

      function nextMonth() {
        month++
        if (month > 11) {
          month = 0
          year++
        }
        initCalendar()
      }

      function getActiveDay(day) {
        eventDay.textContent = day
        eventDate.textContent = months[month] + " " + year
      }

      function updateEvents(day) {
        eventsContainer.innerHTML = ""
        eventsArr.forEach((eventObj) => {
          if (
            eventObj.day === day &&
            eventObj.month === month + 1 &&
            eventObj.year === year
          ) {
            const event = document.createElement("div")
            event.classList.add("event")
            event.innerHTML = `
              <div class="event-info">
                <div class="event-name">${eventObj.name}</div>
                <div class="event-time">${eventObj.from} - ${eventObj.to}</div>
              </div>
              <div class="delete-event">
                <i class="fas fa-trash"></i>
              </div>
            `
            eventsContainer.appendChild(event)
          }
        })
      }

      function getEvents() {
        const savedEvents = localStorage.getItem("events")
        if (savedEvents) {
          eventsArr = JSON.parse(savedEvents)
        } else {
          eventsArr = []
        }
      }

      function saveEvent() {
        const eventName = addEventTitle.value
        const eventFrom = addEventFrom.value
        const eventTo = addEventTo.value

        const eventObj = {
          name: eventName,
          day: activeDay,
          month: month + 1,
          year: year,
          from: eventFrom,
          to: eventTo,
        }

        eventsArr.push(eventObj)
        localStorage.setItem("events", JSON.stringify(eventsArr))

        updateEvents(activeDay)

        addEventTitle.value = ""
        addEventFrom.value = ""
        addEventTo.value = ""
        addEventWrapper.classList.remove("show")
      }

      function deleteEvent(event) {
        const eventInfo = event.target.closest(".event-info")
        if (eventInfo) {
          const eventName = eventInfo.querySelector(".event-name").textContent
          const eventTime = eventInfo.querySelector(".event-time").textContent

          eventsArr = eventsArr.filter((eventObj) => {
            return (
              eventObj.name !== eventName ||
              (eventObj.name === eventName && eventObj.from !== eventTime)
            )
          })

          localStorage.setItem("events", JSON.stringify(eventsArr))
          updateEvents(activeDay)
        }
      }

      function addListner() {
        prev.addEventListener("click", prevMonth)
        next.addEventListener("click", nextMonth)
        daysContainer.addEventListener("click", (event) => {
          const selectedDay = event.target.closest(".day")
          if (selectedDay && !selectedDay.classList.contains("prev-date")) {
            activeDay = parseInt(selectedDay.textContent)
            updateEvents(activeDay)
          }
        })
        todayBtn.addEventListener("click", () => {
          today = new Date()
          month = today.getMonth()
          year = today.getFullYear()
          activeDay = today.getDate()
          initCalendar()
        })
        gotoBtn.addEventListener("click", () => {
          const [inputMonth, inputYear] = dateInput.value.split("/")
          if (inputMonth && inputYear) {
            month = parseInt(inputMonth) - 1
            year = parseInt(inputYear)
            initCalendar()
          }
        })
        addEventBtn.addEventListener("click", () => {
          addEventWrapper.classList.add("show")
        })
        addEventCloseBtn.addEventListener("click", () => {
          addEventWrapper.classList.remove("show")
        })
        addEventSubmit.addEventListener("click", saveEvent)
        eventsContainer.addEventListener("click", deleteEvent)
      }

      initCalendar()
    }

    setupCalendar()
  }, [])

  return (
    <div className="container">
      <div className="left">
        <div className="calendar bg-transparent">
          <div className="month">
            <i className="fas fa-angle-left prev"></i>
            <div className="date">December 2015</div>
            <i className="fas fa-angle-right next"></i>
          </div>
          <div className="weekdays">
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
          </div>
          <div className="days"></div>
          <div className="goto-today">
            <div className="goto">
              <input type="text" placeholder="mm/yyyy" className="date-input" />
              <button className="goto-btn">Go</button>
            </div>
            <button className="today-btn">Today</button>
          </div>
        </div>
      </div>
      <div className="expanded">
        <div className="today-date">
          <div className="event-day">Wed</div>
          <div className="event-date">12th December 2022</div>
        </div>
        <div className="events"></div>
        <div className="add-event-wrapper">
          <div className="add-event-header">
            <div className="title">Add Event</div>
            <i className="fas fa-times close"></i>
          </div>
          <div className="add-event-body">
            <div className="add-event-input">
              <input
                type="text"
                placeholder="Event Name"
                className="event-name"
              />
            </div>
            <div className="add-event-input">
              <input
                type="text"
                placeholder="Event Time From"
                className="event-time-from"
              />
            </div>
            <div className="add-event-input">
              <input
                type="text"
                placeholder="Event Time To"
                className="event-time-to"
              />
            </div>
          </div>
          <div className="add-event-footer">
            <button className="add-event-btn">Add Event</button>
          </div>
        </div>
      </div>
      <button className="add-event">
        <i className="fas fa-plus"></i>
      </button>
    </div>
  )
}

export default CalendarComponent
