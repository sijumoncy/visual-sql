import React, { useState } from "react";
// import { data } from "../../../data/treeData";
import { ICollection } from "../../../interface/tableData";
import CreateCollection from "../Collection/createCollection";
import CollectionTree from "../Collection/collectionTree";

function SidebarTree() {
  const [collection, setCollection] = useState<ICollection | null>(null);

  /**
   * @param collectionName
   * create collection
   */
  const handleCreateCollection = async (collectionName: string) => {
    const collectionId = new Date().toString();
    setCollection((prev) => ({
      ...prev,
      collectionId: collectionId,
      collectionName: collectionName,
      tables: [],
    }));
  };

  return (
    <div className="w-full">
      {/* collections */}
      <CreateCollection
        handleCreateCollection={handleCreateCollection}
        disableCreation={!!collection?.collectionId}
      />

      <hr className="w-[70%] border-gray-400 ml-1 mt-1 mb-5" />

      {/* collection Tree */}
      {collection?.collectionId && <CollectionTree collection={collection} />}

      {/* {tableData && tableData.length > 0 ? (
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
      )} */}
    </div>
  );
}

export default SidebarTree;
