import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { useRecoilState } from "recoil";
import { queryEditorAtom } from "@/store/atom/queryEditorAtom";
import { useDebounce } from "../../hooks/useDebounce";

function QueryEditor() {
  const [queryEditorState, setQueryEditorState] =
    useRecoilState(queryEditorAtom);

  const [editorContent, setEditorContent] = useState("");

  const debounceValue = useDebounce(editorContent, 300);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEditorChange = (value: string | undefined, event: unknown) => {
    if (value) {
      setEditorContent(value);
    }
  };

  useEffect(() => {
    setQueryEditorState(debounceValue);
  }, [debounceValue]);

  return (
    <div className="h-full w-full border border-gray-400/60 rounded-md p-2">
      <Editor
        height="100%"
        width="100%"
        theme="vs-dark"
        defaultLanguage="sql"
        defaultValue="-- Here is your SQL"
        value={queryEditorState}
        onChange={handleEditorChange}
      />
    </div>
  );
}

export default QueryEditor;
