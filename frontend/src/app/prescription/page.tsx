import PrescriptionPdf from "@/components/prescriptions/prescription-pdf";
import { Suspense } from "react";

function PrescriptionFallback() {
  return <></>;
}

function Prespdf() {
  return (
    <>
      <Suspense fallback={<PrescriptionFallback />}>
        <PrescriptionPdf />
      </Suspense>
    </>
  );
}

export default Prespdf;
