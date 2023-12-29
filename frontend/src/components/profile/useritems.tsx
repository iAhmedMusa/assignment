"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

import { useAuthToken } from "@/context-api/context-provider";

import pharma from "../../../public/images/doctors/doctor-female.png";
import PriscriptionPage from "@/app/(access)/prescriptions/page";

import api from "@/lib/api";

function Useritems() {
  const { decodedToken } = useAuthToken();

  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalPharmacists, setTotalPharmacists] = useState(0);
  const [pendingAppointment, setPendingAppointment] = useState(0);
  const [acceptAppointment, setAcceptAppointment] = useState(0);

  useEffect(() => {
    if (!!decodedToken) {
      if (decodedToken.type == "admin") {
        api.get(`/doctors`).then(({ data, status }) => {
          if (status !== 200) {
            console.log(data);
          } else {
            setTotalDoctors(data.length);
          }
        });

        api.get(`/pharmacists`).then(({ data, status }) => {
          if (status !== 200) {
            console.log(data);
          } else {
            setTotalPharmacists(data.length);
          }
        });

        api.get(`/users`, { params: { type: "patient" } }).then(({ data, status }) => {
          if (status !== 200) {
            console.log(data);
          } else {
            setTotalPatients(data.length);
          }
        });
      } else if (decodedToken.type == "pharmacist") {
        api.get(`/prescriptions`).then(({ data, status }) => {
          if (status !== 200) {
            console.log(data);
          } else {
            let patientsOfPharmacist = data.map((el: any) => el.appointment.patient);

            const filteredData = patientsOfPharmacist.filter(
              (value: any, index: any, self: any) =>
                self.findIndex((v: any) => v.id === value.id && v.name === value.name) === index,
            );

            setTotalPatients(filteredData.length);
          }
        });
      } else if (decodedToken.type == "doctor" || decodedToken.type == "patient") {
        api.get(`/appointments`).then(({ data, status }) => {
          if (status !== 200) {
            console.log(data);
          } else {
            let accepted = data.filter((el: any) => el.status === "accepted");
            let pending = data.filter((el: any) => el.status === "pending");
            setAcceptAppointment(accepted.length);
            setPendingAppointment(pending.length);
          }
        });
      }
    }
  }, [decodedToken]);

  return (
    <div className="p-4">
      <div
        className={`${
          decodedToken?.type == "doctor" || decodedToken?.type == "patient" ? "block" : "hidden"
        }`}
      >
        <div className={`shadow-md  rounded-md p-4 w-[100%] sm:w-[550px] lg:w-[450px] `}>
          <h1 className=" text-text-darkBlue text-[28px]">Appointments</h1>
          <div className=" flex justify-center gap-x-32">
            <div className="flex flex-col items-center  ">
              <CountUp
                className="text-[80px] text-bg-primary"
                duration={3}
                end={pendingAppointment}
              />
              <h1 className="text-[16px]">Pending</h1>
            </div>
            <div className="flex flex-col items-center">
              <CountUp
                className="text-[80px] text-bg-primary"
                duration={3}
                end={acceptAppointment}
              />
              <h1 className="text-[16px]">Accepted</h1>
            </div>
          </div>
        </div>
        <div className="text-right p-3 ">
          <Link href={"/appointments"} className="text-text-darkBlue">
            view all appointments
          </Link>
        </div>
      </div>

      <div
        className={`${
          decodedToken?.type == "admin" || decodedToken?.type == "pharmacist" ? "block" : "hidden"
        }`}
      >
        <div className={`shadow-md  rounded-md p-4 w-[100%] sm:w-[550px] lg:w-[450px] `}>
          <h1 className=" text-text-darkBlue text-[28px]">Total Patients</h1>
          <div className=" flex justify-center gap-x-32">
            <div className="flex flex-col items-center  ">
              <CountUp className="text-[80px] text-bg-primary" duration={3} end={totalPatients} />
            </div>
          </div>
        </div>
        <div className="text-right p-3 ">
          <Link href={"/patients"} className="text-text-darkBlue">
            view all patients
          </Link>
        </div>
      </div>

      <div className={`mt-4 ${decodedToken?.type == "admin" ? "block" : "hidden"}`}>
        <div className={`shadow-md  rounded-md p-4 w-[100%] sm:w-[550px] lg:w-[450px] `}>
          <h1 className=" text-text-darkBlue text-[28px]">Total Doctors</h1>
          <div className=" flex justify-center gap-x-32">
            <div className="flex flex-col items-center  ">
              <CountUp className="text-[80px] text-bg-primary" duration={3} end={totalDoctors} />
            </div>
          </div>
        </div>
        <div className="text-right p-3 ">
          <Link href={"/doctors"} className="text-text-darkBlue">
            view all doctors
          </Link>
        </div>
      </div>

      <div className={`${decodedToken?.type == "admin" ? "block" : "hidden"}`}>
        <div className={`shadow-md  rounded-md p-4 w-[100%] sm:w-[550px] lg:w-[450px] mt-4 `}>
          <h1 className=" text-text-darkBlue text-[28px]">Total Pharmacists</h1>
          <div className=" flex justify-center gap-x-32">
            <div className="flex flex-col items-center  ">
              <CountUp
                className="text-[80px] text-bg-primary"
                duration={3}
                end={totalPharmacists}
              />
            </div>
          </div>
        </div>
        <div className="text-right p-3 ">
          <Link href={"/pharmacists"} className="text-text-darkBlue">
            view all pharmacist
          </Link>
        </div>
      </div>

      {!!decodedToken && decodedToken?.type !== "admin" && (
        <div className={`mt-8`}>
          <h1 className=" text-text-darkBlue text-[28px]"> Prescription</h1>

          <div className="max-h-[300px] overflow-y-auto">
            <PriscriptionPage />
          </div>

          <div className="text-right p-3 ">
            <Link href={"/prescriptions"} className="text-text-darkBlue">
              view all Prescription
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Useritems;
