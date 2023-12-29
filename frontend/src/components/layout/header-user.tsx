"use client";

import Image from "next/image";

import { useAuthToken } from "@/context-api/context-provider";
import avatar from "../../../public/icons/layout/avatar.svg";

export default function HeaderUser(): JSX.Element {
  const { decodedToken } = useAuthToken();

  return (
    <div className="flex items-center gap-3 px-6 py-1 bg-bg-secondary rounded-xl">
      {/* user logo */}
      <div className="rounded-[100px]">
        <Image src={avatar} width={40} height={40} alt="user avater" />
      </div>

      {/* user content */}
      <div className="flex-col justify-start items-center">
        <p className="text-text-primary text-base font-semibold tracking-[0.2px]">
          {decodedToken?.name}
        </p>
        <p className="text-text-darkBlue text-sm font-medium text-center">
          {decodedToken?.type}
        </p>
      </div>
    </div>
  );
}
