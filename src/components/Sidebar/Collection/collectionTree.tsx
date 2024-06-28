import { DragTypeEnum, ICollection, ITable } from "@/interface/tableData";
import { CircleX, Database, SquarePlus, Table2 } from "lucide-react";
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

  const removeTable = (tableId: string) => {
    // as of now only supports one collection at a time
    const confirmVal = confirm("Are you sure to remove table");
    if (confirmVal) {
      const filteredTable = collection.tables.filter(
        (tab) => tab.id !== tableId
      );
      setCollection((prev) =>
        prev?.collectionId
          ? {
              ...prev,
              tables: filteredTable,
            }
          : null
      );
    }
  };

  return (
    <div className="my-3">
      <div className="flex justify-between px-1">
        <div className="flex gap-1">
        <Database className="text-gray-500" />
        <p>{collection.collectionName}</p>
        </div>
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

      {/* tables list */}

      <div className="my-3 pl-3">
        <ul className="flex flex-col gap-1">
          {collection &&
            collection.tables.map((table) => (
              <li key={table.id} className="flex justify-between">
                <div className="flex gap-1 items-center">
                  <Table2 className="text-gray-600" size={20}/>
                  <div className="">{table.name}</div>
                </div>
                <button
                  title="Create table"
                  className={`text-red-700 hover:text-destructive cursor-pointer `}
                >
                  <CircleX className="" onClick={() => removeTable(table.id)} />
                </button>
              </li>
            ))}
        </ul>
      </div>

      <TableDialog
        open={showTableFormDialog}
        setOpen={setShowTableFormDialog}
      />
    </div>
  );
}

export default CollectionTree;
