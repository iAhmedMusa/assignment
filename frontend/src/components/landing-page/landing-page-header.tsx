"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuthToken } from "@/context-api/context-provider";
import companyLogo from "../../../public/logo/logo.png";
import HeaderUser from "../layout/header-user";

export default function LandingPageHeader(): JSX.Element {
  const { decodedToken } = useAuthToken();
  const router = useRouter();

  return (
    <>
      <div className="bg-bg-white">
        <div className="max-w-[1500px] m-auto  text-text-darkBlue py-2  border-b-2 border-text-secondary flex justify-between items-center ">
          <Image
            src={companyLogo}
            alt="company logo"
            width={40}
            height={40}
            className="ml-4 cursor-pointer"
            onClick={() => router.push("/")}
          />

          <div className="list-none hidden lg:flex md:gap-x-3 lg:gap-x-6 font-semibold text-[16px] tracking-wide">
            <a href="/#home" className="landingPage-header">
              Home
            </a>
            <a href="/#services" className="landingPage-header">
              Services
            </a>
            <a href="/#specialities" className="landingPage-header">
              Specialities
            </a>
            <a href="/#doctors" className="landingPage-header">
              Doctors
            </a>
            <a href="/#blog" className="landingPage-header">
              Blog
            </a>
            <div className="border-l-2 border-[#063b6e]"></div>
            <Link
              href={{
                pathname: "/registration",
                query: { position: "Doctor" },
              }}
              className="landingPage-header"
            >
              For Doctor
            </Link>
            <Link
              href={{
                pathname: "/registration",
                query: { position: "Pharmacist" },
              }}
              className="landingPage-header"
            >
              For Pharmacist
            </Link>
          </div>

          <div className="list-none flex gap-x-4 items-center font-medium text-[16px] mr-2">
            {decodedToken == null ? (
              <button
                className="bg-bg-primary text-white px-4 py-2 rounded-md hover:bg-[#063b6e] transition-all "
                onClick={() => {
                  router.push("/signin");
                }}
              >
                Sign-In
              </button>
            ) : (
              <div
                onClick={() => router.push("/dashboard")}
                className="cursor-pointer"
              >
                <HeaderUser />
              </div>
            )}

            {/* navigation for small screen 768 */}
            <div className="dropdown dropdown-end block lg:hidden">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6H20"
                    stroke="#64748B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 12H20"
                    stroke="#64748B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 18H20"
                    stroke="#64748B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="mt-4 z-[1] p-2 shadow menu menu-sm dropdown-content bg-bg-white rounded-box w-52"
              >
                <a
                  href="/#home"
                  className="py-3 text-center hover:bg-bg-secondary landingPage-header"
                >
                  Home
                </a>
                <a
                  href="/#services"
                  className="py-3 text-center hover:bg-bg-secondary landingPage-header"
                >
                  Services
                </a>
                <a
                  href="/#specialities"
                  className="py-3 text-center hover:bg-bg-secondary landingPage-header"
                >
                  Specialities
                </a>
                <a
                  href="/#doctors"
                  className="py-3 text-center hover:bg-bg-secondary landingPage-header"
                >
                  Our Doctor
                </a>
                <a
                  href="/#blog"
                  className="py-3 text-center hover:bg-bg-secondary landingPage-header"
                >
                  Blog
                </a>
                <Link
                  href={{
                    pathname: "/registration",
                    query: { position: "Doctor" },
                  }}
                  className="py-3 text-center hover:bg-bg-secondary landingPage-header"
                >
                  For Doctor
                </Link>
                <Link
                  href={{
                    pathname: "/registration",
                    query: { position: "Pharmacist" },
                  }}
                  className="py-3 text-center hover:bg-bg-secondary landingPage-header"
                >
                  For Pharmacist
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
