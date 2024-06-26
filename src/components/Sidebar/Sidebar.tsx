import React from "react";
import Logo from "./Logo/Logo";

interface ISidebarProps {
  children: React.ReactNode;
}

function Sidebar({ children }: ISidebarProps) {
  return (
    <div className="w-full max-w-56 overflow-x-hidden bg-gray-200 p-2 ">
      <Logo />
      {children}
    </div>
  );
}

export default Sidebar;
