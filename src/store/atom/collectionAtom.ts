import { ICollection } from "@/interface/tableData";
import { atom } from "recoil";

export const collectionAtom = atom<ICollection | null>({
  key: "collection",
  default: null,
});
