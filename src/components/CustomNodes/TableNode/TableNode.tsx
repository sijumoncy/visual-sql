import { useCallback } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { ICustomTableNodeData } from "../../../interface/tableData";

const handleStyle = { left: 10 };

export function TableNode({
  data: { columns, name, type },
}: NodeProps<ICustomTableNodeData>) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </>
  );
}
