"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

import { Button } from "./ui/button";

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherMode = pathname?.includes("/teacher");
  const isPlayerMode = pathname?.includes("/chapter");

  const isOnTheBrowsePage = pathname.includes("/browse");
  return (
    <div className="px-4 flex gap-2 ml-auto">
      {isTeacherMode || isPlayerMode ? (
        <Link href={"/"}>
          <Button variant={"ghost"}>
            Exit
            <LogOut className="ml-2" size={"1rem"} />
          </Button>
        </Link>
      ) : (
        <Link href={"/teacher/courses"}>
          <Button variant={"ghost"}>Teacher Mode</Button>
        </Link>
      )}

      {/* user button */}
    </div>
  );
};

export default NavbarRoutes;
