"use client";

import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";

import { useAuthToken } from "@/context-api/context-provider";

import api from "@/lib/api";

const TABLE_HEAD = ["Patient ID", "Name", "Email", "Phone Number"];

function PatientsList() {
  const { decodedToken } = useAuthToken();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (decodedToken) {
      if (decodedToken.type === "doctor") {
        api.get(`/appointments`).then(({ data, status }) => {
          if (status !== 200) {
            console.log(data);
          } else {
            let patientsOfDoctor = data
              .filter((el: any) => el.status === "accepted")
              .map((el: any) => el.patient);

            const filteredData = patientsOfDoctor.filter(
              (value: any, index: any, self: any) =>
                self.findIndex((v: any) => v.id === value.id && v.name === value.name) === index,
            );

            setPatients(filteredData);
          }
        });
      } else if (decodedToken.type === "pharmacist") {
        api.get(`/prescriptions`).then(({ data, status }) => {
          if (status !== 200) {
            console.log(data);
          } else {
            let patientsOfPharmacist = data.map((el: any) => el.appointment.patient);

            const filteredData = patientsOfPharmacist.filter(
              (value: any, index: any, self: any) =>
                self.findIndex((v: any) => v.id === value.id && v.name === value.name) === index,
            );

            setPatients(filteredData);
          }
        });
      } else {
        api.get(`/users`, { params: { type: "patient" } }).then(({ data, status }) => {
          if (status !== 200) {
            console.log(data);
          } else {
            setPatients(data);
          }
        });
      }
    }
  }, [decodedToken]);

  return (
    <>
      {patients?.length ? (
        <table className="min-w-[850px] bg-white  w-full table-auto text-left shadow rounded-lg">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none "
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {patients.map((data: any) => {
              const classes = "p-4 border-b border-blue-gray-50";

              return (
                <tr key={data.id} className="text-center">
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {data.id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {data.name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue"
                      className="font-medium"
                    >
                      {data.email}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {data.phone_number}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-red-400">No Patient Appointed Yet</div>
      )}
    </>
  );
}

export default PatientsList;
