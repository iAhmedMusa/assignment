import React, { useState, useEffect } from "react";
import { Input, Textarea } from "@material-tailwind/react";

import { useAuthToken } from "@/context-api/context-provider";

import api from "@/lib/api";

interface prescription {
  prescriptionId: any;
  disease: any;
  advice: any;
  report: any;
  test: any;
  pharmaAdvice: any;
  isModalOpen: boolean;
  setIsModalOpen: any;
  isPharmacistAdvice: any;
  setIsPharmacistAdvice: any;
}

export default function PrescriptionModal(props: prescription): JSX.Element {
  const { decodedToken } = useAuthToken();

  const [error, setError] = useState("");
  const [items, setItems] = useState({
    advice: "",
    tests: "",
    reports: "",
  });

  useEffect(() => {
    setItems({
      advice: props.advice,
      tests: props.test,
      reports: props.report,
    });
    props.setIsPharmacistAdvice(props.pharmaAdvice);
  }, [props]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setItems((prevItem) => {
      const newItem: any = { ...prevItem };
      newItem[`${name}`] = value;
      return newItem;
    });
  };

  const handlePrescription = (e: any) => {
    let body;

    console.log(body);
    console.log(decodedToken?.type);

    if (decodedToken?.type == "pharmacist") {
      body = {
        pharmacist_advice: e,
      };
    } else if (decodedToken?.type == "doctor") {
      body = {
        doctor_advices: items.advice,
        tests: items.tests,
        reports: items.reports,
      };
    }
    if (decodedToken?.type == "pharmacist") {
      api
        .patch(`/prescriptions/pharmacist-advice/${props.prescriptionId}`, body)
        .then(({ data, status }) => {
          if (status !== 200) {
            console.log(data);
          } else {
            setError(data.message);
            if (window !== undefined) {
              props.setIsModalOpen(false);
              (window as any).appointmentModal.close();
            }
          }
        })
        .catch(({ response: { data } }) => setError(data.message));
    } else if (decodedToken?.type == "doctor") {
      api
        .patch(`/prescriptions/doctor-advice/${props.prescriptionId}`, body)
        .then(({ data, status }) => {
          if (status !== 200) {
            console.log(data);
          } else {
            setError(data.message);
            if (window !== undefined) {
              props.setIsModalOpen(false);
              (window as any).appointmentModal.close();
            }
          }
        })
        .catch(({ response: { data } }) => setError(data.message));
    }
  };

  return (
    <>
      <dialog id="appointmentModal" className="modal modal-middle">
        <form method="dialog" className="modal-box bg-bg-secondary text-text-darkBlue">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>

          <h2 className="text-xl font-bold pb-4">Prescribe Prescription</h2>
          {/*modal content */}
          <div className="flex flex-col gap-y-4">
            <Input
              variant="outlined"
              label="Injury/Disease"
              defaultValue={props.disease}
              disabled
            />
            {decodedToken?.type == "pharmacist" && (
              <label className="text-[14px] -mb-2">Diagnosis/Test</label>
            )}

            <Textarea
              variant="outlined"
              label="Diagnosis/Test"
              defaultValue={props.test}
              disabled={decodedToken?.type !== "doctor" ? true : false}
              onChange={(event) => handleChange(event)}
              name="tests"
            />
            {decodedToken?.type == "pharmacist" && (
              <label className="text-[14px] -mb-2">Examine/Reports</label>
            )}

            <Textarea
              variant="outlined"
              label="Examine/Reports"
              defaultValue={props.report}
              disabled={decodedToken?.type !== "doctor" ? true : false}
              onChange={(event) => handleChange(event)}
              name="reports"
            />
            {decodedToken?.type == "pharmacist" && (
              <label className="text-[14px] -mb-2">Medications/Treatment</label>
            )}

            <Textarea
              required
              variant="outlined"
              label="Medications/Treatment"
              defaultValue={props.advice}
              disabled={decodedToken?.type !== "doctor" ? true : false}
              onChange={(event) => handleChange(event)}
              name="advice"
            />
          </div>

          {decodedToken?.type == "doctor" && (
            <button
              onClick={handlePrescription}
              className="btn bg-bg-primary text-text-white border-none mt-4 hover:bg-green-900 w-full"
            >
              Confirm
            </button>
          )}

          {props?.pharmaAdvice == "true" && <h1>This prescription is Accepted</h1>}
          {props?.pharmaAdvice == "false" && <h1>This prescription is Rejected</h1>}

          {props.pharmaAdvice == null && decodedToken?.type == "pharmacist" && (
            <div className="flex gap-x-4">
              <button
                onClick={(e) => {
                  props.setIsPharmacistAdvice(!props.isPharmacistAdvice);
                  handlePrescription(false);
                }}
                className="btn bg-red-400 text-text-white border-none mt-4 hover:bg-red-900 w-[48%]"
              >
                Reject
              </button>
              <button
                onClick={(e) => {
                  props.setIsPharmacistAdvice(!props.isPharmacistAdvice);
                  handlePrescription(true);
                }}
                className="btn bg-bg-primary text-text-white border-none mt-4 hover:bg-green-900 w-[48%] "
              >
                Accept
              </button>
            </div>
          )}
        </form>

        {/* close modal to click anywhere */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
