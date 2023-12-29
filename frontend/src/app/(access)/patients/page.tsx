import PatientsList from "@/components/patients/patientsList";

export default function PatientPage(): JSX.Element {
  return (
    <div className="w-full max-w-[1500px] m-auto">
      <PatientsList />
    </div>
  );
}
