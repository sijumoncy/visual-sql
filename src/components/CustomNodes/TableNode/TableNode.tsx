import { Handle, NodeProps, Position, useReactFlow } from "reactflow";
import { ICustomTableNodeData } from "../../../interface/tableData";
import { X } from "lucide-react";

export function TableNode({
  data: { columns, name, type },
}: NodeProps<ICustomTableNodeData>) {
  const { setNodes } = useReactFlow();

  const handleRemoveNode = (name: string) => {
    setNodes((prev) => prev.filter((n) => n.data.name !== name));
  };

  return (
    <>
      <div className="border border-gray-400 rounded-sm min-w-48">
        <div className="border-b border-b-gray-400 bg-gray-700 text-white px-2 py-2 flex justify-between items-center">
          <span>{name}</span>
          <X
            size={16}
            className="hover:scale-110 hover:text-red-400"
            onClick={() => handleRemoveNode(name)}
          />
        </div>
        {columns.map(({ column_id, name, column_data_type }) => (
          <div
            key={column_id}
            className="[&:not(:last-child)]:border-b border-b-gray-400 grid grid-cols-2 gap-x-3 px-2 py-1 bg-white relative"
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
  /* <Handle type="target" position={Position.Top} /> */
}
