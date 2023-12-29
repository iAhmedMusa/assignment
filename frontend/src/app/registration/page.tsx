import DocReg from "@/components/doctorregistration/docreg";
import { Suspense } from "react";

function RegistrationFallback() {
  return <></>;
}

export default function DoctorRegistration() {
  return (
    <>
      <Suspense fallback={<RegistrationFallback />}>
        <DocReg />
      </Suspense>
    </>
  );
}
