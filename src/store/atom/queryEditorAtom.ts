import { atom } from "recoil";

export const queryEditorAtom = atom<{ loading: boolean; queryString: string }>({
  key: "query-editor",
  default: {
    loading: false,
    queryString: "",
  },
});
