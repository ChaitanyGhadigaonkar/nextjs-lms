import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import DefaultImage from "@/assets/default profile.png";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const UserButton = () => {
  const { data } = useSession();
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="">
            <Image
              src={data?.user?.image || DefaultImage}
              width={20}
              height={20}
              className="w-8 h-8 rounded-full"
              alt="user image"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-base font-normal">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="py-0.5 px-2 text-base font-normal flex gap-1 mx-auto items-center justify-left"
            onClick={async () => {
              await signOut({ redirect: false });
            }}
          >
            logout <LogOut className="text-sm" size={"1rem"} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
