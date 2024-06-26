import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/75 w-screen h-screen flex gap-2">{children}</div>
  );
}

export default Layout;
