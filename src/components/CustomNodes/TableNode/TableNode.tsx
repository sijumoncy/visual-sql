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
      <div className="border border-gray-400 rounded-md">
        <div className="border-b border-b-gray-400 bg-gray-700 text-white text-center">
          {name}
        </div>
        {columns.map(({ column_id, name, column_data_type }) => (
          <div
            key={column_id}
            className="border-b border-b-gray-400 grid grid-cols-2 gap-x-3 px-2 py-1 bg-white relative"
          >
            <div className="">{name}</div>
            <div className="">{column_data_type}</div>
          </div>
        ))}
      </div>
    </>
  );
}

{
  /* <Handle type="target" position={Position.Top} />
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
      /> */
}
