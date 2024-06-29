import React from "react";
// import { data } from "../../../data/treeData";
import CreateCollection from "../Collection/createCollection";
import CollectionTree from "../Collection/collectionTree";
import { useRecoilState } from "recoil";
import { collectionAtom } from "@/store/atom/collectionAtom";

function SidebarTree() {
  const [collection, setCollection] = useRecoilState(collectionAtom);

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
      {collection?.collectionId && (
        <CollectionTree collection={collection} setCollection={setCollection} />
      )}
    </div>
  );
}

export default SidebarTree;
