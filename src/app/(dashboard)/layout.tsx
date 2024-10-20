import AuthProvider from "@/context/AuthProvider";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <div className="w-full h-full flex-1 flex border border-red-900">
        <div
          className="
        hidden md:flex md:w-60 fixed inset-y-0 border-r border-slate-100 flex-col z-50
        "
        >
          <Sidebar />
        </div>
        <Navbar />
        <div className="flex-1 md:pl-60 pt-[80px] my-2 mx-4">{children}</div>
      </div>
    </AuthProvider>
  );
};

export default layout;
