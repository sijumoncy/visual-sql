import { ICollection } from "@/interface/tableData";
import { atom } from "recoil";

export const collectionAtom = atom({
  key: "collection",
  default: null as ICollection | null,
});
