import React from "react";

interface IMainProps {
  children: React.ReactNode;
}

function Main({ children }: IMainProps) {
  return <div className="w-full p-2">{children}</div>;
}

export default Main;
