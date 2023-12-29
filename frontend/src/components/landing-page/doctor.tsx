import Image from "next/image";
import { useRouter } from "next/navigation";

import maleDoctor from "../../../public/images/doctors/doctor-male.png";
import femaleDoctor from "../../../public/images/doctors/doctor-female.png";

interface DoctorProps {
  id: number;
  name: string;
  gender: string;
  expertise: string;
  location: string;
}

export default function DoctorComponent(props: DoctorProps): JSX.Element {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/all-doctors/${props.id}`)}
      className="card w-[350px] mb-4 bg-bg-white shadow-md border doctor-carousel-card cursor-pointer"
    >
      <Image
        src={props.gender == "female" ? femaleDoctor : maleDoctor}
        alt="doctor image"
        width={400}
        height={400}
        className="m-auto px-4 pt-3"
      />
      <div className="card-body items-center text-center leading-4">
        <h2 className="card-title text-text-darkBlue">{props.name.substring(0, 18)}</h2>
        <p>{props.expertise}</p>
        {/* <p>{props.location || "Canada"}</p> */}
      </div>
    </div>
  );
}
