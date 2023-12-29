import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSunday,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
} from "date-fns";

function getDaysInMonth(year: any, month: any) {
  // Create the start and end dates for the given month
  const startDate = startOfMonth(new Date(year, month - 1));
  const endDate = endOfMonth(startDate);

  // Get all the dates within the month
  const allDatesInMonth = eachDayOfInterval({ start: startDate, end: endDate });

  // Filter the dates to keep only the Sundays
  const sundaysInMonth = allDatesInMonth.filter((date) => isSunday(date));
  const mondaysInMonth = allDatesInMonth.filter((date) => isMonday(date));
  const tuesdaysInMonth = allDatesInMonth.filter((date) => isTuesday(date));
  const wednessdaysInMonth = allDatesInMonth.filter((date) => isWednesday(date));
  const thursdaysInMonth = allDatesInMonth.filter((date) => isThursday(date));
  const fridaysInMonth = allDatesInMonth.filter((date) => isFriday(date));
  const satrudaysInMonth = allDatesInMonth.filter((date) => isSaturday(date));

  return {
    sundaysInMonth,
    mondaysInMonth,
    tuesdaysInMonth,
    wednessdaysInMonth,
    thursdaysInMonth,
    fridaysInMonth,
    satrudaysInMonth,
  };
}

export { getDaysInMonth };
