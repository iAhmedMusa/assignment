import Image from "next/image";
import Link from "next/link";
import { Rating } from "@material-tailwind/react";

interface DoctorCardProps {
  image: any;
  name: string;
  location: string;
  specialities: string;
  bio: string;
  exp: string;
  status: any;
  setDocname: any;
  setExpertise: any;
  setIsModalOpen: any;
  setDoctorId: any;
  doctorId: string;
  setAppointId: any;
  appointId: any;
  prescription: any;
  isDoctorAdviced: any;
  createdAt: any;
}

export default function DoctorAppointmentCard(props: DoctorCardProps): JSX.Element {
  return (
    <div className="w-full bg-bg-white flex flex-col md:flex-row justify-between p-2 rounded-lg shadow divide-x mb-3">
      <div className="w-full md:w-5/12 flex px-2 justify-start">
        <div>
          <Image src={props.image} alt="doctor image" width={100} height={100} />
        </div>
        <div className="flex flex-col justify-between pl-12 sm:pl-5 ">
          <div className="text-text-darkBlue">
            <p className="font-extrabold">{props.name}</p>
            <p className="text-sm">{props.location ? props.location : "N/A"}</p>
          </div>
          <div className="text-sm">
            <p className="tracking-wider">Specialities</p>
            <p className="text-text-darkBlue">{props.specialities}</p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-5/12 flex flex-col sm:flex-row md:flex-col justify-between px-8 mt-2 md:mt-2">
        <div className="flex flex-row justify-between gap-x-12">
          <div>
            <p>Bio</p>
            <p className="text-text-darkBlue font-thin text-sm">{props.bio ? props.bio : "N/A"}</p>
          </div>
          <div>
            <div className="text-right">
              <p>Created at</p>
              <p className="text-text-darkBlue font-thin text-sm">
                {new Date(props.createdAt).toDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-x-12">
          <div>
            <p>Experience</p>
            <p className="text-text-darkBlue font-thin text-sm">{props.exp ? props.exp : "N/A"}</p>
          </div>
          <div className="text-right">
            <p>Rating</p>
            <Rating value={4} readonly />
          </div>
        </div>
      </div>

      <div className="w-full md:w-3/12 flex flex-col justify-end md:justify-center items-center px-4   gap-y-2">
        <button>
          {props.status == "rejected" ? "rejected" : props.status == "pending" ? "pending" : ""}
        </button>
        <button
          onClick={() => {
            if (window !== undefined) {
              props.setIsModalOpen(true);
              (window as any).appointmentModal.showModal();
            }
            props.setDoctorId(props.doctorId);
            props.setDocname(props.name);
            props.setExpertise(props.specialities);
            props.setAppointId(props.appointId);
          }}
          className={`bg-bg-primary px-4 py-2 rounded-md text-bg-secondary ${
            props.status == "accepted" && !props.prescription ? "block" : "hidden"
          }`}
        >
          {props.status == "accepted" ? "Patient Preparation" : ""}
        </button>

        <div className={`${props.status == "accepted" && props.prescription ? "block" : "hidden"}`}>
          {props.status == "accepted" && props.isDoctorAdviced == null ? (
            "Appointed"
          ) : (
            <Link
              target="blank"
              onClick={(e) => {
                e.stopPropagation();
              }}
              href={{
                pathname: "/prescription",
                query: { id: props.prescription },
              }}
              className={`bg-bg-primary px-4 py-2 rounded-md text-bg-secondary ${
                props.prescription ? "block" : "hidden"
              }`}
            >
              View Prescription
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
