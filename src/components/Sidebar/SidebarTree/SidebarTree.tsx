import React from "react";
import { data } from "../../../data/treeData";
import { SquarePlus } from "lucide-react";
import {
  DragTypeEnum,
  ITable,
  ITableGroup,
} from "../../../interface/tableData";

function SidebarTree() {
  const tableData = data as ITableGroup[];

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
    <div className="w-full">
      {tableData && tableData.length > 0 ? (
        <ul className="flex flex-col gap-5">
          {tableData.map(({ id, name, tables }: ITableGroup) => (
            <div key={id}>
              <li className="flex gap-1">
                <SquarePlus />
                <p>{name}</p>
              </li>
              <ul className="ml-10 flex flex-col gap-1 mt-2">
                {tables &&
                  tables.map(({ id, name, columns }: ITable) => (
                    <li
                      key={id}
                      className="cursor-pointer"
                      draggable={true}
                      onDragStart={(e: React.DragEvent<HTMLLIElement>) =>
                        handleDragTable(e, { id, name, columns })
                      }
                    >
                      {name}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </ul>
      ) : (
        <div>No Table Exist.Create One to start</div>
      )}
    </div>
  );
}

export default SidebarTree;
