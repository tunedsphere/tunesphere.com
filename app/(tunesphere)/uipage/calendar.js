function setupCalendar() {
    const calendar = document.querySelector(".calendar");
    const date = document.querySelector(".date");
    const daysContainer = document.querySelector(".days");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const todayBtn = document.querySelector(".today-btn");
    const gotoBtn = document.querySelector(".goto-btn");
    const dateInput = document.querySelector(".date-input");
    const eventDay = document.querySelector(".event-day");
    const eventDate = document.querySelector(".event-date");
    const eventsContainer = document.querySelector(".events");
    const addEventBtn = document.querySelector(".add-event");
    const addEventWrapper = document.querySelector(".add-event-wrapper");
    const addEventCloseBtn = document.querySelector(".close");
    const addEventTitle = document.querySelector(".event-name");
    const addEventFrom = document.querySelector(".event-time-from");
    const addEventTo = document.querySelector(".event-time-to");
    const addEventSubmit = document.querySelector(".add-event-btn");
  
    let today = new Date();
    let activeDay;
    let month = today.getMonth();
    let year = today.getFullYear();
  
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
    ];
  
    let eventsArr = [];
    getEvents();
    console.log(eventsArr);
  
    function initCalendar() {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const prevLastDay = new Date(year, month, 0);
      const prevDays = prevLastDay.getDate();
      const lastDate = lastDay.getDate();
      const day = firstDay.getDay();
      const nextDays = 7 - lastDay.getDay() - 1;
  
      date.innerHTML = months[month] + " " + year;
  
      let days = "";
  
      for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
      }
  
      for (let i = 1; i <= lastDate; i++) {
        let event = false;
        eventsArr.forEach((eventObj) => {
          if (
            eventObj.day === i &&
            eventObj.month === month + 1 &&
            eventObj.year === year
          ) {
            event = true;
          }
        });
        if (
          i === new Date().getDate() &&
          year === new Date().getFullYear() &&
          month === new Date().getMonth()
        ) {
          activeDay = i;
          getActiveDay(i);
          updateEvents(i);
          if (event) {
            days += `<div class="day today active event">${i}</div>`;
          } else {
            days += `<div class="day today active">${i}</div>`;
          }
        } else {
          if (event) {
            days += `<div class="day event">${i}</div>`;
          } else {
            days += `<div class="day">${i}</div>`;
          }
        }
      }
  
      for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
      }
  
      daysContainer.innerHTML = days;
      addListner();
    }
  
    function prevMonth() {
      month--;
      if (month < 0) {
        month = 11;
        year--;
      }
      initCalendar();
    }
  
    function nextMonth() {
      month++;
      if (month > 11) {
        month = 0;
        year++;
      }
      initCalendar();
    }
  
    function getActiveDay(day) {
      eventDay.innerHTML = day;
      eventDate.innerHTML = months[month] + " " + year;
    }
  
    function updateEvents(day) {
      eventsContainer.innerHTML = "";
      eventsArr.forEach((eventObj) => {
        if (
          eventObj.day === day &&
          eventObj.month === month + 1 &&
          eventObj.year === year
        ) {
          const event = document.createElement("div");
          event.className = "event-item";
          event.innerHTML = `
            <div class="event-title">${eventObj.title}</div>
            <div class="event-time">${eventObj.from} - ${eventObj.to}</div>
          `;
          eventsContainer.appendChild(event);
        }
      });
    }
  
    function gotoDate() {
      const inputDate = new Date(dateInput.value);
      if (!isNaN(inputDate.getTime())) {
        month = inputDate.getMonth();
        year = inputDate.getFullYear();
        initCalendar();
        dateInput.value = "";
      } else {
        alert("Invalid date!");
      }
    }
  
    function addEvent() {
      addEventWrapper.style.display = "flex";
    }
  
    function closeAddEvent() {
      addEventWrapper.style.display = "none";
      addEventTitle.value = "";
      addEventFrom.value = "";
      addEventTo.value = "";
    }
  
    function saveEvent() {
      const title = addEventTitle.value;
      const from = addEventFrom.value;
      const to = addEventTo.value;
  
      if (title === "" || from === "" || to === "") {
        alert("Please fill in all the fields!");
      } else {
        const eventObj = {
          day: activeDay,
          month: month + 1,
          year: year,
          title: title,
          from: from,
          to: to,
        };
  
        eventsArr.push(eventObj);
        updateEvents(activeDay);
        closeAddEvent();
      }
    }
  
    function getEvents() {
      const storedEvents = localStorage.getItem("events");
      if (storedEvents) {
        eventsArr = JSON.parse(storedEvents);
      }
    }
  
    function addListner() {
      const days = document.querySelectorAll(".day:not(.prev-date):not(.next-date)");
  
      days.forEach((day) => {
        day.addEventListener("click", () => {
          activeDay = parseInt(day.innerHTML);
          getActiveDay(activeDay);
          updateEvents(activeDay);
          days.forEach((d) => {
            d.classList.remove("active");
          });
          day.classList.add("active");
        });
      });
    }
  
    prev.addEventListener("click", prevMonth);
    next.addEventListener("click", nextMonth);
    todayBtn.addEventListener("click", () => {
      today = new Date();
      month = today.getMonth();
      year = today.getFullYear();
      initCalendar();
    });
    dateInput.addEventListener("input", (e) => {
      gotoBtn.disabled = e.target.value === "";
    });
    gotoBtn.addEventListener("click", gotoDate);
    addEventBtn.addEventListener("click", addEvent);
    addEventCloseBtn.addEventListener("click", closeAddEvent);
    addEventSubmit.addEventListener("click", saveEvent);
  
    initCalendar();
  }
  
  setupCalendar();