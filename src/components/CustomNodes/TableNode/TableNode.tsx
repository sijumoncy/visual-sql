import { Handle, Node, NodeProps, Position, useReactFlow } from "reactflow";
import {
  DragTypeEnum,
  IColumn,
  ICustomTableNodeData,
} from "../../../interface/tableData";
import { X } from "lucide-react";

export function TableNode({
  id,
  data: { columns, name },
}: NodeProps<ICustomTableNodeData>) {
  const { setNodes, getNode, addNodes, addEdges, setEdges } = useReactFlow();

  // remove table
  const handleRemoveNode = (name: string) => {
    setNodes((prev) => prev.filter((n) => n.data.name !== name));
    // remove connected edge also
    setEdges((edgs) =>
      edgs.filter((edge) => edge.source !== id && edge.target !== id)
    );
  };

  // column drag
  const handleDragColumn = (
    e: React.DragEvent<HTMLDivElement>,
    columnData: IColumn
  ) => {
    e.dataTransfer.setData(
      DragTypeEnum.DRAGGED_TABLE_COLUMN,
      JSON.stringify({
        ...columnData,
        nodeId: id,
        type: DragTypeEnum.TABLE_COLUMN,
      })
    );
  };

  // drop table on editor
  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    const trasferColumnData: IColumn & { nodeId: string; type: DragTypeEnum } =
      JSON.parse(e.dataTransfer.getData(DragTypeEnum.DRAGGED_TABLE_COLUMN));

    // incoming dragged data
    const incomingNodeId = trasferColumnData.nodeId;
    const incomingTableData = getNode(incomingNodeId);
    const incomingColumnData: IColumn = {
      column_data_type: trasferColumnData.column_data_type,
      column_id: trasferColumnData.column_id,
      name: trasferColumnData.name,
    };

    // return if droping column to same table
    if (
      incomingNodeId === id ||
      trasferColumnData.type !== DragTypeEnum.TABLE_COLUMN
    ) {
      return;
    }

    //Dropped table data
    const droppedTableData = getNode(
      id
    ) as unknown as NodeProps<ICustomTableNodeData>;

    // console.log({ incomingTableData, droppedTableData });

    const isColumnExistInDropped = droppedTableData.data.columns.find(
      (col) => col.name === incomingColumnData.name
    );

    // console.log({ isColumnExistInDropped, columns });

    // if not exit => add the column to target table and create a connection from source to target
    if (isColumnExistInDropped) {
      alert(`Column : ${incomingColumnData.name} is already exist`);
    } else {
      // create updatedNode
      const updatedTargetNode = JSON.parse(JSON.stringify(droppedTableData));
      const tableNumberArr = droppedTableData.id.split("_");
      const tableNumber = tableNumberArr[tableNumberArr.length - 1];
      const newColumnId = `${droppedTableData.id}_table_${
        tableNumber + 1
      }_column_${tableNumber + 1}_${droppedTableData.data.columns.length + 1}`;
      // column going to add
      const connectedColumn = {
        column_data_type: incomingColumnData.column_data_type,
        name: incomingColumnData.name,
        column_id: newColumnId,
      };
      updatedTargetNode.data.columns.push(connectedColumn);

      // remove target node
      setNodes((prev) => prev.filter((n) => n.id !== droppedTableData.id));
      //add update node back
      addNodes(updatedTargetNode as unknown as Node);

      // add connection edge from source to target
      const newEdgeConnection = {
        id: `${incomingNodeId}_${incomingColumnData.column_id}-${droppedTableData.id}_${newColumnId}`,
        source: incomingNodeId,
        sourceNode: incomingTableData as Node<ICustomTableNodeData>,
        sourceHandle: `${incomingColumnData.column_id}_source`,
        target: droppedTableData.id,
        targetNode: droppedTableData as unknown as Node<ICustomTableNodeData>,
        targetHandle: `${newColumnId}_target`,
        animated: true,
        data: connectedColumn,
      };

      addEdges(newEdgeConnection);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
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
        <div
          className="nodrag"
          onDragOver={handleDragOver}
          onDrop={(e: React.DragEvent<HTMLDivElement>) => handleDragDrop(e, id)}
        >
          {columns.map(({ column_id, name, column_data_type }) => (
            <div
              key={column_id}
              className="[&:not(:last-child)]:border-b border-b-gray-400 grid grid-cols-2 gap-x-3 px-2 py-1 bg-white relative "
              draggable
              onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
                handleDragColumn(e, { column_id, name, column_data_type })
              }
            >
              <div className="">{name}</div>
              <div className="">{column_data_type}</div>
              <Handle
                id={`${column_id}_target`}
                type="target"
                position={Position.Left}
                isConnectable={true}
              />
              <Handle
                id={`${column_id}_source`}
                type="source"
                position={Position.Right}
                isConnectable={true}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
