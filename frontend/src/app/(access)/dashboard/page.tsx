"use client";

import { useEffect, useState } from "react";
import { useAuthToken } from "@/context-api/context-provider";

import api from "@/lib/api";

import Useritems from "@/components/profile/useritems";
import UserProfile from "@/components/profile/user-profile";
import AdminPatientProfileUpdate from "@/components/profile/admin-patient-profile-update";
import DoctorPharmacistProfileUpdate from "@/components/profile/doctor-pharmacist-profile-update";

export default function DashboardPage(): JSX.Element {
  const { decodedToken } = useAuthToken();

  const [userdata, setUserdata] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [userType, setUserType] = useState("");
  const [userTypeID, setUserTypeID] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (decodedToken) {
      decodedToken.type == "doctor"
        ? (setUserTypeID(decodedToken.doctor), setUserType("doctors"))
        : decodedToken.type == "pharmacist"
        ? (setUserTypeID(decodedToken.pharmacist), setUserType("pharmacists"))
        : null;

      api.get(`/users/${decodedToken.sub}`).then(({ data, status }) => {
        if (status !== 200) {
          console.log(data);
        } else {
          setUserdata(data);
        }
      });
    }
  }, [decodedToken, isModalOpen]);

  useEffect(() => {
    if (userType && userTypeID) {
      api.get(`/${userType}/${userTypeID}`).then(({ data, status }) => {
        if (status !== 200) {
          console.log(data);
        } else {
          setUserInfo(data);
        }
      });
    }
  }, [userType, userTypeID, isModalOpen]);

  console.log(userdata);

  return (
    <>
      <div className="w-full flex justify-center ">
        <div className="lg:flex gap-x-5 2xl:gap-x-20">
          <Useritems />
          <div className="hidden lg:block">
            <div className=" h-full flex items-center ">
              <div className="border-l-2 border-bg-primary h-[260px]"></div>
            </div>
          </div>

          {/* show profile */}
          <UserProfile userData={userdata} userInfo={userInfo} setIsModalOpen={setIsModalOpen} />
        </div>

        {/* Edit Profile */}

        {(decodedToken?.type == "admin" || decodedToken?.type == "patient") && (
          <AdminPatientProfileUpdate
            userdata={userdata}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}

        {(decodedToken?.type == "doctor" || decodedToken?.type == "pharmacist") && (
          <DoctorPharmacistProfileUpdate
            userType={userType}
            userTypeID={userTypeID}
            userInfo={userInfo}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </>
  );
}
