"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuthToken } from "@/context-api/context-provider";
import { NavOptions } from "@/constants/nav-options";

export default function SidebarMenu() {
  const pathName = usePathname();
  const { decodedToken } = useAuthToken();
  const [getNavOptions, setGetNavOptions] = useState([]);

  useEffect(() => {
    if (!!decodedToken) {
      setGetNavOptions(NavOptions[decodedToken.type]);
    }
  }, [decodedToken]);

  return (
    <div className="flex-col gap-2 mt-4">
      {!!getNavOptions &&
        getNavOptions.map((nav: any) => {
          const isActive = pathName.startsWith(nav.link);

          return (
            <Link key={nav.link} href={nav.link} prefetch>
              <div
                className={`flex items-center gap-[16px] px-[24px] py-[12px] ${
                  isActive
                    ? "border-l-[3px] border-text-primary border-solid px-[20px]"
                    : "rounded-b-radius-8"
                }`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1777_7616)">
                    <path
                      className={`${isActive ? "stroke-text-primary" : "stroke-text-darkBlue"}`}
                      d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      className={`${isActive ? "stroke-text-primary" : "stroke-text-darkBlue"}`}
                      d="M19 4H15C14.4477 4 14 4.44772 14 5V9C14 9.55228 14.4477 10 15 10H19C19.5523 10 20 9.55228 20 9V5C20 4.44772 19.5523 4 19 4Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      className={`${isActive ? "stroke-text-primary" : "stroke-text-darkBlue"}`}
                      d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      className={`${isActive ? "stroke-text-primary" : "stroke-text-darkBlue"}`}
                      d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1777_7616">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p
                  className={`font-bold text-medium ${
                    isActive ? "text-text-primary" : "text-text-darkBlue"
                  } leading-[150%] tracking-[0.2px]`}
                >
                  {nav.name}
                </p>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
