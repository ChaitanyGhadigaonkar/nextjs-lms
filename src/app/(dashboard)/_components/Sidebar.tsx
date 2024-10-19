"use client";
import Link from "next/link";
import Logo from "./Logo";
import SidebarLinks from "./SidebarLinks";
import { BarChart, Compass, LayoutDashboard, List } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const isTeacherRoute = pathname?.includes("/teacher");
  const teacherRoutes = [
    {
      label: "Courses",
      icon: List,
      path: "/teacher/courses",
    },
    {
      label: "Analytics",
      icon: BarChart,
      path: "/teacher/analytics",
    },
  ];
  const guestRoutes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      label: "Browse",
      icon: Compass,
      path: "/browse",
    },
  ];

  const routes = isTeacherRoute ? teacherRoutes : guestRoutes;

  return (
    <>
      <div className="w-full flex py-4 h-[80px]">
        <Link href={"/"} className="pl-4 md:pl-2">
          <Logo />
        </Link>
      </div>
      {/* links */}
      <div className="flex flex-col w-full">
        {routes.map((route) => (
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
