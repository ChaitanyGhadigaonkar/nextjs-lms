"use client";
import Link from "next/link";
import Logo from "./Logo";
import SidebarLinks from "./SidebarLinks";
import { Globe, LayoutDashboard } from "lucide-react";

const Sidebar = () => {
  const guestRoutes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      label: "Browse",
      icon: Globe,
      path: "/browse",
    },
  ];
  return (
    <>
      <div className="w-full flex py-4 h-[80px]">
        <Link href={"/"} className="pl-4 md:pl-2">
          <Logo />
        </Link>
      </div>
      {/* links */}
      <div className="flex flex-col w-full">
        {guestRoutes.map((route) => (
          <SidebarLinks
            key={route.path}
            icon={route.icon}
            path={route.path}
            label={route.label}
          />
        ))}
      </div>
    </>
  );
};

export default Sidebar;
