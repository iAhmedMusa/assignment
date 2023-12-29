"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiLogoutBoxLine } from "react-icons/ri";

import { useAuthToken } from "@/context-api/context-provider";

export default function LogOut(): JSX.Element {
  const { decodedToken } = useAuthToken();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/signin";
    sessionStorage.clear();
    // router.refresh();
    // window.location.reload();
  };

  return (
    <>
      {decodedToken !== null && (
        <div className="flex items-center gap-x-2 text-md text-text-darkBlue p-4 ml-4 cursor-pointer">
          <RiLogoutBoxLine size="20px" />
          <Link href="/signin" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      )}
    </>
  );
}
