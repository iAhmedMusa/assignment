"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";

import Pharmacist from "@/components/pharmacist/pharmacist";

export default function PharmacistPage(): JSX.Element {
  const [data, setData]: any = useState([]);

  useEffect(() => {
    api.get(`/pharmacists`).then(({ data, status }) => {
      if (status !== 200) {
        console.log(data);
      } else if (Array.isArray(data)) {
        setData(data);
      }
    });
  }, []);

  return (
    <div className="max-w-[1500px] m-auto xl:m-0 2xl:m-auto">
      {data?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 xl:gap-8 2xl:gap-6">
          {data.map((data: any) => {
            return (
              <Pharmacist
                key={data.id}
                name={data.user.name}
                experience={data.experience}
                location={`${data.user.city}`}
                gender={data.user.gender}
                id={data.id}
              />
            );
          })}
        </div>
      ) : (
        <div>
          <h1 className={`text-center text-red-400`}>No Pharmacist Found</h1>
        </div>
      )}
    </div>
  );
}
