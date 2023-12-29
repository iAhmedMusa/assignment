"use client";

import Select from "react-select";
import { useAuthToken } from "@/context-api/context-provider";
import { useEffect, useState } from "react";
import api from "@/lib/api";

const options: any = [];

interface special {
  setSpecilist: any;
}

export default function DoctorSearch(props: special) {
  const { decodedToken } = useAuthToken();

  useEffect(() => {
    api.get(`/type-of-specialties`).then(({ data, status }) => {
      if (status !== 200) {
        console.log(data);
      } else if (Array.isArray(data)) {
        while (options.length < data.length) {
          data.map((data: any) => {
            options.push({ value: data, label: data });
          });
        }
      }
    });
  }, []);

  const value = (event: any) => {
    props.setSpecilist(event.value);
  };

  return (
    <>
      {decodedToken && (
        <div className="w-[320px] bg-bg-white rounded-lg shadow">
          <div className="bg-bg-secondary text-text-darkBlue ">
            <Select
              onChange={value}
              placeholder="Search doctors by specialities"
              options={options}
            />
          </div>
        </div>
      )}
    </>
  );
}
