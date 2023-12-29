import menuIcon from "../../public/icons/layout/menu-icon.svg";

export const NavOptions: any = {
  patient: [
    { name: "Dashboard", link: "/dashboard", icon: menuIcon },
    { name: "Doctors", link: "/doctors", icon: menuIcon },
    { name: "Appointments", link: "/appointments", icon: menuIcon },
    { name: "My Prescription", link: "/prescriptions", icon: menuIcon },
    { name: "Pharmacists", link: "/pharmacists", icon: menuIcon },
  ],
  doctor: [
    { name: "Dashboard", link: "/dashboard", icon: menuIcon },
    { name: "My Schedules", link: "/schedules", icon: menuIcon },
    { name: "Appointments", link: "/appointments", icon: menuIcon },
    { name: "Prescription", link: "/prescriptions", icon: menuIcon },
    { name: "Patients", link: "/patients", icon: menuIcon },
  ],
  pharmacist: [
    { name: "Dashboard", link: "/dashboard", icon: menuIcon },
    { name: "Prescription", link: "/prescriptions", icon: menuIcon },
    { name: "Patients", link: "/patients", icon: menuIcon },
  ],
  admin: [
    { name: "Dashboard", link: "/dashboard", icon: menuIcon },
    { name: "Doctors", link: "/doctors", icon: menuIcon },
    { name: "Pharmacists", link: "/pharmacists", icon: menuIcon },
    { name: "Patients", link: "/patients", icon: menuIcon },
  ],
};
