import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
}
const SectionHeader = ({ icon: Icon, title }: SectionHeaderProps) => {
  return (
    <div className="flex flex-1 gap-2 items-center mr-auto">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 ">
        <Icon className="text-blue-800" />
      </div>
      <h1 className="text-md font-semibold text-lg">{title}</h1>
    </div>
  );
};

export default SectionHeader;
