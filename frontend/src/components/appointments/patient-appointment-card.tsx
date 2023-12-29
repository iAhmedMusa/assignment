import api from "@/lib/api";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PatientCardProps {
  image: any;
  name: string;
  location: string;
  reload: any;
  setReload: any;
  createdAt: string;
  status: any;
  id: any;
  email: any;
  phone: any;
}

export default function PatientAppointmentCard(
  props: PatientCardProps
): JSX.Element {
  const [error, setError] = useState("");

  let body: any;

  const onReject = () => {
    body = {
      status: "rejected",
    };
    hitApi();
  };

  const onAccepted = () => {
    body = {
      status: "accepted",
    };
    hitApi();
  };

  const hitApi = () => {
    api
      .patch(`/appointments/${props.id}`, body)
      .then(({ data, status }) => {
        if (status !== 200) {
          console.log(data);
        } else {
          props.setReload(!props.reload);
        }
      })
      .catch(({ response: { data } }) => setError(data.message));
  };

  return (
    <div className="w-full bg-bg-white flex flex-col md:flex-row justify-between p-2 rounded-lg shadow divide-x mb-3">
      <div className="w-full md:w-5/12 flex px-2 justify-between md:justify-start">
        <div>
          <Image
            src={props.image}
            alt="doctor image"
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col justify-between pl-3">
          <div className="text-text-darkBlue">
            <p className="font-extrabold">{props.name}</p>
            <p className="text-sm">{props.location}</p>
          </div>
          <div className="text-sm">
            <p className="tracking-wider">Phone Number: {props.phone}</p>
            <p className="tracking-wider">Email: {props.email}</p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-5/12 px-8">
        <p>Created at</p>
        <p className="text-text-darkBlue font-thin text-sm">
          {new Date(props.createdAt).toDateString()}
        </p>
      </div>

      <div className="w-full md:w-2/12 flex md:flex-col 2xl:flex-row justify-end md:justify-center items-center px-4 mt-2 md:mt-2 gap-y-2 gap-x-2 ">
        {props.status == "pending" ? (
          <button
            onClick={onAccepted}
            className="bg-bg-primary px-4 py-2 rounded-md text-bg-secondary w-[85px]"
          >
            Accept
          </button>
        ) : props.status == "accepted" ? (
          "Appointed"
        ) : (
          "Rejected"
        )}
        {props.status == "pending" ? (
          <button
            onClick={onReject}
            className="bg-red-500 px-5 py-2 rounded-md text-bg-secondary w-[85px]"
          >
            Reject
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
