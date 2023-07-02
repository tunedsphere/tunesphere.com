"use client"

import * as React from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format } from 'date-fns';
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";


export type CalendarProps = React.ComponentProps<typeof DayPicker>

const seasonEmoji = {
  winter: '⛄️',
  spring: '🌸',
  summer: '🌻',
  autumn: '🍂'
};

const getSeason = (month) => {
  const monthNumber = month.getMonth();
  if (monthNumber >= 0 && monthNumber < 3) return 'winter';
  if (monthNumber >= 3 && monthNumber < 6) return 'spring';
  if (monthNumber >= 6 && monthNumber < 9) return 'summer';
  else return 'autumn';
};
const formatCaption = (month, options) => {
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
}: CalendarProps) {

  return (
    <DayPicker

    captionLayout="dropdown-buttons" fromYear={2015} toYear={2025}
      numberOfMonths={1}
      formatters={{ formatCaption }}
      ISOWeek
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        // 'root': string
        vhidden: "hidden",
        // 'button_reset': string
        // 'button': string
        // 'day_selected': string
        // 'months': string
        // 'month': string
        // 'table': string
        // 'with_weeknumber': string
        // 'caption': string
        // 'multiple_months': string
        // 'caption_dropdowns': string
        // 'caption_label': string
        // 'nav': string
        // 'caption_start': string
        // 'caption_end': string
        // 'nav_button': string
        // 'dropdown_year': string
        // 'dropdown_month': string
        // 'dropdown': string
        // 'dropdown_icon': string
        // 'head': string
        // 'head_row': string
        // 'row': string
        // 'head_cell': string
        // 'tbody': string
        // 'tfoot': string
        // 'cell': string
        // 'weeknumber': string
        // 'day': string
        // 'day_today': string
        // 'day_outside': string
        // 'day_range_start': string
        // 'day_range_end': string
        // 'day_range_middle': string
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }


// "use client";
// import React from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import 'react-day-picker/dist/style.css';
// import { DayPicker } from 'react-day-picker';
// import { format } from 'date-fns';

// const seasonEmoji = {
//   winter: '⛄️',
//   spring: '🌸',
//   summer: '🌻',
//   autumn: '🍂'
// };

// const getSeason = (month) => {
//   const monthNumber = month.getMonth();
//   if (monthNumber >= 0 && monthNumber < 3) return 'winter';
//   if (monthNumber >= 3 && monthNumber < 6) return 'spring';
//   if (monthNumber >= 6 && monthNumber < 9) return 'summer';
//   else return 'autumn';
// };

// const formatCaption = (month, options) => {
//   const season = getSeason(month);
//   return (
//     <>
//       <span role="img" aria-label={season}>
//         {seasonEmoji[season]}
//       </span>{' '}
//       {format(month, 'LLLL', { locale: options?.locale })}
//     </>
//   );
// };

// function Calendar({ showOutsideDays = true, ...props }) {
//   return (
//     <div className="flex justify-center">
//       <DayPicker
//         formatters={{ formatCaption }}
//         ISOWeek
//         showOutsideDays={showOutsideDays}
//         captionLayout="dropdown-buttons"
//         fromYear={2015}
//         toYear={2025}
//         numberOfMonths={1}
//         {...props}
//       />
//     </div>
//   );
// }

// Calendar.displayName = "Calendar";

// export { Calendar };