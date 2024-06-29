import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/Resizable/Resizable";

interface IEditoWrapperProps {
  editor1: React.ReactNode;
  editor2: React.ReactNode;
}

function EditoWrapper({ editor1, editor2 }: IEditoWrapperProps) {
  return (
    <ResizablePanelGroup direction="vertical" className="w-full h-full">
      <ResizablePanel className="min-h-[6vh] max-h-[88vh]" defaultSize={50}>
        {editor1}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="min-h-[6vh] max-h-[88vh]" defaultSize={50}>
        {editor2}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default EditoWrapper;
