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
      {/* collection section */}
      <div className="flex justify-between px-1 py-1 cursor-pointer group/db hover:bg-gray-300">
        <div className="flex gap-1 ">
          <Database className="text-gray-500" />
          <p className="">{collection.collectionName}</p>
        </div>
        <div className="gap-2 hidden group-hover/db:flex ">
          <button
            title="Delete Collection"
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
      <div className="my-3 pl-3 hover:bg-gray-300 py-1 pr-1 group/table">
        <ul className="flex flex-col gap-1">
          {collection &&
            collection.tables.map((table) => (
              <li
                key={table.id}
                className="flex justify-between cursor-pointer"
              >
                <div className="flex gap-1 items-center">
                  <Table2 className="text-gray-600" size={20} />
                  <div className="">{table.name}</div>
                </div>
                <button
                  title="Create table"
                  className={`text-red-700 hover:text-destructive cursor-pointer hidden group-hover/table:block `}
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
