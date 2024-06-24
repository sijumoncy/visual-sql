import React from "react";

interface ISidebarProps {
  children: React.ReactNode;
}

function Sidebar({ children }: ISidebarProps) {
  return <div className="col-span-2 bg-gray-200 p-2 ">{children}</div>;
}

export default Sidebar;
