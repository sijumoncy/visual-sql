import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  Edge,
  MiniMap,
  Node,
  NodeTypes,
  OnConnect,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";

import "reactflow/dist/style.css";
import {
  CustomNodeTypes,
  DragTypeEnum,
  ICustomTableNodeData,
  ITable,
} from "../../interface/tableData";
import { TableNode } from "../CustomNodes/TableNode/TableNode";
import { useGenerateSql } from "@/hooks/useGenerateSql";
import { useSetRecoilState } from "recoil";
import { queryEditorAtom } from "@/store/atom/queryEditorAtom";

const nodeTypes: NodeTypes = {
  customTableNode: TableNode,
};

function VisualEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState<
    Node<ICustomTableNodeData>[]
  >([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const setQueryEditorAtom = useSetRecoilState(queryEditorAtom);

  // generator hook for query string arr
  const { query, generating } = useGenerateSql(
    nodes as unknown as Node<ICustomTableNodeData>[],
    edges
  );

  // update global state
  useEffect(() => {
    setQueryEditorAtom({
      loading: generating,
      queryString: query.join(""), // convert array of string to string with new Line at the end
    });
  }, [generating, query]);

  // Edge Delete on Click
  const handleOnEdgeClick = (
    _e: React.MouseEvent<Element, MouseEvent>,
    edge: Edge
  ) => {
    setEdges((edgs) => edgs.filter((ed) => ed.id !== edge.id));
  };

  /**
   * on Drop the table from sidebar to editor
   */
  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const transferedData: ITable & { type: string } = JSON.parse(
      e.dataTransfer.getData(DragTypeEnum.DRAGGED_TABLE_DATA)
    );
    if (
      transferedData.type &&
      transferedData.type === DragTypeEnum.TABLE_NODE
    ) {
      const { columns, id, name, type } = transferedData;

      // set new node to editor
      const newTableNode: Node = {
        id: id,
        type: CustomNodeTypes.TABLE_NODE,
        position: { x: 0, y: 0 },
        data: { name, columns, type },
      };

      setNodes((prev) => [...prev, newTableNode]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="w-full h-full border border-gray-300 rounded-md"
      onDrop={handleOnDrop}
      onDragOver={handleDragOver}
    >
      <div className="text-red-500 bg-gray-200 text-center font-medium py-1  lg:hidden">
        <p>Currently Only Support Screens &gte; 1024px.</p>
        <p>We will support smaller device in the near future.</p>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onEdgeClick={handleOnEdgeClick}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <MiniMap
          nodeColor="#72c0ec"
          maskStrokeColor="#2e2d2d"
          pannable
          zoomable
        />
        {/* @ts-expect-error - dot is not assignable, internal error. Need to check later*/}
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default VisualEditor;
