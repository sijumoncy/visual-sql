import React from "react";
import Logo from "./Logo/Logo";

interface ISidebarProps {
  children: React.ReactNode;
}

function Sidebar({ children }: ISidebarProps) {
  return (
    <div className="w-full max-w-56 overflow-x-hidden bg-gray-200 p-2 ">
      <Logo />
      <div className="h-[88%]">{children}</div>
      <div className="px-1 py-2 flex justify-between">
        <button></button>
      </div>
    </div>
  );
}

export default Sidebar;
