"use client";
import Image from "next/image";

import { useRouter } from "next/navigation";
import Link from "next/link";

import UserProfileComponent from "./user-profile";
import consultant from "../../../public/images/landing-page/consultation-01_cleanup.jpg";

export default function LandingPageUserProfile(): JSX.Element {
  const router = useRouter();
  return (
    <div className="bg-[#F3FBFF]  ">
      <div className="max-w-[1500px] m-auto">
        {/* patient card */}
        <div className="w-full bg-[#F3FBFF] flex items-center justify-center pb-12 pt-12 lg:pt-0">
          <div className="hidden lg:block lg:w-[50%]">
            <Image src={consultant} alt="consultant image" />
          </div>
          <div className="w-[100%] lg:w-[50%] m-auto flex justify-center items-center lg:flex-none px-8 lg:px-0">
            <div
              className={`card min-w-[350px] max-w-[450px] bg-bg-white text-text-darkBlue shadow hover:transition-all hover:scale-105 user-profile-card patient-profile-card`}
            >
              <div className="card-body">
                <h2 className={`card-title font-bold text-2xl`}>Get Consultation </h2>
                <p className="text-justify">
                  Gain access to a wide range of resources, personalized services, and expert
                  guidance to support you in achieving a better and healthier lifestyle.
                  Consultation with experienced and registered doctors as well as pharmacists to
                  assure proper health care. Patients, doctors, and pharmacists all have a trusted
                  and secure connection. So the patient got proper health care.
                </p>
                <div className="card-actions justify-center mt-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/signup");
                    }}
                    className=" w-full btn bg-bg-secondary text-text-darkBlue user-profile-button"
                  >
                    Sign-Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* doctor paharmacist card */}
        <div className="py-12 max-w-[1300px] m-auto flex flex-col md:flex-row justify-center items-center gap-y-8 md:gap-y-0 gap-x-20 lg:gap-x-48 p-12 pb-24">
          <UserProfileComponent
            role="Doctor"
            title="Join as a doctor?"
            desc="Register as a doctor and make ways for the patients towards a better and healthy life. Pave the path for patients to achieve improved well-being."
            btn="Register "
            bgColor="bg-[#063B6E]"
            textColor="text-[#FFFFFF]"
          />
          <UserProfileComponent
            role="Pharmacist"
            title="Join as a pharmacist?"
            desc="Join as a registered pharmacist and play a vital role in empowering patients along with the doctors to lead healthier lives by providing them with expert guidance and support."
            btn="Register "
            bgColor="bg-[#063B6E]"
            textColor="text-[#FFFFFF]"
          />
        </div>
      </div>
    </div>
  );
}
