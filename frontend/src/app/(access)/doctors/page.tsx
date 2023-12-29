"use client";

import { useEffect, useState } from "react";

import DoctorSearch from "@/components/doctors/search-doctor";
import Doctor from "@/components/doctors/doctor";

import api from "@/lib/api";

export default function DoctorsPage() {
  const [data, setData]: any = useState([]);
  const [specilist, setSpecilist] = useState("");

  useEffect(() => {
    api.get(`/doctors`, { params: { specialists: specilist } }).then(({ data, status }) => {
      if (status !== 200) {
        console.log(data);
      } else if (Array.isArray(data)) {
        setData(data);
      }
    });
  }, [specilist]);

  return (
    <div className="max-w-[1500px] m-auto w-full min-h-[60vh]">
      {/* doctors search */}
      <div className="flex justify-start">
        <DoctorSearch setSpecilist={setSpecilist} />
      </div>
      <div className="my-2"></div>

      {/* doctors list grid */}
      {!data?.length ? (
        <div>
          <h1 className={`text-center text-red-400`}>No Doctor Found</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 justify-center items-center justify-items-center gap-6">
          {data.map((data: any) => {
            return (
              <Doctor
                key={data.id}
                doctorId={data.id}
                name={`${data.user.name}`}
                expertise={data.specialist}
                location={`${data?.user?.state || "N/A"}, ${data?.user?.city || "N/A"}`}
                gender={data.gender}
                schedules={data.schedule}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
