"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuthToken } from "@/context-api/context-provider";

import maleDoctor from "../../../public/images/doctors/doctor-male.png";
import femaleDoctor from "../../../public/images/doctors/doctor-female.png";

import api from "@/lib/api";

interface DoctorProps {
  doctorId: string;
  name: string;
  expertise: string;
  location: string;
  gender: string;
  schedules: any;
}

export default function AllDoctorsComponent(props: DoctorProps): JSX.Element {
  const { decodedToken } = useAuthToken();
  const router = useRouter();
  const [weekDaysSchedules, setWeekDaysSchedules]: any = useState([]);
  const [error, setError] = useState("");

  let weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  let today = weekdays[new Date().getDay()];
  let finalHour = ("0" + new Date().getHours().toString()).slice(-2);
  let fullMin = new Date().getMinutes().toString();
  let finalMin = fullMin.length == 1 ? fullMin + "0" : fullMin;
  let active = finalHour + finalMin;

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

  const createAppointment = () => {
    let body = {
      doctor: props.doctorId,
    };

    api
      .post(`/appointments`, body)
      .then(({ data, status }) => {
        if (status !== 201) {
          console.log(data);
        } else {
          router.push("/appointments");
        }
      })
      .catch(({ response: { data } }) => setError(data.message));
  };

  return (
    <div
      onClick={() => router.push(`/all-doctors/${props.doctorId}`)}
      className={`w-[350px] lg:w-[335px] xl:w-[310px] 2xl:w-[350px] h-[436px] bg-bg-white rounded-lg shadow-lg relative cursor-pointer`}
    >
      {props.schedules?.[`${today}_start`] <= active &&
      active <= props.schedules?.[`${today}_end`] ? (
        <div className="absolute right-1 top-1 text-sm">
          Available Now
          <span className="bg-[#00FF00] px-[8px] rounded-full ml-1"></span>
        </div>
      ) : (
        ""
      )}
      <Image
        src={props.gender == "female" ? femaleDoctor : maleDoctor}
        alt="doctor image"
        width={200}
        height={200}
        className="m-auto px-4 pt-3"
      />
      <div className="card-body items-center text-center leading-4">
        <h2 className="card-title text-text-darkBlue">{props.name.substring(0, 18)}</h2>
        <p>{props.expertise}</p>
        {/* <p>{props.location}</p> */}

        {/* schedules */}
        <div>
          {!!weekDaysSchedules &&
            weekDaysSchedules.slice(0, 3).map((schedule: any, index: number) => {
              const sh = schedule.start.substring(0, 2);
              const sm = schedule.start.substring(2, 4);
              const eh = schedule.end.substring(0, 2);
              const em = schedule.end.substring(2, 4);
              return (
                <div key={schedule.day} className="flex text-justify my-2">
                  <div className="w-[85px]">{schedule.day}</div>
                  <div>
                    : {Number(sh) % 12 || 12}:{sm}
                    {Number(sh) >= 12 ? "pm" : "am"}-{Number(eh) % 12 || 12}:{em}
                    {Number(eh) >= 12 ? "pm" : " am"}
                  </div>
                </div>
              );
            })}
        </div>

        {!weekDaysSchedules.length && <div className="text-cente py-3">No Schedules yet</div>}

        <div className="w-full p-[2rem] absolute bottom-0">
          <button
            className="w-full bg-bg-primary text-text-white px-4 py-3  rounded-md"
            onClick={(event) => {
              event.stopPropagation();
              if (decodedToken?.type == "patient") {
                createAppointment();
              } else router.push("/signin");
            }}
          >
            Get Advice
          </button>
        </div>
      </div>
    </div>
  );
}
