"use client";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherMode = pathname?.includes("/teacher");
  const isPlayerMode = pathname?.includes("/chapter");
  return (
    <div className="px-4 flex ml-auto">
      {isTeacherMode || isPlayerMode ? (
        <Link href={"/"}>
          <Button variant={"ghost"}>
            <LogOut />
          </Button>
        </Link>
      ) : (
        <Link href={"/teacher/courses"}>
          <Button variant={"ghost"}>Teacher Mode</Button>
        </Link>
      )}

      {/* user button */}
      <div className="">Hey, user</div>
    </div>
  );
};

export default NavbarRoutes;
