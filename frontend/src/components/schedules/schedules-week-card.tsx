import { useEffect, useState } from "react";

interface SchedulesCardProps {
  day: string;
  start: any;
  end: any;
}

export default function SchedulesWeekCard(props: SchedulesCardProps): JSX.Element {
  const [startHours, setStartHours] = useState();
  const [startMinutes, setStartMinutes] = useState();
  const [endHours, setEndHours] = useState();
  const [endMinutes, setEndMinutes] = useState();

  useEffect(() => {
    setStartHours(props?.start?.substring(0, 2));
    setStartMinutes(props?.start?.substring(2, 4));
    setEndHours(props?.end?.substring(0, 2));
    setEndMinutes(props?.end?.substring(2, 4));
  }, [props?.end, props?.start]);

  return (
    <div className="h-[54px] bg-bg-white shadow rounded-md flex items-center px-1 sm:px-4 py-3 lg:py-0">
      <p className="w-[90px] sm:w-[100px] border-r-2 border-gray-500">{props.day}</p>

      <div className="flex justify-center items-center gap-x-1 sm:gap-x-4 pl-2 sm:pl-6">
        <p className="text-text-primary text-2xl">
          {Number(startHours) % 12 || 12} : {startMinutes}
          <span className="text-[14px] text-gray-500">
            {Number(startHours) >= 12 ? " pm" : " am"}
          </span>
        </p>
        <span>--</span>
        <p className="text-text-primary text-2xl">
          {Number(endHours) % 12 || 12} : {endMinutes}
          <span className="text-[14px] text-gray-500">
            {Number(endHours) >= 12 ? " pm" : " am"}
          </span>
        </p>
      </div>
    </div>
  );
}
