import { DragTypeEnum, ICollection, ITable } from "@/interface/tableData";
import { SquarePlus } from "lucide-react";
import React, { useState } from "react";
import TableDialog from "./tableDialog";

interface ICollectionTreeProps {
  collection: ICollection;
}

function CollectionTree({ collection }: ICollectionTreeProps) {
  const [showTableFormDialog, setShowTableFormDialog] = useState(false);

  /**
   * function handle drag table to editor
   * @param e
   * @param table
   */
  const handleDragTable = (
    e: React.DragEvent<HTMLLIElement>,
    table: ITable
  ) => {
    e.dataTransfer.setData(
      DragTypeEnum.DRAGGED_TABLE_DATA,
      JSON.stringify({
        ...table,
        type: DragTypeEnum.TABLE_NODE,
      })
    );
  };

  return (
    <div className="my-3">
      <div className="flex justify-between px-1">
        <p>{collection.collectionName}</p>
        <button
          title="Create table"
          className={`text-gray-700 hover:text-gray-900 cursor-pointer`}
        >
          <SquarePlus
            className=""
            onClick={() => setShowTableFormDialog(true)}
          />
        </button>
      </div>
      
      <TableDialog
        open={showTableFormDialog}
        setOpen={setShowTableFormDialog}
      />
    </div>
  );
}

export default CollectionTree;
