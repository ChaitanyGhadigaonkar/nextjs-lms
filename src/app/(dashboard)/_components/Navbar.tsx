import NavbarRoutes from "@/components/NavbarRoutes";
import MobileSidebar from "./MobileSidebar";

const Navbar = () => {
  return (
    <div className="fixed inset-y-0 md:pl-60 h-[80px] flex items-center w-full z-50 shadow-sm p-4">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
