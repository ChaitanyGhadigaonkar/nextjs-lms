"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarLinksProps {
  label: string;
  icon: LucideIcon;
  path: string;
}
const SidebarLinks = ({ label, icon: Icon, path }: SidebarLinksProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const onClick = () => {
    router.push(path);
  };
  const isActive = pathname === path || pathname?.startsWith(`${path}/`);

  return (
    <button
      className={cn(
        "flex items-center gap-x-2 py-4 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 md:text-base",
        isActive &&
          "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 border-r-2 border-blue-700"
      )}
      onClick={onClick}
    >
      <Icon className="mr-2" />
      {label}
    </button>
  );
};

export default SidebarLinks;
