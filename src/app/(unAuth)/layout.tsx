const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-1 items-center justify-center">{children}</div>
  );
};

export default Layout;
