"use client";

import { useState } from "react";

import PrescriptionListTable from "@/components/prescriptions/prescription-list";
import PrescriptionModal from "../../../components/prescriptions/prescription-modal";

export default function PriscriptionPage(): JSX.Element {
  const [prescriptionId, setPrescribtionId] = useState("");
  const [disease, setDisease] = useState("");
  const [advice, setAdvice] = useState("");
  const [report, setreport] = useState("");
  const [test, settest] = useState("");
  const [pharmaAdvice, setPharmaAdvice]: any = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPharmacistAdvice, setIsPharmacistAdvice] = useState(false);

  return (
    <div className="w-full max-w-[1500px] m-auto">
      <PrescriptionListTable
        setPrescribtionId={setPrescribtionId}
        setDisease={setDisease}
        setAdvice={setAdvice}
        setreport={setreport}
        settest={settest}
        setPharmaAdvice={setPharmaAdvice}
        setIsModalOpen={setIsModalOpen}
        isPharmacistAdvice={isPharmacistAdvice}
        setIsPharmacistAdvice={setIsPharmacistAdvice}
      />
      {/* modal */}
      <PrescriptionModal
        prescriptionId={prescriptionId}
        disease={disease}
        advice={advice}
        report={report}
        test={test}
        pharmaAdvice={pharmaAdvice}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isPharmacistAdvice={isPharmacistAdvice}
        setIsPharmacistAdvice={setIsPharmacistAdvice}
      />
    </div>
  );
}
