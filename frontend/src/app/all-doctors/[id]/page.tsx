import SingleDoctorInfo from "@/components/doctors/single-doctor-info";

export default function SingleDoctorPage({ params }: { params: { id: string } }) {
  return <SingleDoctorInfo id={params.id} />;
}
