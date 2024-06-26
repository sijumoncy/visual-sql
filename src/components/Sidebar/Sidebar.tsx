import React from "react";

interface ISidebarProps {
  children: React.ReactNode;
}

function Sidebar({ children }: ISidebarProps) {
  return (
    <div className="w-full max-w-56 overflow-x-hidden bg-gray-200 p-2 ">
      {children}
    </div>
  );
}

export default Sidebar;
