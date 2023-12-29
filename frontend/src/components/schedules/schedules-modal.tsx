"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import bin from "../../../public/icons/bin.png";
import "react-datepicker/dist/react-datepicker.css";

import api from "@/lib/api";

let weeks = [
  {
    day: "Sunday",
    start: "sunStart",
    end: "sunEnd",
  },
  {
    day: "Monday",
    start: "monStart",
    end: "monEnd",
  },
  {
    day: "Tuesday",
    start: "tueStart",
    end: "tueEnd",
  },
  {
    day: "Wednesday",
    start: "wedStart",
    end: "wedEnd",
  },
  {
    day: "Thursday",
    start: "thuStart",
    end: "thuEnd",
  },
  {
    day: "Friday",
    start: "friStart",
    end: "friEnd",
  },
  {
    day: "Saturday",
    start: "satStart",
    end: "satEnd",
  },
];

interface schedulesData {
  schedules: any;
  isSchedulesChanged: boolean;
  setIsSchedulesChanged: any;
}

export default function SchedulesModal(props: schedulesData): JSX.Element {
  const activeHour = (value: any) => {
    let hr = value?.substring(0, 2);

    return hr;
  };
  const activeMin = (value: any) => {
    let min = value?.substring(2, 4);

    return min;
  };

  const [hour, setHour]: any = useState({});

  useEffect(() => {
    setHour({
      sunStart:
        props.schedules == null
          ? ""
          : new Date().setHours(
              activeHour(props.schedules.sunday_start),
              activeMin(props.schedules.sunday_start),
            ),
      sunEnd:
        props.schedules == null
          ? ""
          : new Date().setHours(
              activeHour(props.schedules.sunday_end),
              activeMin(props.schedules.sunday_end),
            ),
      monStart:
        props.schedules == null
          ? ""
          : new Date().setHours(
              activeHour(props.schedules.monday_start),
              activeMin(props.schedules.monday_start),
            ),
      monEnd:
        props.schedules == null
          ? ""
          : new Date().setHours(
              activeHour(props.schedules.monday_end),
              activeMin(props.schedules.monday_end),
            ),
      tueStart:
        props.schedules == null
          ? ""
          : new Date().setHours(
              activeHour(props.schedules.tuesday_start),
              activeMin(props.schedules.tuesday_start),
            ),
      tueEnd:
        props.schedules == null
          ? ""
          : new Date().setHours(
              activeHour(props.schedules.tuesday_end),
              activeMin(props.schedules.tuesday_end),
            ),
      wedStart:
        props.schedules == null
          ? ""
          : new Date().setHours(
              activeHour(props.schedules.wednesday_start),
              activeMin(props.schedules.wednesday_start),
            ),
      wedEnd:
        props.schedules == null
          ? ""
          : new Date().setHours(
              activeHour(props.schedules.wednesday_end),
              activeMin(props.schedules.wednesday_end),
            ),
      thuStart:
        props.schedules == null
          ? ""
          : new Date().setHours(
              activeHour(props.schedules.thursday_start),
              activeMin(props.schedules.thursday_start),
            ),
      thuEnd:
        props.schedules == null
          ? ""
          : new Date().setHours(
              activeHour(props.schedules.thursday_end),
              activeMin(props.schedules.thursday_end),
            ),
      friStart:
        props.schedules == null
          ? ""
          : new Date().setHours(
              activeHour(props.schedules.friday_start),
              activeMin(props.schedules.friday_start),
            ),
      friEnd:
        props.schedules == null
          ? ""
          : new Date().setHours(
              activeHour(props.schedules.friday_end),
              activeMin(props.schedules.friday_end),
            ),
      satStart:
        props.schedules == null
          ? ""
          : new Date().setHours(
              activeHour(props.schedules.saturday_start),
              activeMin(props.schedules.saturday_start),
            ),
      satEnd:
        props.schedules == null
          ? ""
          : new Date().setHours(
              activeHour(props.schedules.saturday_end),
              activeMin(props.schedules.saturday_end),
            ),
    });
  }, [props.schedules]);

  const handleChange = (event: any, day: any) => {
    const value = event;
    const Weekday = day;
    setHour((prevItem: any) => {
      const newItem: any = { ...prevItem };
      newItem[`${Weekday}`] = value;
      return newItem;
    });
  };
  const handleDelete = (start: any, end: any) => {
    const StartTime = start;
    const EndTime = end;
    setHour((prevItem: any) => {
      const newItem: any = { ...prevItem };
      newItem[`${StartTime}`] = "";
      newItem[`${EndTime}`] = "";
      return newItem;
    });
  };

  const hourValue = (day: any) => {
    let finalHour = ("0" + new Date(day).getHours().toString()).slice(-2);
    let fullMin = new Date(day).getMinutes().toString();
    let finalMin = fullMin.length == 1 ? fullMin + "0" : fullMin;

    let finalVal = finalHour + finalMin;

    return finalVal == "aNNaN" ? null : finalVal;
  };

  const handleSubmit = () => {
    let body = {
      sunday_start: hourValue(hour.sunStart),
      sunday_end: hourValue(hour.sunEnd),
      monday_start: hourValue(hour.monStart),
      monday_end: hourValue(hour.monEnd),
      tuesday_start: hourValue(hour.tueStart),
      tuesday_end: hourValue(hour.tueEnd),
      wednesday_start: hourValue(hour.wedStart),
      wednesday_end: hourValue(hour.wedEnd),
      thursday_start: hourValue(hour.thuStart),
      thursday_end: hourValue(hour.thuEnd),
      friday_start: hourValue(hour.friStart),
      friday_end: hourValue(hour.friEnd),
      saturday_start: hourValue(hour.satStart),
      saturday_end: hourValue(hour.satEnd),
    };

    props.schedules == null
      ? api.post(`/schedules`, body).then(({ data, status }) => {
          if (status !== 201) {
            console.log(data);
          } else {
            props.setIsSchedulesChanged(!props.isSchedulesChanged);
          }
        })
      : api.patch(`/schedules`, body).then(({ data, status }) => {
          if (status !== 200) {
            console.log(data);
          } else {
            props.setIsSchedulesChanged(!props.isSchedulesChanged);
          }
        });
  };

  return (
    <>
      <dialog id="schedulesModal" className="modal modal-middle">
        <form method="dialog" className="modal-box bg-white text-text-darkBlue w-[97%] p-3 sm:p-6">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>

          <h2 className="text-xl font-bold pb-1 text-[28px]">Set your availability</h2>
          <h4 className="sm:pb-4">Let us know when you are typically available</h4>
          {/*modal content */}
          <div className="flex flex-col gap-y-2 sm:gap-y-4 pt-4 sm:pl-2">
            {weeks.map((week: any) => {
              return (
                <div
                  className="flex justify-between items-center gap-x-2 sm:gap-x-5"
                  key={week.start}
                >
                  <h2 className="w-[85px] sm:w-[110px] sm:text-[20px]">{week.day}:</h2>
                  <div className="flex items-center gap-x-1 sm:gap-x-3">
                    <div>
                      <DatePicker
                        placeholderText="start at"
                        className="text-bg-primary sm:text-[20px] w-24 sm:w-28 cursor-pointer border border-text-darkBlue text-center rounded-sm bg-bg-secondary shadow-none focus:outline-none sm:p-2"
                        selected={hour[week.start]}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        onChange={(event) => handleChange(event, `${week.start}`)}
                      />
                    </div>
                    <h1 className="sm:text-[30px] sm:font-[20px]">-</h1>
                    <div>
                      <DatePicker
                        placeholderText="end at"
                        className="text-bg-primary sm:text-[20px] w-24 sm:w-28 cursor-pointer border border-text-darkBlue text-center rounded-sm bg-bg-secondary shadow-none sm:p-2 focus:outline-none"
                        selected={hour[week.end]}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="In-Time"
                        dateFormat="h:mm aa"
                        onChange={(event) => handleChange(event, `${week.end}`)}
                        filterTime={(time) => {
                          const startTime = new Date(hour[week.start]);
                          const EndTime = new Date(time);
                          return startTime.getTime() < EndTime.getTime();
                        }}
                      />
                    </div>

                    <Image
                      className="ml-3 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault;
                        handleDelete(`${week.start}`, `${week.end}`);
                      }}
                      src={bin.src}
                      alt="bin"
                      width={20}
                      height={20}
                    ></Image>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleSubmit}
            className="btn bg-bg-primary text-text-white border-none mt-4 hover:bg-green-900 w-full"
          >
            Confirm
          </button>
        </form>

        {/* close modal to click anywhere */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
