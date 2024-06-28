import { DragTypeEnum, ICollection, ITable } from "@/interface/tableData";
import { CircleX, SquarePlus } from "lucide-react";
import React, { useState } from "react";
import TableDialog from "./tableDialog";
import { SetterOrUpdater } from "recoil";

interface ICollectionTreeProps {
  collection: ICollection;
  setCollection: SetterOrUpdater<ICollection | null>;
}

function CollectionTree({ collection, setCollection }: ICollectionTreeProps) {
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

  const removeCollection = () => {
    // as of now only supports one collection at a time
    const confirmVal = confirm("Are you sure to remove Collection");
    if (confirmVal) {
      setCollection(null);
    }
  };

  return (
    <div className="my-3">
      <div className="flex justify-between px-1">
        <p>{collection.collectionName}</p>
        <div className="flex gap-2">
          <button
            title="Create table"
            className={`text-red-700 hover:text-destructive cursor-pointer `}
          >
            <CircleX className="" onClick={() => removeCollection()} />
          </button>
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
      </div>

      <TableDialog
        open={showTableFormDialog}
        setOpen={setShowTableFormDialog}
      />
    </div>
  );
}

export default CollectionTree;
