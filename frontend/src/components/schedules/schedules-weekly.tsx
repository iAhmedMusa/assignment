import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import SchedulesWeekCard from "./schedules-week-card";

interface WeeklyProps {
  schedules: any;
}

export default function SchedulesWeekly(props: WeeklyProps): JSX.Element {
  const [weekDaysSchedules, setWeekDaysSchedules]: any = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    let weekSchedules = [];

    if (props.schedules?.friday_start && props.schedules?.friday_end) {
      weekSchedules.push({
        day: "Friday",
        start: props.schedules?.friday_start,
        end: props.schedules?.friday_end,
      });
    }
    if (props.schedules?.saturday_start && props.schedules?.saturday_end) {
      weekSchedules.push({
        day: "Saturday",
        start: props.schedules?.saturday_start,
        end: props.schedules?.saturday_end,
      });
    }
    if (props.schedules?.sunday_start && props.schedules?.sunday_end) {
      weekSchedules.push({
        day: "Sunday",
        start: props.schedules?.sunday_start,
        end: props.schedules?.sunday_end,
      });
    }
    if (props.schedules?.monday_start && props.schedules?.monday_end) {
      weekSchedules.push({
        day: "Monday",
        start: props.schedules?.monday_start,
        end: props.schedules?.monday_end,
      });
    }
    if (props.schedules?.tuesday_start && props.schedules?.tuesday_end) {
      weekSchedules.push({
        day: "Tuesday",
        start: props.schedules?.tuesday_start,
        end: props.schedules?.tuesday_end,
      });
    }
    if (props.schedules?.wednesday_start && props.schedules?.wednesday_end) {
      weekSchedules.push({
        day: "Wednesday",
        start: props.schedules?.wednesday_start,
        end: props.schedules?.wednesday_end,
      });
    }
    if (props.schedules?.thursday_start && props.schedules?.thursday_end) {
      weekSchedules.push({
        day: "Thursday",
        start: props.schedules?.thursday_start,
        end: props.schedules?.thursday_end,
      });
    }

    setWeekDaysSchedules(weekSchedules);
  }, [
    props.schedules?.friday_end,
    props.schedules?.friday_start,
    props.schedules?.monday_end,
    props.schedules?.monday_start,
    props.schedules?.saturday_end,
    props.schedules?.saturday_start,
    props.schedules?.sunday_end,
    props.schedules?.sunday_start,
    props.schedules?.thursday_end,
    props.schedules?.thursday_start,
    props.schedules?.tuesday_end,
    props.schedules?.tuesday_start,
    props.schedules?.wednesday_end,
    props.schedules?.wednesday_start,
  ]);

  return (
    <div className="flex justify-center mt-8 lg:mt-0 relative">
      <p
        className={`absolute -top-8 left-0 text-2xl text-text-darkBlue tracking-wider w-52 ${
          pathname == "/schedules" ? "block" : "hidden"
        }`}
      >
        {!!weekDaysSchedules.length ? "Every" : "No Schedules Yet"}
      </p>
      <div className="flex flex-col gap-4">
        {!!weekDaysSchedules &&
          weekDaysSchedules.map((schedule: any) => {
            return (
              <SchedulesWeekCard
                key={schedule.day}
                day={schedule.day}
                start={schedule.start}
                end={schedule.end}
              />
            );
          })}
      </div>
    </div>
  );
}
