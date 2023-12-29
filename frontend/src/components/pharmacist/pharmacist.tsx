"use client";

import Image from "next/image";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthToken } from "@/context-api/context-provider";

import malePharmacist from "../../../public/images/doctors/doctor-male.png";
import femalePharmacist from "../../../public/images/doctors/doctor-female.png";

import api from "@/lib/api";

interface PharmacistProps {
  name: string;
  experience: number;
  location: string;
  gender: string;
  id: any;
}

function Pharmacist(props: PharmacistProps): JSX.Element {
  const { decodedToken } = useAuthToken();
  const search = useSearchParams();
  const router = useRouter();

  let prescriptionId = search.get("id");

  const pharmacist = () => {
    let body = { pharmacistId: Number(props.id) };

    if (prescriptionId) {
      api
        .patch(`/prescriptions/appoint-pharmacist/${prescriptionId}`, body)
        .then(({ data, status }) => {
          if (status !== 200) {
            console.log(data);
          } else {
            router.push("/prescriptions");
          }
        });
    }
  };

  return (
    <div className="w-[350px] lg:w-[320px] 2xl:w-[300px] 3xl:w-[350px] h-[380px] bg-bg-white rounded-lg shadow-lg relative">
      <Image
        src={props.gender == "male" ? malePharmacist : femalePharmacist}
        alt="doctor image"
        width={200}
        height={200}
        className="m-auto px-4 pt-3"
      />
      <div className="card-body items-center text-center leading-4">
        <h2 className="card-title text-text-darkBlue">{props.name.slice(0, 25)}</h2>
        <p>Experience {props.experience || "1< "} years</p>
        {props?.location != "null" && <p>{props?.location}</p>}

        {decodedToken?.type !== "admin" && (
          <div className="w-full absolute bottom-6 px-[2rem]">
            <button
              onClick={pharmacist}
              className="w-full bg-bg-primary text-text-white px-4 py-3 rounded-md"
            >
              Assign
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pharmacist;
