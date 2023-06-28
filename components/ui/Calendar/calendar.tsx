"use client";
 
import * as React from "react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {  DateFormatter, DayPicker, useInput } from "react-day-picker";
 
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { addMonths, isSameMonth } from 'date-fns';



import { format } from 'date-fns';
export type CalendarProps = React.ComponentProps<typeof DayPicker>;
const seasonEmoji: Record<string, string> = {
    winter: '⛄️',
    spring: '🌸',
    summer: '🌻',
    autumn: '🍂'

  };
  
  const getSeason = (month: Date): string => {
    const monthNumber = month.getMonth();
    if (monthNumber >= 0 && monthNumber < 3) return 'winter';
    if (monthNumber >= 3 && monthNumber < 6) return 'spring';
    if (monthNumber >= 6 && monthNumber < 9) return 'summer';
    else return 'autumn';
  };
  
  const formatCaption: DateFormatter = (month, options) => {
    const season = getSeason(month);
    return (
      <>
        <span role="img" aria-label={season}>
          {seasonEmoji[season]}
        </span>{' '}
        {format(month, 'LLLL', { locale: options?.locale })}
      </>
    );
  };
  
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  const today = new Date();
  const nextMonth = addMonths(new Date(), 1);
  const [month, setMonth] = useState(nextMonth);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1024);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const numberOfMonths = isSmallScreen ? 1 : 3;
  return (
    <div className="calendar-container">
      <DayPicker
      numberOfMonths={numberOfMonths}
      ISOWeek
      pagedNavigation
      formatters={{ formatCaption }}
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months: "flex flex-col divide-x sm:flex-row space-y-6 sm:space-x-2 sm:space-y-0",
          month: "space-y-8 p-8",
          caption: "flex justify-center p-4 divide-x relative items-center text-texthigh font-bold",
          caption_label: "text-[28px] font-medium",
          nav: "space-x-4 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-4",
          head_row: "flex  text-white font-medium",
          head_cell:
            "text-colortheme rounded-md w-9 font-normal text-[16px]",
          row: "flex w-full mt-2 ",
          cell: "text-center text-texthigh text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
          ),
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside: "text-texthigh opacity-50",
          day_disabled: "text-texthigh opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
          IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        }}
        {...props}
      />
       <button
      disabled={isSameMonth(today, month)}
      onClick={() => setMonth(today)}
    >
      Go to Today
    </button>
      <div className="event-container mt-4 p-4 bg-gray-100 rounded-lg">
        {/* Render the list of events here */}
        {/* ... */}
      </div>
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };