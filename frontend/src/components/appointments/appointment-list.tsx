"use client";

import { useEffect, useState } from "react";
import { useAuthToken } from "@/context-api/context-provider";

import doctorImage from "../../../public/images/doctors/doctor-male.png";
import patientImage from "../../../public/icons/layout/avatar.svg";

import DoctorAppointmentCard from "./doctor-appointment-card";
import PatientAppointmentCard from "./patient-appointment-card";
import AppointmentModal from "./appointment-modal";

import api from "@/lib/api";

export default function AppointmentCard(): JSX.Element {
  const [data, setData]: any = useState([]);
  const { decodedToken } = useAuthToken();
  const [reload, setReload] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorId, setDoctorId] = useState("");
  const [docname, setDocname] = useState("");
  const [expertise, setExpertise] = useState("");
  const [appointId, setAppointId] = useState("");

  useEffect(() => {
    api.get(`/appointments`).then(({ data, status }) => {
      if (status !== 200) {
        console.log(data);
      } else {
        setData(data);
      }
    });
  }, [reload]);

  return (
    <div className="w-full">
      {!!data &&
        data.map((data: any, index: string) => {
          return (
            <div key={index}>
              <div className={`${decodedToken?.type == "patient" ? "block" : "hidden"}`}>
                <DoctorAppointmentCard
                  image={doctorImage}
                  name={data.doctor.user.name}
                  location={data.doctor.city}
                  specialities={data.doctor.specialist}
                  bio={data.doctor.bio}
                  exp={data.doctor.experience || "N/A"}
                  status={data.status}
                  setDocname={setDocname}
                  setExpertise={setExpertise}
                  setIsModalOpen={setIsModalOpen}
                  setDoctorId={setDoctorId}
                  doctorId={data.doctor.id}
                  appointId={data.id}
                  setAppointId={setAppointId}
                  prescription={data?.prescription?.id}
                  isDoctorAdviced={data?.prescription?.doctor_advices}
                  createdAt={data.created_at}
                />
              </div>
              <div className={`${decodedToken?.type == "doctor" ? "block" : "hidden"}`}>
                <PatientAppointmentCard
                  image={patientImage}
                  name={data.patient.name}
                  email={data.patient.email}
                  phone={data.patient.phone_number}
                  location="Canada"
                  createdAt={data.created_at}
                  status={data.status}
                  id={data.id}
                  reload={reload}
                  setReload={setReload}
                />
              </div>
            </div>
          );
        })}

      {!data.length && <div className="text-center text-red-400">No Appointment Yet</div>}

      <AppointmentModal
        doctorId={doctorId}
        docname={docname}
        expertise={expertise}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        appointId={appointId}
      />
    </div>
  );
}
