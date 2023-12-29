"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";

import { useAuthToken } from "@/context-api/context-provider";

import api from "@/lib/api";

interface prescription {
  setPrescribtionId: any;
  settest: any;
  setDisease: any;
  setAdvice: any;
  setreport: any;
  setPharmaAdvice: any;
  setIsModalOpen: any;
  isPharmacistAdvice: any;
  setIsPharmacistAdvice: any;
}

export default function PrescriptionListTable(props: prescription): JSX.Element {
  const pathName = usePathname();
  const { decodedToken } = useAuthToken();
  const [data, setData] = useState([]);

  let TABLE_HEAD;

  if (decodedToken?.type == "doctor") {
    pathName == "/dashboard"
      ? (TABLE_HEAD = ["Prescription ID", "Patient", "Status"])
      : (TABLE_HEAD = ["Prescription ID", "Patient", "Injury", "Symptoms", "Pharmacist", "Status"]);
  } else if (decodedToken?.type == "patient") {
    pathName == "/dashboard"
      ? (TABLE_HEAD = ["Prescription ID", "Doctor", "Status"])
      : (TABLE_HEAD = ["Prescription ID", "Doctor", "Injury", "Symptoms", "Pharmacist", "Status"]);
  } else if (decodedToken?.type == "pharmacist") {
    pathName == "/dashboard"
      ? (TABLE_HEAD = ["Prescription ID", "Patient", "Status"])
      : (TABLE_HEAD = ["Prescription ID", "Patient", "Injury", "Symptoms", "Doctor", "Status"]);
  }

  useEffect(() => {
    api
      .get(`/prescriptions`, {
        params: {
          type: "patient",
        },
      })
      .then(({ data, status }) => {
        if (status !== 200) {
          console.log(data);
        } else {
          setData(data);
        }
      });
  }, [props.isPharmacistAdvice]);

  return (
    <>
      {data?.length ? (
        <table
          className={`${
            decodedToken?.type != "admin" && pathName == "/dashboard"
              ? "min-w-fit"
              : " min-w-[800px]"
          } w-full table-auto text-left shadow rounded-lg `}
        >
          <thead>
            <tr>
              {TABLE_HEAD?.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((data: any) => {
              const classes = "p-4 border-b border-blue-gray-50";

              return (
                <tr key={data.id} className="text-center">
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {data.id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {decodedToken?.type == "patient"
                        ? data.appointment.doctor.user.name
                        : data.appointment.patient.name}
                    </Typography>
                  </td>

                  {pathName != "/dashboard" && (
                    <>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {data.disease}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {data.details}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Link
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          href={{
                            pathname: "/pharmacists",
                            query: { id: data.id },
                          }}
                          className={`text-center w-[80px] m-auto px-4 py-[2px]  bg-bg-primary text-bg-secondary rounded-md ${
                            data?.pharmacist?.id || decodedToken?.type == "doctor"
                              ? "hidden"
                              : "block"
                          }`}
                        >
                          Assign
                        </Link>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className={`font-normal ${data?.pharmacist?.id ? "block" : "hidden"}`}
                        >
                          {decodedToken?.type == "pharmacist"
                            ? data?.appointment?.doctor?.user?.name
                            : data?.pharmacist?.user?.name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className={`font-normal ${
                            !data?.pharmacist?.id && decodedToken?.type == "doctor"
                              ? "block"
                              : "hidden"
                          }`}
                        >
                          Not assign yet
                        </Typography>
                      </td>
                    </>
                  )}

                  {/* for doctors & patients */}

                  <td className={classes}>
                    {!data?.doctor_advices && decodedToken?.type == "patient" ? (
                      <p className="text-sm">Not Prescribe Yet</p>
                    ) : (
                      <Link
                        target="blank"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        href={{
                          pathname: "/prescription",
                          query: { id: data.id },
                        }}
                        className={`text-center w-[80px]  px-4 py-[4.5px] mr-3 bg-bg-primary text-bg-secondary rounded-md `}
                      >
                        View
                      </Link>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window !== undefined) {
                          (window as any).appointmentModal.showModal();
                          props.setPrescribtionId(data.id);
                          props.setDisease(data.disease);
                          props.settest(data.tests);
                          props.setAdvice(data.doctor_advices);
                          props.setreport(data.reports);
                          props.setPharmaAdvice(data.pharmacist_advice);
                          props.setIsModalOpen(true);
                        }
                      }}
                      className={`text-center px-4 py-[2px] bg-bg-primary text-bg-secondary rounded-md mt-2 ${
                        decodedToken?.type == "patient" ? "hidden" : ""
                      } `}
                    >
                      {decodedToken?.type == "pharmacist" ? "Prescription" : "Prescribe"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-red-400">No Prescription Found</div>
      )}
    </>
  );
}
