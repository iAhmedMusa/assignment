"use client";

import { useEffect, useState } from "react";

import LandingPageHeader from "@/components/landing-page/landing-page-header";
import DoctorSearch from "../../components/doctors/search-doctor";
import AllDoctorsComponent from "@/components/doctors/landingpage-all-doctors";

import api from "@/lib/api";

function AllDoctors() {
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
    <div className="w-full min-h-screen bg-[#f7fafc]">
      <div className="sticky">
        <LandingPageHeader />
      </div>

      <div className="max-w-[1500px] m-auto p-2">
        {/* doctors search */}
        <div className="flex justify-start">
          <DoctorSearch setSpecilist={setSpecilist} />
        </div>
        <div className="my-2"></div>
        {/* doctors list grid */}
        <div>
          <h1
            className={`text-center text-red-400 w-full h-[100vh] ${
              data.length == 0 ? "block" : "hidden"
            }`}
          >
            No Doctor Found
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center justify-items-center gap-6 xl:gap-2">
          {data.map((data: any) => {
            return (
              <AllDoctorsComponent
                key={data.id}
                doctorId={data.id}
                name={`${data.user.name}`}
                expertise={data.specialist}
                location={`${data.state || "N/A"}, ${data.city || "N/A"}`}
                gender={data.gender}
                schedules={data.schedule}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AllDoctors;
