/* eslint-disable jsx-a11y/alt-text */
"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, PDFViewer, Image } from "@react-pdf/renderer";

import rxicon from "../../../public/logo/rxicon.png";

import api from "@/lib/api";

function PrescriptionPdf() {
  const [data, setData]: any = useState({});
  const search = useSearchParams();

  let prescriptionId = search.get("id");

  useEffect(() => {
    api
      .get(`/prescriptions/${prescriptionId}`, {
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
  }, [prescriptionId]);

  return (
    <>
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <Document>
          <Page size="A4" style={{ padding: 40, width: "100%" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text style={{ fontSize: "18px" }}>
                  {data?.appointment?.doctor?.title}. {data?.appointment?.doctor?.user?.name}
                </Text>
                <Text style={{ fontSize: "10px" }}>{data?.appointment?.doctor?.specialist}</Text>
                <Text style={{ fontSize: "10px" }}>4uDoctors</Text>
                <Text style={{ fontSize: "10px" }}>
                  Reg No: {data?.appointment?.doctor?.reg_number}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: "10px", fontWeight: 900 }}>
                  Date: {new Date(data?.created_at).toDateString()}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: "15px",
                marginBottom: "10px",
                borderTop: "1px solid black",
              }}
            ></View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: "10px",
              }}
            >
              <Text style={{ fontSize: "12px", fontWeight: "bold", textTransform: "capitalize" }}>
                Patient Name: {data?.appointment?.patient?.name}
              </Text>
              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                Gender:{" "}
                {data?.appointment?.patient?.gender ? data?.appointment?.patient?.gender : "n/a"}
              </Text>
              <Text style={{ fontSize: "12px" }}>Age: {data?.age || 35}</Text>
              <Text style={{ fontSize: "12px" }}>Weight: {data?.weight}</Text>
            </View>
            <View
              style={{
                marginTop: "10px",
                marginBottom: "50px",
                borderTop: "1px solid black",
              }}
            ></View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "30%",
                  height: "60vh",
                  borderRight: "1px solid black",
                  padding: "2px",
                }}
              >
                <Text
                  style={{
                    fontSize: "12px",
                    paddingBottom: "10px",

                    lineHeight: 1.5,
                  }}
                >
                  Chief complaint: {"\n"}
                </Text>
                <Text
                  style={{
                    fontSize: "10px",
                    borderBottom: "1px solid gray",
                    paddingBottom: "10px",
                    lineHeight: 1.5,
                  }}
                >
                  {data.disease}
                </Text>
                <Text
                  style={{
                    marginTop: "15px",
                    fontSize: "12px",
                    paddingBottom: "10px",
                    lineHeight: 1.5,
                  }}
                >
                  Patient History:
                </Text>
                <Text
                  style={{
                    fontSize: "10px",
                    borderBottom: "1px solid gray",
                    paddingBottom: "10px",
                    lineHeight: 1.5,
                  }}
                >
                  {data.allergies ? `Allergies \n` : ""}
                  {data.diabetes ? `Diabetes \n` : ""}
                  {data.blood_pressure ? `Blood pressure \n` : ""}
                  {data.smoking_habit ? `Smoking habit \n` : ""}
                  {data.alcohol_consumption ? `Alcohol habit\n` : ""}
                </Text>
                <Text
                  style={{
                    fontSize: "12px",
                    marginTop: "15px",
                    paddingBottom: "10px",
                    lineHeight: 1.5,
                  }}
                >
                  Diagonosis:
                </Text>
                <Text
                  style={{
                    fontSize: "10px",
                    borderBottom: "1px solid gray",
                    paddingBottom: "10px",
                    lineHeight: 1.5,
                  }}
                >
                  {data.tests}
                </Text>
              </View>
              <View style={{ width: "70%", height: "60vh", marginLeft: "20px" }}>
                <Image style={{ width: "24px" }} src={rxicon.src} />
                <Text style={{ fontSize: "12px", marginTop: "10px" }}>{data?.doctor_advices}</Text>
              </View>
            </View>
            <View style={{ marginTop: "20px", marginLeft: "32%" }}>
              {data?.pharmacist_advice === null ? (
                <Text
                  style={{
                    fontSize: "12px",
                    backgroundColor: "#EBB678",
                    textAlign: "center",
                    padding: "6px 4px",
                    borderRadius: "4px",
                    color: "white",
                  }}
                >
                  This prescription is not seen yet
                </Text>
              ) : data?.pharmacist_advice == "true" ? (
                <Text
                  style={{
                    fontSize: "12px",
                    backgroundColor: "#44B86D",
                    textAlign: "center",
                    padding: "6px 4px",
                    borderRadius: "4px",
                    color: "white",
                  }}
                >
                  This prescription is approved by pharmacist - {data?.pharmacist?.user?.name}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: "12px",
                    backgroundColor: "#FF6969",
                    padding: "6px 4px",
                    borderRadius: "4px",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  This prescription is rejected
                </Text>
              )}
            </View>
            <View
              style={{
                marginTop: "25px",

                borderTop: "1px solid black",
              }}
            ></View>
            <View>
              <Text
                style={{
                  fontSize: "10px",
                  marginTop: "8px",
                  textAlign: "right",
                }}
              >
                powred by 4UDOCTORS
              </Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
}

export default PrescriptionPdf;
