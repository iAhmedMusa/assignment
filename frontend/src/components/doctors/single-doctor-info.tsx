"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthToken } from "@/context-api/context-provider";

import LandingPageHeader from "@/components/landing-page/landing-page-header";
import SchedulesWeekly from "@/components/schedules/schedules-weekly";

import maleDoctor from "../../../public/images/doctors/doctor-male.png";
import femaleDoctor from "../../../public/images/doctors/doctor-female.png";

import api from "@/lib/api";

interface SingleDoctorInfoProps {
  id: any;
}

export default function SingleDoctorInfo(props: SingleDoctorInfoProps) {
  const { decodedToken } = useAuthToken();
  const pathName = usePathname();
  const router = useRouter();

  const [schedules, setSchedules] = useState();
  const [doctorInfo, setDoctorInfo]: any = useState({});
  const [isPathNameDoctors, setIsPathNameDoctors] = useState(false);

  useEffect(() => {
    pathName.includes("/doctors") ? setIsPathNameDoctors(true) : setIsPathNameDoctors(false);
  }, [pathName]);

  useEffect(() => {
    api.get(`/doctors/${props.id}`).then(({ data, status }) => {
      if (status !== 200) {
        console.log(data);
      } else {
        setDoctorInfo(data);
        setSchedules(data.schedule);
      }
    });
  }, [props.id]);

  const createAppointment = () => {
    let body = {
      doctor: Number(props.id),
    };

    api.post(`/appointments`, body).then(({ data, status }) => {
      if (status !== 201) {
        console.log(data);
      } else {
        router.push("/appointments");
      }
    });
  };

  return (
    <div className="bg-bg-secondary w-full min-h-[100vh]">
      <div className="sticky top-0 z-50">{isPathNameDoctors ? <></> : <LandingPageHeader />}</div>
      <div
        className={`max-w-[1500px] m-auto ${
          isPathNameDoctors ? "pt-0 px-0" : "pt-2 px-4"
        } pb-4 relative`}
      >
        {/* get apointment button */}
        {decodedToken?.type !== "admin" && (
          <div
            className={`w-full sm:w-auto ${
              isPathNameDoctors ? "pr-20" : "pr-8"
            } sm:pr-0 fixed bottom-4 sm:absolute ${
              isPathNameDoctors ? "sm:top-6" : "sm:top-12"
            } sm:right-8 z-10`}
          >
            <button
              className="w-full bg-bg-primary text-text-white px-8 py-3 rounded-md"
              onClick={() => {
                if (decodedToken?.type == "patient") {
                  createAppointment();
                } else router.push("/signin");
              }}
            >
              Get Advice
            </button>
          </div>
        )}
        <div className="w-full bg-bg-white p-4 flex flex-col lg:flex-row gap-x-10 shadow-sm rounded-md">
          <Image
            src={doctorInfo?.user?.gender == "female" ? femaleDoctor : maleDoctor}
            alt="doctor image"
            width={280}
            height={450}
            className="p-4"
          />
          <div className="flex flex-col justify-between pb-4">
            <div>
              <h1 className="text-[32px]">{doctorInfo?.user?.name}</h1>
              <h1 className="text-[20px] font-bold">{doctorInfo?.title}</h1>
              <h1 className="text-[20px]">{doctorInfo?.user?.gender}</h1>
              <h1 className="text-[20px]"> {doctorInfo?.bio}</h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-x-4 xl:gap-x-10">
              <h1 className="text-[20px] sm:border-r-2 sm:border-bg-primary sm:pr-4 xl:pr-10">
                Experince: {doctorInfo?.experience ? `${doctorInfo?.experience} years` : "n/a"}
              </h1>
              <h1 className="text-[20px] sm:border-r-2 sm:border-bg-primary sm:pr-4 xl:pr-10">
                Specialities: {doctorInfo?.specialist}
              </h1>
              <h1 className="text-[20px]">RegNo: {doctorInfo?.reg_number}</h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-x-10">
          <div className="mt-3 lg:w-[50%] bg-white p-2 sm:p-7 rounded-md shadow-sm">
            <h1 className="text-[20px] mb-6">Available Hours</h1>
            {schedules == null ? (
              <h1 className="text-center font-extrabold text-[24px]">No available schedules yet</h1>
            ) : (
              <SchedulesWeekly schedules={schedules} />
            )}
          </div>

          <div className="mt-3 lg:w-[50%] bg-white p-2 sm:p-7 rounded-md shadow-sm pb-8 sm:pb-0">
            <h1 className="text-[20px] mb-6">Contact Info</h1>

            <div
              className={`flex ${
                isPathNameDoctors ? "flex-col sm:flex-row" : "flex-row"
              } gap-x-4 sm:gap-x-48 lg:gap-x-0 lg:justify-between my-12`}
            >
              <div className="border-l-2 border-bg-primary pl-4 w-[159px]">
                <h1>Email:</h1>
                <h1>{doctorInfo?.user?.email}</h1>
              </div>
              <div className="border-l-2 border-bg-primary pl-4 w-[159px]">
                <h1>Phone:</h1>
                <h1>{doctorInfo?.user?.phone_number}</h1>
              </div>
            </div>
            <div
              className={`flex ${
                isPathNameDoctors ? "flex-col sm:flex-row" : "flex-row"
              } gap-x-4 sm:gap-x-48 lg:gap-x-0 lg:justify-between my-12`}
            >
              <div className="border-l-2 border-bg-primary pl-4 w-[159px]">
                <h1>State:</h1>
                <h1>{doctorInfo?.user?.state ? doctorInfo?.user?.state : "n/a"}</h1>
              </div>
              <div className="border-l-2 border-bg-primary pl-4 w-[159px]">
                <h1>City:</h1>
                <h1>{doctorInfo?.user?.city ? doctorInfo?.user?.city : "n/a"}</h1>
              </div>
            </div>
            <div
              className={`flex ${
                isPathNameDoctors ? "flex-col sm:flex-row" : "flex-row"
              } gap-x-4 sm:gap-x-48 lg:gap-x-0 lg:justify-between my-12`}
            >
              <div className="border-l-2 border-bg-primary pl-4 w-[159px]">
                <h1>Country:</h1>
                <h1>{doctorInfo?.user?.country ? doctorInfo?.user?.country : "n/a"}</h1>
              </div>
              <div className="border-l-2 border-bg-primary pl-4 w-[159px]">
                <h1>Zip:</h1>
                <h1>{doctorInfo?.user?.zip ? doctorInfo?.user?.zip : "n/a"}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
