"use client";

import { addDays, getDate, getDay, subDays } from "date-fns";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { getDaysInMonth } from "@/helper/get-days-of-month";

interface SchedulesProps {
  schedules: any;
}

export default function SchedulesCalender(props: SchedulesProps) {
  const [schedules, setSchedules]: any = useState({});
  const [startDate, setStartDate]: any = useState(new Date());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [highlightDaysWithDates, setHighlightDaysithDates]: any = useState([]);

  useEffect(() => {
    setSchedules(props.schedules);
  }, [props.schedules]);

  // Function to change day names after date picker is rendered
  useEffect(() => {
    const changeDayNames = () => {
      const dayNameElements = document.querySelectorAll(
        ".react-datepicker__day-name"
      );
      const customDayNames = ["Week", "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]; // Replace with your custom day names

      dayNameElements.forEach((el, index) => {
        el.textContent = customDayNames[index];
      });
    };

    changeDayNames();
  }, []);

  // Extract the month and year from the selected date
  useEffect(() => {
    let allDates: any = [];
    const weekDays = getDaysInMonth(year, month);

    const sunday = weekDays.sundaysInMonth.map((el: any) =>
      new Date(el).toString()
    );
    const monday = weekDays.mondaysInMonth.map((el: any) =>
      new Date(el).toString()
    );
    const tuesday = weekDays.tuesdaysInMonth.map((el: any) =>
      new Date(el).toString()
    );
    const wednesday = weekDays.wednessdaysInMonth.map((el: any) =>
      new Date(el).toString()
    );
    const thursday = weekDays.thursdaysInMonth.map((el: any) =>
      new Date(el).toString()
    );
    const friday = weekDays.fridaysInMonth.map((el: any) =>
      new Date(el).toString()
    );
    const saturday = weekDays.satrudaysInMonth.map((el: any) =>
      new Date(el).toString()
    );

    if (schedules?.friday_start && schedules?.friday_end) {
      friday.map((el) => {
        allDates.push(addDays(new Date(el), 0));
      });
    }
    if (schedules?.saturday_start && schedules?.saturday_end) {
      saturday.map((el) => {
        allDates.push(addDays(new Date(el), 0));
      });
    }
    if (schedules?.sunday_start && schedules?.sunday_end) {
      sunday.map((el) => {
        allDates.push(addDays(new Date(el), 0));
      });
    }
    if (schedules?.monday_start && schedules?.monday_end) {
      monday.map((el) => {
        allDates.push(addDays(new Date(el), 0));
      });
    }
    if (schedules?.tuesday_start && schedules?.tuesday_end) {
      tuesday.map((el) => {
        allDates.push(addDays(new Date(el), 0));
      });
    }
    if (schedules?.wednesday_start && schedules?.wednesday_end) {
      wednesday.map((el) => {
        allDates.push(addDays(new Date(el), 0));
      });
    }
    if (schedules?.thursday_start && schedules?.thursday_end) {
      thursday.map((el) => {
        allDates.push(addDays(new Date(el), 0));
      });
    }

    setHighlightDaysithDates(allDates.filter((el: any) => el > new Date()));
  }, [
    month,
    schedules?.friday_end,
    schedules?.friday_start,
    schedules?.monday_end,
    schedules?.monday_start,
    schedules?.saturday_end,
    schedules?.saturday_start,
    schedules?.sunday_end,
    schedules?.sunday_start,
    schedules?.thursday_end,
    schedules?.thursday_start,
    schedules?.tuesday_end,
    schedules?.tuesday_start,
    schedules?.wednesday_end,
    schedules?.wednesday_start,
    year,
  ]);

  const handleMonthYearChange = (date: any) => {
    setMonth(date.getMonth() + 1); // January is 0, so we add 1
    setYear(date.getFullYear());
  };

  // weekdays
  const isWeekday = (date: any) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

  // tooltip for specific dates
  const renderDayContents: any = (day: any, date: any) => {
    const tooltipText = `Schedule for date: ${date}`;
    return <span title={tooltipText}>{getDate(date)}</span>;
  };

  return (
    <div className="text-center">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText="calender"
        // filterDate={isWeekday}
        // locale="en-GB"
        showWeekNumbers
        monthsShown={1}
        renderDayContents={renderDayContents}
        includeDateIntervals={[
          {
            start: subDays(new Date(), 1),
            end: addDays(new Date(), 365 * 100000),
          },
        ]}
        inline
        fixedHeight
        onMonthChange={handleMonthYearChange}
        onYearChange={handleMonthYearChange}
        highlightDates={highlightDaysWithDates}
      />
    </div>
  );
}
