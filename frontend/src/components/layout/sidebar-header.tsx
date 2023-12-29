"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import SidebarMenu from "./sidebar-menu";
import HeaderUser from "./header-user";
import LogOut from "./logout";

import menuIcon from "../../../public/icons/layout/menu.svg";
import sidebarHeaderLogo from "../../../public/logo/logo.png";

export default function SidebarHeader(): JSX.Element {
  const router = useRouter();

  const backToHome = () => {
    window.location.href = "/";
    // router.push("/");
    // router.refresh();
  };

  return (
    <div className="flex justify-between items-center px-[12px] sm:px-[24px] py-[15px] border-b border-r border-layout-border">
      <div className="flex items-center gap-[16px]">
        {/* menu */}
        <div className="cursor-pointer hidden xl:block">
          <Image src={menuIcon} width={24} height={24} alt="menu icon" />
        </div>

        {/* drawer for small to large screen */}
        <div className="drawer xl:hidden w-[24px] z-50">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer">
              <Image
                src={menuIcon}
                width={24}
                height={24}
                alt="menu icon"
                className="cursor-pointer"
              />
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="w-[250px] h-full bg-bg-white">
              {/* Sidebar content here */}
              <SidebarMenu />
            </ul>

            {/* logout */}
            <div className="fixed bottom-4">
              <LogOut />
            </div>
          </div>
        </div>

        {/* logo */}
        <div className="hidden sm:flex items-center gap-[8px] cursor-pointer" onClick={backToHome}>
          <Image src={sidebarHeaderLogo} width={28} height={28} alt="sidebar header logo" />
          <p className="font-bold text-large text-text-darkBlue">4uDoctors</p>
        </div>
      </div>

      {/* small screen header changes */}
      <div className="flex justify-center items-center xl:hidden">
        <HeaderUser />
      </div>
    </div>
  );
}
